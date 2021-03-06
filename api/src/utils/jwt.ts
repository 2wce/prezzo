import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { clone } from 'lodash'
import { Context } from './prisma'

interface Token {
  id: string
}

type User = {
  id: string
}

// get user id from auth token
export function getUserId({ req }: Context): string | undefined {
  if (req && req.headers) {
    const Authorization = req.headers.authorization || req.headers.Authorization

    console.log({
      Authorization,
    })
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')

      const verifiedToken = verify(
        token,
        'process.env.JWT_SECRETasstring',
      ) as Token

      return verifiedToken && verifiedToken.id
    }
  }
  return undefined
}

// issue new token based on payload
export const issue = (payload: string | User | Buffer, jwtOptions = {}) => {
  return sign(clone(payload), 'process.env.JWT_SECRETasstring', jwtOptions)
}

export const isHashed = (password: string): boolean => {
  if (typeof password !== 'string' || !password) {
    return false
  }

  return password.split('$').length === 4
}

export const hashPassword = (password: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!password || isHashed(password)) {
      resolve(null)
    } else {
      hash(`${password}`, process.env.SALT as string, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    }
  })
}

export const validatePassword = (password: string, hashedPass: string) => {
  return compare(password, hashedPass)
}
