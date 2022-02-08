import { Post } from '@prisma/client'
import { Context } from '../../../utils'
import Mutation from './Mutation'
import Query from './Query'

export default {
  Query,
  Mutation,
  Post: {
    author: (parent: Post, _args: unknown, { prisma }: Context) => {
      console.log({ parent })
      return prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}

// select * from user where id IN [$1]
