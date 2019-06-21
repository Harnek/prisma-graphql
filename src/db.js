let users = [
    {
        id: '1',
        name: 'John',
        email: 'john@doe.com',
        age: 90
    },
    {
        id: '2',
        name: 'Bob',
        email: 'bob@example.com',
        age: 23
    },
    {
        id: '3',
        name: 'Jane',
        email: 'jane@doe.com',
        age: 30
    }
]

let posts = [
    {
        id: '11',
        title: 'GraphQL',
        body: 'Learning about new GraphQL Language',
        published: true,
        author: '1'
    },
    {
        id: '22',
        title: 'GraphQL2',
        body: 'Learning about new GraphQL Language: Intermediate',
        published: true,
        author: '1'
    },
    {
        id: '33',
        title: 'GraphQL3',
        body: 'Learning about new GraphQL Language: Advance',
        published: true,
        author: '2'
    },
]

let comments = [
    {
        id: '111',
        text: 'This is a sample comment',
        post: '11',
        author: '1'
    },
    {
        id: '222',
        text: 'This is a another sample comment',
        post: '22',
        author: '1'
    },
    {
        id: '333',
        text: 'This is a another sample comment',
        post: '11',
        author: '2'
    },
    {
        id: '444',
        text: 'This is a another sample comment',
        post: '33',
        author: '3'
    }
]

const db = {
    users,
    posts,
    comments
}

export {db as default}