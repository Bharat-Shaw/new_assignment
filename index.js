const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('./config/db')
const { registerRouter } = require('./routes/authRoutes');
const { balanceRouter } = require('./routes/balanceRoutes');
const { topupRouter } = require('./routes/topUpRoutes');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

const authmiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const userav = (authorization.split(' ')[1]);
    // console.log(userav)
    if (!userav) {
        res.send('Please login');
    } else {
        jwt.verify(userav, 'assignment', (err, decoded) => {
            const { userId } = decoded;
            req.userId = userId;
            if (decoded) {
                next();
            } else {
                res.send("Please login");
            }
        })
    }
}

app.use('/', registerRouter);
app.use('/', authmiddleware, balanceRouter);
app.use('/', authmiddleware, topupRouter);

// app.use('/',  balanceRouter);
// app.use('/',  topupRouter);

app.listen(4000, async () => {
    try {
        await connection;
        console.log("Connected to db")
    } catch (error) {
        console.log(error);
    }
    console.log('Port started at port 4000')
})