import uuidv4 from 'uuid/v4'
import { type } from 'os';

const Mutation = {
    createUser(parent, args, { prisma }, info) {
        const emailTaken = prisma.users.some((user) => user.email === args.data.email)

        if (emailTaken){
            throw Error('User already present with email');
        }
        
        const user = {
            id: uuidv4(),
            ...args.data
        }

        prisma.users.push(user)
        return user
    },
    updateUser(parent, args, { prisma }, info) {
        const {id, data} = args
        const user = prisma.users.find((user) => user.id === id)
        console.log(user)

        if (!user) {
            throw Error('User not found')
        }

        if (typeof data.email === 'string') {
            const emailTaken = prisma.users.some((user) => user.email === data.email)
            if (emailTaken) {
                throw Error('Email already taken')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },
    deleteUser(parent, args, { prisma }, info) {
        const userIndex = prisma.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1){
            throw Error('User not found')
        }

        const deletedUsers = prisma.users.splice(userIndex, 1)

        prisma.posts = prisma.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                prisma.comments = prisma.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        })

        prisma.comments = prisma.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    createPost(parent, args, { prisma, pubsub }, info) {
        const userExist = prisma.users.some((user) => user.id === args.data.author)

        if (!userExist){
            throw Error('User does not exist');
        }
        
        const post = {
            id: uuidv4(),
            ...args.data
        }

        prisma.posts.push(post)

        if (post.published === true){
            pubsub.publish('post', { 
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            })
        }

        return post
    },
    deletePost(parent, args, { prisma, pubsub }, info) {
        const postIndex = prisma.posts.findIndex((post) => post.id === args.id)

        if (postIndex === -1){
            throw Error('Post not found')
        }

        const [post] = prisma.posts.splice(postIndex, 1)

        prisma.comments = prisma.comments.filter((comment) => {
            return comment.post !== args.id
        })

        if (post.published === true){
            pubsub.publish('post', { 
                post: {
                    mutation: 'DELETED',
                    data: post
                }
            })
        }

        return post
    },
    createComment(parent, args, { prisma, pubsub }, info) {
        const userExist = prisma.users.some((user) => user.id === args.data.author)
        const postExist = prisma.posts.some((post) => post.id === args.data.post)

        if (!userExist || !postExist){
            throw Error('User or Post does not Exist');
        }
        
        const comment = {
            id: uuidv4(),
            ...args.data
        }

        prisma.comments.push(comment)

        pubsub.publish(`comment ${args.data.post}`, { 
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })

        return comment
    },
    deleteComment(parent, args, { prisma, pubsub }, info) {
        const commentIndex = prisma.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1){
            throw Error('Comment not found')
        }

        const [deletedComment] = prisma.comments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: 'DELETED',
                data: deletedComment
            }
        })

        return deletedComment
    }

}

export {Mutation as default}