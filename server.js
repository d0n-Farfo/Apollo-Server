const {ApolloServer, gql} = require("apollo-server")

const blogs = [
    {
        title: "Champions league",
        creator:"Martin Tyler",
        date: "07/05/19",
        comment:"good content",
    },

    {
        title: "December Rave",
        creator:"Matthew Cash",
        date: "24/08/21",
        comment:"Not very entertaining",
    },

    {
        title: "A walk in the Park",
        creator:"Steven Gerrard",
        date: "12/04/16",
        comment:"recommended for all",
    }
];

const schemas = gql`
    type Blog {
        title: String!
        creator: String!
        date: String
        #comment: String!
    },

    
    type Query {
        blogs: [Blog]
        blog(title: String!): Blog
    }
`;

const blogresolvers = {
    Query:{
        blogs: () => blogs,
        blog: (parent, args) => blogs.find(blog.title = args.title)
    },

    //Mutation{}
}


const server = new ApolloServer({ typeDefs: schemas, resolvers: blogresolvers});

server.listen(4100).then(({ url}) => {
    console.log(`Server is really ready at ${url}`);
}).catch(err => console.log(err));








