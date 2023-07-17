const express = require('express');
const app = express();
const port = 80;

app.use(express.static('publish'));

app.get('/onemaps2.0.html', (req, res) => {
    res.status(200).send('OK');
})

app.get('/index.html', (req, res) => {
    res.status(200).send('OK');
})

app.get('/login.html', (req, res) => {
    res.status(200).send('OK');
})

app.get('/signup.html', (req, res) => {
    res.status(200).send('OK');
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

