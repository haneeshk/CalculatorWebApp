const express = require('express');
const { exec } = require('child_process');
// const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// const addDoubles = require('./addDoubles.js');

app.post('/run', (req, res) => {
    exec(`./addDoubles ${req.body.input}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        res.send(`Output: ${stdout}`);
    });
});






const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server started on port 3000');
});