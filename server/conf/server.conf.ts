
const _PROD_: boolean = process.env.NODE_ENV === 'production'

let PORT: number = 8020

if(_PROD_) {
  PORT = 8021
}

export {
  PORT
}