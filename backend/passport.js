const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const SECRET = 'secret'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
}

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
        console.log(jwt_payload.userId)
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.userId }
      })
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      return done(err, false)
    }
  })
)

module.exports = passport