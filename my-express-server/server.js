const express = require('express');
const app = express();

app.get("/", function(req, resp) {
    resp.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function(req, resp) {
    resp.send("Contact me at connor5@gmail.com");
});

app.get("/about", function(req, resp) {
    resp.send("My name is Connor");
});

app.listen(3000, function() {
    console.log('Server started on port 3000');
});
 