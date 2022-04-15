require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const logger = require('morgan')
const path = require("path")
const apiRouter = require("./routes/apiRouter")
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(logger('dev'));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cors())

app.use('/api', apiRouter)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json('Server is working')
})

start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, () => console.log('Server start on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()