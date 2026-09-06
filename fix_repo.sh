sed -i '33,35c\
      method: "PATCH",\
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },\
      body: JSON.stringify(updates)\
' src/core/ProjectRepository.ts
