import * as Crypto from 'crypto'

interface IPayloadOptions {
  exp: number  // delta time
  [key: string]: any
}

class Options {
  alg?: string = 'HS256'
  typ?: string = 'JWT'
  expiresIn?: number
  encoding?: BufferEncoding = 'utf-8'
}

export function createHmacSigner (thing: string, secret: string | Buffer): string {
  let sig = Crypto.createHmac('sha256', secret).update(thing).digest('base64')
  return sig.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function toString(obj: any) {
  if (typeof obj === 'string') {
    return obj;
  }
  if (typeof obj === 'number') {
    return obj.toString();
  }
  if (Buffer.isBuffer(obj)) {
    return obj.toString();
  }
  return JSON.stringify(obj);
}

function base64url(string: string, encoding: BufferEncoding): string {
  return Buffer
    .from(string, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function jwtSecuredInput(header: any, payload: any, encoding: BufferEncoding) {
  encoding = encoding || 'utf8';
  let encodedHeader = base64url(toString(header), 'binary');
  let encodedPayload = base64url(toString(payload), encoding);
  return `${encodedHeader}.${encodedPayload}`
}

// sign jwt

export const sign = (payload: IPayloadOptions, secret: string | Buffer, opts: Options = new Options) => {

  let header = opts;

  if(payload.exp <= 0) {
    throw new Error('the payload.exp must be greater than 0')
  }

  payload.iat = Date.now() // sign time
  payload.exp = payload.iat + payload.exp // expire time, become time stamp

  let secretOrKey = secret;
  let encoding = opts.encoding;
  let securedInput = jwtSecuredInput(header, payload, encoding);
  let signature = createHmacSigner(securedInput, secretOrKey);
  const signStr = `${securedInput}.${signature}`
  return signStr
}