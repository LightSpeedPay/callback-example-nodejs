const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "No token provided or token is malformed" });
    }

    const token = authHeader.split(' ')[1];  // Bearer TOKEN_VALUE

    if (token === "he6786ll9879o564756yuf657868wor-80-8ld") {
        next();  
    } else {
        return res.status(403).json({ success: false, message: "Token is invalid" });
    }
}

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Callback Page!');
});

app.post('/callback', authenticateToken, (req, res) => {
    console.log('Received callback:', req.body);
    res.status(200).json({ success: true });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
