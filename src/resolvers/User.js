const User = {
    async posts(parent, args, { prisma }, info) {
        return await prisma.posts({
            where: {
                author: {
                    id: parent.id
                }
            }
        })
    },
    async comments(parent, args, { prisma }, info) {
        return await prisma.comments({
            where: {
                author: {
                    id: parent.id
                }
            }
        })
    }
}

export {User as default}