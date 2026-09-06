sed -i 's/summary: result.summary,/summary: "Blueprint Generated",/g' server.ts
sed -i 's/data: result.codeSnippet || "No data returned"/data: result.content || "No data returned"/g' server.ts
