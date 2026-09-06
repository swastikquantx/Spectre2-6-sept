import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { spectreAI } from "./src/core/ai/spectreAI";
import { getAllProviders } from "./src/core/ai/providerRegistry";
import { getEnabledModels } from "./src/core/ai/modelRegistry";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/spectre-config", (req, res) => {
    res.json({
      providers: getAllProviders().map(p => p.getStatus()),
      models: getEnabledModels()
    });
  });

  app.post("/api/spectre-run", async (req, res) => {
    try {
      const request = req.body;
      const response = await spectreAI.run(request);
      res.json(response);
    } catch (error: any) {
      if (error.toNormalError) {
        res.status(500).json({ error: error.toNormalError() });
      } else {
        res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: error.message } });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
