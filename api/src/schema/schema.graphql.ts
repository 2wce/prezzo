import { gql } from 'apollo-server'

export default gql`
  input CreatePostInput {
    published: Boolean!
    content: String
    title: String!
  }

  input SignupInput {
    email: String!
    name: String
  }

  input LoginInput {
    email: String!
  }

  input UpdatePostInput {
    id: ID!
    content: String
    title: String
  }

  input ResetPasswordInput {
    password: String!
    passwordConfirmation: String!
    code: Int!
  }

  input ForgotPasswordInput {
    email: String
  }

  type AuthPayload {
    jwt: String
    user: User
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User
  }

  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
  }

  type Query {
    login(input: LoginInput!): AuthPayload
    me: User
    posts(searchTerm: String): [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    #auth
    signup(input: SignupInput!): AuthPayload!
    resetPassword(input: ResetPasswordInput!): AuthPayload
    forgotPassword(input: ForgotPasswordInput!): Boolean

    createPost(input: CreatePostInput!): Post!
    updatePost(input: UpdatePostInput!): Post!
    deletePost(id: ID!): Post
    publish(id: ID!): Post
  }
`
