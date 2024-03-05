const mongoose = require('mongoose');
mongoose.connect(process.env.DB_STRING);

const db = mongoose.connection

db.on('error', err => console.log(err))
db.once('open', () => console.log("Connected to DB"))