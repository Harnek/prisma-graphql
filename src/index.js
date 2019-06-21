import {GraphQLServer, PubSub} from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
// import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        prisma
        // db
    }
})

server.start(() => {
    console.log('GraphQL server started')
})