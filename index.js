const mongoose = require("mongoose")
const env = require("dotenv").config()
const MONGO_DB_URI = process.env.MONGO_DB_URI
const PORT = process.env.PORT
const server = require("./config/apolloServer")
mongoose.connect(MONGO_DB_URI).then(() => {
    console.log("Connected to MongoDB")
    return server.listen({ port: PORT})
}).then(({ url }) => {
    console.log(`Apollo Server ready at ${url}`)
})
.catch((err) => {
    console.log(err)
})

module.exports = mongoose.Connection;