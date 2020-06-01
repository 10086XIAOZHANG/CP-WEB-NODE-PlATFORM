import * as Koa from 'koa'

class CORSOptionsData {
  origin: string | Function
  credentials?: boolean
  allowMethods?: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS']
  allowHeaders?: Array<string>
  maxAge?: number
  exposeHeaders?: [string]
}

const Cors = (options: CORSOptionsData = new CORSOptionsData())  => {

  return async (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
    let origin;
    if (typeof options.origin === 'function') {
      origin = options.origin(ctx); // frequently-used
    } else {
      origin = options.origin || ctx.get('Origin') || '*';
    }
    if (!origin || origin === ctx.origin) {
      return await next();
    }

    // Access-Control-Allow-Origin
    ctx.set('Access-Control-Allow-Origin', origin);

    if (ctx.method === 'OPTIONS') {
      // Preflight Request
      if (!ctx.get('Access-Control-Request-Method')) {
        return await next();
      }

      // Access-Control-Max-Age
      if (options.maxAge) {
        ctx.set('Access-Control-Max-Age', String(options.maxAge));
      }

      // Access-Control-Allow-Credentials
      if (options.credentials === true) {
        // When used as part of a response to a preflight request,
        // this indicates whether or not the actual request can be made using credentials.
        ctx.set('Access-Control-Allow-Credentials', 'true');
      }

      // Access-Control-Allow-Methods
      if (options.allowMethods) {
        ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','));
      }

      // Access-Control-Allow-Headers
      if (options.allowHeaders) {
        ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','));
      } else {
        ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
      }

      ctx.status = 204; // No Content(Recommended Use)
      ctx.body = ''
    } else {
      // Request
      // Access-Control-Allow-Credentials
      if (options.credentials === true) {
        if (origin === '*') {
          // `credentials` can't be true when the `origin` is set to `*`
          ctx.remove('Access-Control-Allow-Credentials');
        } else {
          ctx.set('Access-Control-Allow-Credentials', 'true');
        }
      }

      // Access-Control-Expose-Headers
      if (options.exposeHeaders) {
        ctx.set('Access-Control-Expose-Headers', options.exposeHeaders.join(','));
      }

      try {
        await next();
      } catch (err) {
        throw err;
      }
    }
  }
}

export default Cors
