import { not, shield } from 'graphql-shield'
import rules from './rules'

const { isAuthenticatedUser, isPostOwner } = rules

export default shield({
  Query: {
    login: not(isAuthenticatedUser),
    me: isAuthenticatedUser,
    posts: isAuthenticatedUser,
    post: isAuthenticatedUser,
  },
  Mutation: {
    signup: not(isAuthenticatedUser),
    resetPassword: not(isAuthenticatedUser),
    forgotPassword: not(isAuthenticatedUser),

    createPost: isAuthenticatedUser,
    deletePost: isPostOwner,
    publish: isPostOwner,
    updatePost: isPostOwner,
  },
})
