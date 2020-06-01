import { Options } from './index'
import { createHmacSigner } from './sign'

class JsonWebTokenError extends Error {
  constructor(msg: string) {
    super()
    this.name = 'JsonWebTokenError'
    this.message = msg
  }
}

// verify is equal
function verifyEqual (thing: string, sig: string, secrect: string | Buffer): boolean {
  const computeSig = createHmacSigner(thing, secrect)
  // console.log('verifyEqual--', computeSig, secrect)
  return computeSig === sig
}

export const verify = (jwtStr: string, opts: Options): [boolean, any] => {

  let jwtToken = jwtStr.split(' ')[1]  // "Bearer jwtToken"
  console.log(jwtStr, '-------', jwtToken)
  if(!/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+){1}$/.test(jwtToken)) {
    throw new JsonWebTokenError('jwt js error format')
  }

  try {
    const jwtTokenArr = jwtToken.split('.')

    let header = JSON.parse(Buffer.from(jwtTokenArr[0], 'base64').toString('binary'))
    let payload = JSON.parse(Buffer.from(jwtTokenArr[1], 'base64').toString(opts.encoding || 'utf-8'));
    let signature = jwtTokenArr[2]

    // check header
    if(header && header.alg !== 'HS256') {
      return [false, 'invalid algorithm']
    }
    if(header && header.typ !== 'JWT') {
      return [false, 'invalid type']
    }

    // check payload
    if(payload && typeof payload.exp !== 'number') {
      return [false, 'invalid exp']
    }
    if(payload && typeof payload.iat !== 'number') {
      return [false, 'invalid iat']
    }

    // check signature
    if(!signature) {
      return [false, 'invalid signature']
    }

    // verify jwtString sig
    const isEqual = verifyEqual(jwtTokenArr[0] + '.' + jwtTokenArr[1], signature, opts.secret)
    if(!isEqual) {
      return [false, 'sig verify error']
    }

    // verify exp
    if(Date.now() >= payload.exp) {
      return [false, 'jwt expired']
    }

    return [true, payload]
  } catch(e) {
    throw new JsonWebTokenError(e.message || 'jwt verify error')
  }

}