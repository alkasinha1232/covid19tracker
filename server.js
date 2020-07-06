const express = require('express');
const app = express();
const path = require('path');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4200);

app.get('/*', function(req, res){
    res.sendFile(path.join(_dirname +'dist/index.html'));
})

console.log('console is listning');