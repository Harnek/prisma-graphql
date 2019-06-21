const Post = {
    async author(parent, args, { prisma }, info) {
        const users = await prisma.users({
            where: {
                id: parent.author
            }
        })
        if (!users){
            throw new Error('Invalid User')
        }

        return users[0]
    },
    async comments(parent, args, { prisma }, info) {
        return await prisma.comments({
            where: { 
                post: {
                    id: parent.id
                } 
            }
        })
    }
}

export {Post as default}