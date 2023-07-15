const express = require('express');
const app = express();
const port = 80;

app.use(express.static('publish'));

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

