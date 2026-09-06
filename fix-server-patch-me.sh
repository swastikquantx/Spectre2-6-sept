sed -i '/\/\/ Auth API/i \
  app.patch("/api/auth/me", authenticate, (req, res) => {\n\
    const user = (req as any).user;\n\
    const db = getDb();\n\
    const index = db.users.findIndex((u: any) => u.id === user.id);\n\
    if (index > -1) {\n\
      const updated = { ...db.users[index], ...req.body };\n\
      db.users[index] = updated;\n\
      saveDb(db);\n\
      const { passwordHash, ...rest } = updated;\n\
      res.json(rest);\n\
    } else {\n\
      res.status(404).json({ error: "User not found" });\n\
    }\n\
  });\n\
' server.ts
