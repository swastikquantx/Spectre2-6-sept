sed -i '/\/\/ Auth API/i \
  app.post("/api/auth/register", async (req, res) => {\n\
    const { name, email, mobile, whatsapp, city, state, country, company, designation, password } = req.body;\n\
    const db = getDb();\n\
    if (db.users?.find((u: any) => u.email === email)) {\n\
      return res.status(400).json({ error: "Email already registered" });\n\
    }\n\
    const passwordHash = await hashPassword(password);\n\
    const newUser = {\n\
      id: `usr_${Date.now()}`,\n\
      name, email, mobile, whatsapp, city, state, country, company, designation,\n\
      passwordHash,\n\
      role: "ORG_OWNER",\n\
      organizationId: `org_${Date.now()}`,\n\
      emailVerified: false,\n\
      mobileVerified: false\n\
    };\n\
    if (!db.users) db.users = [];\n\
    db.users.push(newUser);\n\
    saveDb(db);\n\
    const token = generateToken(newUser);\n\
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });\n\
    const { passwordHash: _, ...userWithoutPassword } = newUser;\n\
    res.json({ user: userWithoutPassword, token });\n\
  });\n\
' server.ts
