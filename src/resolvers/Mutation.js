import uuidv4 from 'uuid/v4'
import { type } from 'os';

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const emailTaken = await prisma.$exists.user({email: args.data.email})

        if (emailTaken){
            throw Error('User already present with email');
        }
        
        return await prisma.createUser(args.data)
    },
    // updateUser(parent, args, { prisma }, info) {
    //     const {id, data} = args
    //     const user = prisma.users.find((user) => user.id === id)
    //     console.log(user)

    //     if (!user) {
    //         throw Error('User not found')
    //     }

    //     if (typeof data.email === 'string') {
    //         const emailTaken = prisma.users.some((user) => user.email === data.email)
    //         if (emailTaken) {
    //             throw Error('Email already taken')
    //         }

    //         user.email = data.email
    //     }

    //     if (typeof data.name === 'string') {
    //         user.name = data.name
    //     }

    //     if (typeof data.age !== 'undefined') {
    //         user.age = data.age
    //     }

    //     return user
    // },
    async deleteUser(parent, args, { prisma }, info) {
        //TODO : prisma-client limitations -> Cant delete cascading relations
        //Wait for next version for implementation
        try {
            return await prisma.deleteUser({id: args.id})
        }
        catch(error) {
            throw Error(error.message)
            // throw Error('Something went wrong. Cant delete User ')
        }
    },
    async createPost(parent, args, { prisma, pubsub }, info) {
        const userExist = await prisma.$exists.user({id: args.data.author})

        if (!userExist){
            throw Error('User does not exist');
        }

        const data = {
            title: args.data.title,
            body: args.data.body,
            published: args.data.published,
            author: {
                connect: {
                    id: args.data.author
                }
            },
        }

        const post = await prisma.createPost(data)

        return post
    },
    async deletePost(parent, args, { prisma, pubsub }, info) {
        //TODO: Does not work.. See deleteUser()
        try {
            const post = await prisma.deletePost({id: args.id})
        }
        catch(error) {
            throw Error(error.message)
        }

        return post
    },
    async createComment(parent, args, { prisma, pubsub }, info) {
        const userExist = await prisma.$exists.user({id: args.data.author})
        const postExist = await prisma.$exists.post({id: args.data.post})

        if (!userExist || !postExist){
            throw Error('User or Post does not Exist');
        }

        const data = {
            text: args.data.text,
            author: {
                connect: {
                    id: args.data.author
                }
            },
            post: {
                connect: {
                    id: args.data.post
                }
            }
        }

        const comment = await prisma.createComment(data)

        return comment
    },
    async deleteComment(parent, args, { prisma, pubsub }, info) {
        try {
            return await prisma.deleteComment({id: args.id})
        }
        catch(error) {
            throw Error(error.message)
        }
    }

}

export {Mutation as default}