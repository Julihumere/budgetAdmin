const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
  console.log(`servidor en ${PORT}`);
  server.listen(PORT);
});
