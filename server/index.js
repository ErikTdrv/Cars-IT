const express = require('express');
const app = express();
const cors = require('cors');
const initDatabase = require('./configs/database');
const server = require('./environment');

app.use(cors());
app.use(express.json())

initDatabase()
.then(() => {
    app.listen(server.PORT, () => console.log(`Server listening on http://localhost:${server.PORT}`))
})
.catch((err) => console.log(err))
