sed -i '/\/\/ Auth API/i \
  app.post("/api/auth/verify", authenticate, (req, res) => {\n\
    const user = (req as any).user;\n\
    const db = getDb();\n\
    const index = db.users.findIndex((u: any) => u.id === user.id);\n\
    if (index > -1) {\n\
      db.users[index].emailVerified = true;\n\
      db.users[index].mobileVerified = true;\n\
      saveDb(db);\n\
      res.json({ success: true });\n\
    } else {\n\
      res.status(404).json({ error: "User not found" });\n\
    }\n\
  });\n\
' server.ts
