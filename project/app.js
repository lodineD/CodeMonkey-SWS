const express = require('express');
const app = express();
const port = 80;

app.use(express.static('publish'));

app.get('/publish/onemaps2.0.html', (req, res) => {
    res.status(200).send('OK');
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

