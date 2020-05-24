const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.get("/", function(req, res) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Tempe&appid=1aba3a73777bf8d86aa482daa5b39ed8&units=Imperial';
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            console.log(description);
        });
    });
    res.send('Server is running.')
});        

app.listen(port, function() {
    console.log('Server is running on port ' + port + '.');
});
