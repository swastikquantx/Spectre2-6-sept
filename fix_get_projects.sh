sed -i 's/const projects = getDb().projects.filter/const projects = (getDb().projects || []).filter/g' server.ts
