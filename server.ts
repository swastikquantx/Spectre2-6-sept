import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { spectreAI } from "./src/core/ai/spectreAI";
import { getAllProviders } from "./src/core/ai/providerRegistry";
import { getEnabledModels } from "./src/core/ai/modelRegistry";
import fs from 'fs';
import cookieParser from 'cookie-parser';
import { generateToken, verifyToken, comparePassword } from './src/backend/auth';
import { initializeUsers } from './src/backend/seedUsers';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  
  app.use(express.json());
  app.use(cookieParser());

  // Database helper
  const DB_PATH = path.join(process.cwd(), 'src/backend/db/data.json');
  
  await initializeUsers(); // Seed users if not exists

  const getDb = () => { const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')); return { projects: [], memories: [], users: [], ...db }; };
  const saveDb = (data: any) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  // Authentication Middleware
  const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    (req as any).user = decoded;
    next();
  };

  const requireRole = (roles: string[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const user = (req as any).user;
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    };
  };

  // Auth API
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const db = getDb();
    const user = db.users?.find((u: any) => u.email === email);
    
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    
    // Do not send password back
    const { passwordHash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
  });

  app.get("/api/auth/me", authenticate, (req, res) => {
    const db = getDb();
    const user = db.users?.find((u: any) => u.id === (req as any).user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const { passwordHash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Protected API Routes
  app.get("/api/spectre-config", authenticate, (req, res) => {
    res.json({
      providers: getAllProviders().map(p => p.getStatus()),
      models: getEnabledModels()
    });
  });

  app.post("/api/spectre-run", authenticate, async (req, res) => {
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

  // Projects API (Tenant Isolated)
  app.get("/api/projects", authenticate, (req, res) => {
    const user = (req as any).user;
    const projects = (getDb().projects || []).filter((p: any) => p.organizationId === user.organizationId);
    res.json(projects);
  });
  
  app.post("/api/projects", authenticate, (req, res) => {
    const user = (req as any).user;
    const db = getDb();
    const newProj = {
      ...req.body,
      id: `prj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      organizationId: user.organizationId,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!db.projects) db.projects = [];
    db.projects.push(newProj);
    saveDb(db);
    res.json(newProj);
  });

  app.get("/api/projects/:id", authenticate, (req, res) => {
    const user = (req as any).user;
    const project = getDb().projects.find((p: any) => p.id === req.params.id && p.organizationId === user.organizationId);
    if (project) res.json(project);
    else res.status(404).json({ error: "Project not found" });
  });

  app.patch("/api/projects/:id", authenticate, (req, res) => {
    const user = (req as any).user;
    const db = getDb();
    const index = db.projects.findIndex((p: any) => p.id === req.params.id && p.organizationId === user.organizationId);
    if (index === -1) return res.status(404).json({ error: "Project not found or unauthorized" });
    db.projects[index] = { ...db.projects[index], ...req.body, updatedAt: new Date().toISOString() };
    saveDb(db);
    res.json(db.projects[index]);
  });

  // Memory API (Tenant Isolated)
  app.get("/api/memory", authenticate, (req, res) => {
    const user = (req as any).user;
    const memories = (getDb().memories || []).filter((m: any) => m.organizationId === user.organizationId);
    res.json(memories);
  });

  app.post("/api/memory", authenticate, (req, res) => {
    const user = (req as any).user;
    const db = getDb();
    if (!db.memories) db.memories = [];
    const memory = {
      ...req.body,
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      organizationId: user.organizationId,
      createdBy: user.id,
      status: 'PROPOSED',
      reliability: 'UNVERIFIED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.memories.push(memory);
    saveDb(db);
    res.json(memory);
  });

  // AI Factory API (Tenant Isolated)

  app.post("/api/projects/:id/factory", authenticate, async (req, res) => {

    const user = (req as any).user;

    const db = getDb();

    const projectIndex = db.projects.findIndex((p: any) => p.id === req.params.id && p.organizationId === user.organizationId);

    if (projectIndex === -1) return res.status(404).json({ error: "Project not found or unauthorized" });

    const project = db.projects[projectIndex];

    

    try {

      // Simulate generating artifacts

      const result = await spectreAI.run({

        taskType: "ARCHITECTURE",

        prompt: `Generate a minimal JSON blueprint for the project: ${project.name} - ${project.description}. Include keys: requirements, architecture, database, api, ui, implementation, testPlan. Make it extremely brief.`

      });

      

      const artifacts = {

        id: `art_${Date.now()}`,

        projectId: project.id,

        generatedAt: new Date().toISOString(),

        summary: "Blueprint Generated",

        data: result.content || "No data returned"

      };

      

      if (!db.artifacts) db.artifacts = [];

      db.artifacts.push(artifacts);

      

      db.projects[projectIndex].status = "IN_PROGRESS";

      db.projects[projectIndex].stage = "ARCHITECTURE";

      saveDb(db);

      

      res.json(artifacts);

    } catch (e: any) {

      res.status(500).json({ error: e.message });

    }

  });


  // Admin / Stats API
  app.get("/api/admin/stats", authenticate, requireRole(['PLATFORM_ADMIN']), (req, res) => {
    const db = getDb();
    res.json({
      totalProjects: (db.projects || []).length,
      totalMemories: (db.memories || []).length,
      totalUsers: (db.users || []).length,
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
