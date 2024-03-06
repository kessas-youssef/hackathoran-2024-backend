require('dotenv').config();
const express = require('express')
const usersRoute = require('./routes/users')
const cors = require('cors')
require('./database/index')
const {errorMiddleware } = require('./utils/helpers')

const app = express()
const PORT = process.env.PORT || 3030


app.use(express.json());
app.use(cors())

app.use('/api', usersRoute)

app.use(errorMiddleware)
app.listen(PORT, () => console.log('Server running on port ' + PORT))