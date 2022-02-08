import { MutationCreatePostArgs } from '../../../../generated'
import { Context } from '../../../../utils'

export default (
  _parent: unknown,
  { input }: MutationCreatePostArgs,
  { prisma, userId }: Context,
) => {
  const { title, content, published } = input

  //
  return prisma.post.create({
    data: {
      title,
      content,
      published,
      author: {
        connect: { id: userId },
      },
    },
  })
}
