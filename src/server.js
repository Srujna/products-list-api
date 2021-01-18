const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')
const db = require("./models");
const Role = db.role;

const JSRSASign = require('jsrsasign')

//db connection
mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
    
            console.log("added 'user' to roles collection");
        });
    
        new Role({
            name: "moderator"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
    
            console.log("added 'moderator' to roles collection");
        });
    
        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
    
            console.log("added 'admin' to roles collection");
        });
        }
    });
}


const productRoute = require('./routes/product-route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('api is up!')
})

app.use('/api', productRoute)

require('./routes/auth-routes')(app);
require('./routes/user-routes')(app);

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});