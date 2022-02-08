import { AuthenticationError } from 'apollo-server'
import { QueryLoginArgs } from '../../../../generated'
import { Context, emailRegExp, formatError, issue } from '../../../../utils'

export default async (
  _parent: unknown,
  { input: { email } }: QueryLoginArgs,
  { prisma }: Context,
) => {
  try {
    // The identifier is required.
    if (!email) {
      throw new AuthenticationError('Please provide your e-mail.')
    }

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(email)

    // if valid then search for user in database
    if (isEmail) {
      // search for user by email
      const user = await prisma.user.findFirst({
        where: { email: email.toLowerCase() },
      })

      if (!user) {
        throw new AuthenticationError('User not found.')
      }

      // @TODO: if user found then check if password is correct

      // if correct then return user
      return { jwt: issue({ id: user.id }), user }
    } else {
      throw new AuthenticationError('Invalid Email Format')
    }
  } catch (error) {
    formatError('login', error)
    return error
  }
}
