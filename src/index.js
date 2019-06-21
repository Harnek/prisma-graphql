import {GraphQLServer, PubSub} from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const pubsub = new PubSub()

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
    }
})

server.start(() => {
    console.log('GraphQL server started')

    // prisma.$exists.comment({
    //     id: "cjwvqwq4v00db0779580juman"
    // }).then((exists) => {
    //     console.log(exists);
    // })
    
    // prisma.comments({skip: 1}).then(data => console.log(data))
    // prisma.posts().then(data => console.log(data))
    prisma.users().then((data) => console.log(data))

    // prisma.user({id: 'cjwvph6fu000j0779ztwvoimc'}).then(data => console.log(data))
    // prisma.comment({postid: 'cjwvqfsht004q0779ygts8b9e'}).then(data => console.log(data))

    // prisma.createUser({
    //     name: "Juan2",
    //     email: "juan2@wick.com"
    // }).then((data) => {
    //     console.log(data)
    // })

    // prisma.createPost({
    //     title: "John Wick Techniques 101",
    //     body : "Kill'em All!!!",
    //     published: true,
    //     author : {
    //         connect : {
    //             id: "cjwyxenea000r0758jfhs2ztb"
    //         }
    //     }
    // }).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // prisma.createComment({
    //     text: "John Wick Techniques 301",
    //     author : {
    //         connect : {
    //             id: "cjwyxenea000r0758jfhs2ztb"
    //         }
    //     },
    //     post : {
    //         connect: {
    //             id: "cjwvqfsht004q0779ygts8b9e"
    //         }
    //     }
    // }).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })
})