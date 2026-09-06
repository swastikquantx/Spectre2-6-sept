import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { spectreAI } from "./src/core/ai/spectreAI";
import { getAllProviders } from "./src/core/ai/providerRegistry";
import { getEnabledModels } from "./src/core/ai/modelRegistry";
import fs from 'fs';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Database helper
  const DB_PATH = path.join(process.cwd(), 'src/backend/db/data.json');
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ projects: [], memories: [] }));
  }
  const getDb = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const saveDb = (data: any) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

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

  // Projects API
  app.get("/api/projects", (req, res) => {
    res.json(getDb().projects);
  });
  
  app.post("/api/projects", (req, res) => {
    const db = getDb();
    const newProj = {
      ...req.body,
      id: `prj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.projects.push(newProj);
    saveDb(db);
    res.json(newProj);
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = getDb().projects.find((p: any) => p.id === req.params.id);
    if (project) res.json(project);
    else res.status(404).json({ error: "Project not found" });
  });

  app.patch("/api/projects/:id", (req, res) => {
    const db = getDb();
    const index = db.projects.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Project not found" });
    db.projects[index] = { ...db.projects[index], ...req.body, updatedAt: new Date().toISOString() };
    saveDb(db);
    res.json(db.projects[index]);
  });

  // Memory API
  app.get("/api/memory", (req, res) => {
    res.json(getDb().memories || []);
  });

  app.post("/api/memory", (req, res) => {
    const db = getDb();
    if (!db.memories) db.memories = [];
    const memory = {
      ...req.body,
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      status: 'PROPOSED',
      reliability: 'UNVERIFIED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.memories.push(memory);
    saveDb(db);
    res.json(memory);
  });

  // Admin / Stats API
  app.get("/api/admin/stats", (req, res) => {
    const db = getDb();
    res.json({
      totalProjects: (db.projects || []).length,
      totalMemories: (db.memories || []).length,
      health: 'HEALTHY'
    });
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
