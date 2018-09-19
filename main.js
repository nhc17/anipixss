//load lib
const path = require("path");
const express = require("express");

const resources = ['images', 'public'];
const images = ['cat.jpg', 'dog.jpg', 'rabbit.jpg']

const randImage = (array) => {
    const rand = Math.random();
    const index = Math.floor(rand * array.length)
    return (array[index]);
}

// create instance of app
const app = express();

//Routes
// GET / -> HTML (not embeddable)
app.get('/image', (req, resp) => {
    resp.status(200);
    resp.type('text/html');
    resp.send(`<img src='/${randImage(images)}'>`);
});

/*
app.get('/image', (req, resp) => {
    resp.status(200);
    resp.type('text/html');
    resp.send(`'<img src='images/${randImage(images)}'>`);   //if images folder is within the public folder, need to include /image in src!!
});
*/

//GET /random-image -> image/jpg  (can be embedded)
app.get('/random-image', (req, resp) => {
    const imageFile = randImage(images);
    resp.status(200);
    resp.type('image/jpg');
    resp.sendfile(path.join(__dirname, 'images', imageFile));
});

for (let res of resources) {
    console.info(`Adding ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}

app.use((req, resp) => {
    resp.status(404);
    resp.end();
});

//start web server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000
app.listen(PORT, () => {
    console.info(`Application started on ${PORT} at ${new Date()}`);
})