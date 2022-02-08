import { merge } from 'lodash'
import Auth from './Auth'
import Post from './Post'
import User from './User'

export default merge({}, Auth, Post, User)
