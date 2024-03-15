const { ApolloServer } = require("apollo-server")
const typeDefs = require("./graphQl/graphQlConfig/typeDefs")
const resolvers = require("./graphQl/graphQlConfig/resolvers")
const server = new ApolloServer({
    typeDefs,
    resolvers
})
module.exports = server