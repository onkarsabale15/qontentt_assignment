const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    age: Int!
    email: String!
  }

  input UserInput {
    name: String!
    age: Int!
    email: String!
  }
  type UsersResponse {
    type: String!
    message: String!
    data: [User]
  }
  type UserResponse {
    type: String!
    message: String!
    data: User
  }
  type Query {
    users: UsersResponse!
    # user(_id: ID!): User!
  }

  type Mutation {
    createUser(userInput: UserInput): UserResponse!
    deleteUser(userId: ID!): Boolean
    # editUser(userId: ID!, userInput: UserInput): User
  }
`;