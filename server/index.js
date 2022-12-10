const express = require('express');
const app = express();
const manualCors = require('./configs/cors');
const cors = require('cors')
const server = require('./environment');
const initDatabase = require('./configs/database');
const routes = require('./routes');
const { authMiddleware } = require('./middlewares/auth');

app.use(cors({credentials: true, origin: 'http://localhost:4200', allowedHeaders: ['Content-Type, X-Authorization, X-RapidAPI-Key, X-RapidAPI-Host']}))
// app.use(manualCors());
app.use(express.json())
app.use(authMiddleware)
app.use(routes)
//Initializing database
initDatabase()
.then(() => {
    app.listen(server.PORT, () => console.log(`Server listening on http://localhost:${server.PORT}`))
})
.catch((err) => console.log(err))
