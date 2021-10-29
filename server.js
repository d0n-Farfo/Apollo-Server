const {ApolloServer, gql} = require("apollo-server");
// //const { VariablesAreInputTypesRule } = require("graphql");
// // const mongoose = require('mongoose');

// // require('dotenv').config({path: 'variables.env'});

// // mongoose.connect(process.env.MONGO_URI)
// //         .then(() => console.log('db is connected'))
// //         .catch(err => console.erroe(err));

// const blogs = [
//     {
//         title: "Champions league",
//         creator:"Martin Tyler",
//         date: "07/05/19",
//         comment:"good content",
//     },

//     {
//         title: "December Rave",
//         creator:"Matthew Cash",
//         date: "24/08/21",
//         comment:"Not very entertaining",
//     },

//     {
//         title: "A walk in the Park",
//         creator:"Steven Gerrard",
//         date: "12/04/16",
//         comment:"recommended for all",
//     }
// ];

// const schemas = gql`
//     type Blog {
//         title: String!
//         creator: String!
//         date: String
//         comment: String!
//     },
    
//     type Query {
//         blogs: [Blog]
//         blog(title: String!): Blog
//     }

//     type Creator {
//         creator: String!,
//     }

//     type Comment {
//         comment: String!
//     }

//     type Mutation{
//         CreateBlog(
//             title: String!,
//             creator: String!,
            
//         )
//     }
// `;

// const blogresolvers = {
//     Query:{
//         blogs: () => blogs,
//         blog: (parent, args) => blogs.find(blog.title = args.title)
//     },

//     Mutation:{
//         CreateBlog(parent, args ) {
//             const {title, creator, date} = args
//         },

//         DeleteBlog(parent, args ) {
//             const {title, creator, date} = args
//         },

//         UpdateBlog(parent, args ) {
//             const {title, creator, date} = args
//         }
//     }
// }


// const server = new ApolloServer({ typeDefs: schemas, resolvers: blogresolvers});

// server.listen(4100).then(({ url}) => {
//     console.log(`Server is really ready at ${url}`);
// }).catch(err => console.log(err));



const express= require('express')
const app=express();
const {graphqlHTTP}= require('express-graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema}=require('graphql')


const blogs = [
        {
            id:1,
            title: "Champions league",
            creator:"Martin Tyler",
            aboutcreator:"Sport commentator",
            date: "07/05/19",
            comment:"good content",
            banner: "First Banner ",
            like: 3000,
            unlike:50,
            reply:"I like this",
        },
    
        {
            id:2,
            title: "December Rave",
            creator:"Matthew Cash",
            aboutcreator:"Entertainment Enthusiast",
            date: "24/08/21",
            comment:"Not very entertaining",
            banner: "Second Banner",
            like : 1234,
            unlike:56,
            reply:"Mediocre",
    
        }, 
        {
            id:3,
            title: "A walk in the Park",
            creator:"Steven Gerrard",
            aboutcreator:"Football Legend",
            date: "12/04/16",
            comment:"recommended for all",
            banner: "Third Banner",
            like: 55757,
            unlike: 32,
            reply:"very True",
        }
    ];

    const BlogType= new GraphQLObjectType({
        name:'Blog',
        description:'Get specified Blog',
        fields:{

            id:{
                type:GraphQLInt
            },

            title:{
                type:GraphQLString
            },
    
            creator:{
                type:GraphQLString
            },
            
            aboutcreator:{
                type:GraphQLString
            },

            date:{
                type:GraphQLString
            },

            comments:{
                type:GraphQLString
            },

            banner:{
                type:GraphQLString
            },

            like:{
                type:GraphQLInt
            },

            unlike:{
                type:GraphQLInt
            },
        
            reply:{
                type: GraphQLString
            }
    
            
        }
    
    })

    const BlogQuery = new GraphQLObjectType({
        name:'BlogQuery',
        description:'Blog Query',
        fields:{
            Blogs:{
                type:GraphQLList(BlogType),
                resolve:()=> blogs   
            },
            Blog:{
                type:BlogType,
                args:{
                    id:{type:GraphQLInt}
                },
                resolve:(_,{id})=> blogs.find(Blog=>Blog.id==id)
            }
        }
    
    })

    const Mutations = new GraphQLObjectType({
        name:'Mutations',
        description:'Mutation list',
        fields:{

            CreateBlog:{
                type:BlogType,
                args:{
                    
                    title:{
                        type:GraphQLString
                    },
            
                    creator:{
                        type:GraphQLString
                    },
                    
                    aboutcreator:{
                        type:GraphQLString
                    },
        
                    date:{
                        type:GraphQLString
                    },
        
                    comments:{
                        type:GraphQLString
                    },
        
                    banner:{
                        type:GraphQLString
                    },
        
                    like:{
                        type:GraphQLInt
                    },
        
                    unlike:{
                        type:GraphQLInt
                    },
                
                    reply:{
                        type: GraphQLString
                    }    
                    
                    },
                    resolve:(_,{title, creator, aboutcreator, banner})=> {
                        const NewBlog={id:blogs.length,title:title, creator:creator,aboutcreator:aboutcreator,date:date,comment:comment,banner:banner,like:like=0,unlike:unlike=0,reply:reply=""}
                        blogs.push(NewBlog)
                        return NewBlog
                }                                   
            },    

            LikeBlog:{
                type:BlogType,
                args:{
                    id:{
                       type: GraphQLInt
                    },
                                      
                  },
                  resolve:(_,{id})=>{
                        
                        const LikedBlog= blogs[id]                       
                        LikedBlog.like=LikedBlog.like+1
                        
                        return LikedBlog
                                                
                }
            },

            UnlikeBlog:{
                type:BlogType,
                args:{
                    id:{
                       type: GraphQLInt
                    },
                                       
                  },
                  resolve:(_,{id})=>{
                    const UnlikedBlog= blogs[id]
                    UnlikedBlog.unlike+=1
                                                  
                    return UnlikedBlog
                }
            },

            DeleteBlog:{
                type:BlogType,
                args:{
                    
                    id:{
                        type: GraphQLInt
                    }
                    
                    },
                    resolve:(_,{id})=> {
                        const DeleteTheBlog=  blogs[id]
                        const BlogDelete= delete blogs[id]
                         return DeleteTheBlog
                }               
            },

            UpdateBlog:{
                type:BlogType,
                args:{
                    
                    id:{
                        type: GraphQLInt
                    },
                    title:{
                        type:GraphQLString
                    },
            
                    banner:{
                        type:GraphQLString
                    }
                                        
                    },
                    resolve:(_,{id, title, banner})=> {
                        const UpdatedBlog=  blogs[id]
                        UpdatedBlog.title= title
                        UpdatedBlog.banner= banner
                        return UpdatedBlog
                }                
            },

            CommentOnBlog:{
                type:BlogType,
                args:{
                    
                    id:{
                        type: GraphQLInt
                    },
                    comment:{
                        type:GraphQLString
                    },
            
                },
                resolve:(_,{id,comment})=> {
                    const BloggComment=  blogs[id]
                    BloggComment.comment= BloggComment.comment.concat(",",comment)
                    
                    return BloggComment
                }
            
            },

            DeleteCommentOnBlog:{
                type:BlogType,
                args:{
                    
                    id:{
                        type: GraphQLInt
                    },
                    comment:{
                        type:GraphQLString
                    },                    
                    
                    },
                    resolve:(_,{id,comment})=> {
                        const DeleComment=  blogs[id]
                        DeleComment.comment= DeleComment.comment.replace((","+comment)," ")
                        
                        return DeleComment
                }
    
            },

            ReplyCommentOnBlog:{
                type:BlogType,
                args:{
                    
                    id:{
                        type: GraphQLInt
                    },
                    reply:{
                        type:GraphQLString
                    },        
                    
                    },
                    resolve:(_,{id,reply})=> {
                        const CommentReply=  blogData[id]
                        
                        CommentReply.reply= CommentReply.reply.concat(",",reply)
                        
                        return CommentReply
                    }
            }
        
        }

    })

    const schema= new GraphQLSchema({query:BlogQuery,mutation:Mutations})

app.use('/',graphqlHTTP({
     schema,
     graphiql:true 
}))

const port= process.env.PORT || 4100

app.listen(port,()=>{
    console.log(`Port is ready ${port}`)
})






