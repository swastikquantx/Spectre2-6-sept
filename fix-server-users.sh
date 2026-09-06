sed -i '/\/\/ Admin \/ Stats API/i \
  app.get("/api/admin/users", authenticate, requireRole(["PLATFORM_ADMIN"]), (req, res) => {\n\
    const db = getDb();\n\
    const users = (db.users || []).map((u: any) => { const { passwordHash, ...rest } = u; return rest; });\n\
    res.json(users);\n\
  });\n\
' server.ts
