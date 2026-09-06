sed -i '/\/\/ Admin \/ Stats API/i \
  \/\/ AI Factory API (Tenant Isolated)\n\
  app.post("/api/projects/:id/factory", authenticate, async (req, res) => {\n\
    const user = (req as any).user;\n\
    const db = getDb();\n\
    const projectIndex = db.projects.findIndex((p: any) => p.id === req.params.id && p.organizationId === user.organizationId);\n\
    if (projectIndex === -1) return res.status(404).json({ error: "Project not found or unauthorized" });\n\
    const project = db.projects[projectIndex];\n\
    \n\
    try {\n\
      // Simulate generating artifacts\n\
      const result = await spectreAI.run({\n\
        taskType: "CODE_GENERATION",\n\
        prompt: `Generate a minimal JSON blueprint for the project: ${project.name} - ${project.description}. Include keys: requirements, architecture, database, api, ui, implementation, testPlan. Make it extremely brief.`\n\
      });\n\
      \n\
      const artifacts = {\n\
        id: `art_${Date.now()}`,\n\
        projectId: project.id,\n\
        generatedAt: new Date().toISOString(),\n\
        summary: result.summary,\n\
        data: result.codeSnippet || "No data returned"\n\
      };\n\
      \n\
      if (!db.artifacts) db.artifacts = [];\n\
      db.artifacts.push(artifacts);\n\
      \n\
      db.projects[projectIndex].status = "IN_PROGRESS";\n\
      db.projects[projectIndex].stage = "ARCHITECTURE";\n\
      saveDb(db);\n\
      \n\
      res.json(artifacts);\n\
    } catch (e: any) {\n\
      res.status(500).json({ error: e.message });\n\
    }\n\
  });\n\
' server.ts
