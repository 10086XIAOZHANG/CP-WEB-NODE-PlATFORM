import JWT from '../core/jwt/index'
import { JWT_SECRET, JWT_KEY, NO_AUTH_URLS } from '../constants'

const _PROD_ = process.env.NODE_ENV === 'production'

export default JWT({
  debug: _PROD_ ? false : true,
  secret: JWT_SECRET,
  key: JWT_KEY,
  unless: NO_AUTH_URLS
})