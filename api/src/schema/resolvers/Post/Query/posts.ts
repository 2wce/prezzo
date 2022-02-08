import { QueryPostsArgs } from '../../../../generated'
import { Context } from '../../../../utils'

export default async (
  _parent: unknown,
  args: QueryPostsArgs,
  { prisma, userId }: Context,
) => {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        id: userId,
      },
    },
  })

  console.log({ posts })
  return posts
}
