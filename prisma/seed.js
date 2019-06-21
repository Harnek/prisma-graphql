const { prisma } = require('../src/generated/prisma-client')

async function main() {
  await prisma.createUser({
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join us for Prisma Day 2019 in Berlin',
          body: 'https://www.prisma.io/day/',
          published: true,
        },
      ],
    }
  })

  await prisma.createUser({
    name: 'Bob',
    email: 'bob@prisma.io',
    posts: {
      create: [
        {
          title: 'Subscribe to GraphQL Weekly for community news',
          body: 'https://graphqlweekly.com/',
          published: true,
          comments: {
            create: [
              {
                text: 'Can recommend 💯',
                author: {
                  connect: { email: 'alice@prisma.io' },
                },
              },
            ],
          },
        },
        // {
        //   title: 'Follow Prisma on Twitter',
        //   body: 'https://twitter.com/prisma',
        // },
      ],
    },
  })
}

main()