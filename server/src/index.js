const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const { resolvers } = require('./resolvers')

require('dotenv')

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(
  {
    cors: {
      credentials: true,
      origin: 'http://localhost:7777',
    },
  },
  details => {
    console.log(`Server is running on port http://localhost:${details.port}`)
  }
)
