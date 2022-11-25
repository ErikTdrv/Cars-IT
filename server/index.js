const express = require('express');
const app = express();
const cors = require('./configs/cors');

const server = require('./environment');
const initDatabase = require('./configs/database');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/auth');

app.use(cors());
app.use(express.json())
app.use(routes)
app.use(cookieParser())
app.use(authMiddleware)
//Initializing database
initDatabase()
.then(() => {
    app.listen(server.PORT, () => console.log(`Server listening on http://localhost:${server.PORT}`))
})
.catch((err) => console.log(err))
