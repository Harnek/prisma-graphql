const Query = {
    async user(parent, args, {prisma}, info) {
        return await prisma.user({id: args.id})
    },
    async users(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR:[{ name_contains: args.query }, 
                    { email_contains: args.query }]
            }
        }
        
        return await prisma.users(opArgs)
    },
    async post(parent, args, {prisma}, info) {
        return await prisma.post({id: args.id})
    },
    async posts(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{ title_contains: args.query },
                    { body_contains: args.query }
                ]
            }
        }

        // Get post if any keyword found in title or body
        return await prisma.posts(opArgs)
    },
    async comment(parent, args, {prisma}, info) {
        return await prisma.comment({id: args.id})
    },
    async comments(parent, args, { prisma }, info) {
        if (!args.query) {
            return await prisma.comments()
        }

        return await prisma.comment(args.query)
    }
}

export {Query as default}