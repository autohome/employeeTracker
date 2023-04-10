const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;


// Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));





app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
