import {
  Source,
  parse,
  validate,
  execute,
  formatError,
  getOperationAST,
  specifiedRules,
  GraphQLError, GraphQLSchema,
  ExecutionResult
} from 'graphql';
import { Request, Response } from 'koa';
import {Context} from '@core/koa'
import { renderGraphQL } from './renderGraphQL'

interface OptionsData {
  schema: GraphQLSchema
  context?: Context
  rootValue?: any
  graphql?: boolean
  formatError?: (error: GraphQLError, context: Context) => any
}

interface IGraphQLParams {
  query: string
  variables?: {[key: string]: any}
  operationName?: string
  raw?: boolean
}

export const KoaGraphql = (
  options: OptionsData | Function
  // Promise<OptionsData>
  ): (ctx: Context) => Promise<void> => {
    
  return async function middleware (ctx: Context): Promise<any> {
    const req = ctx.req; // node request
    const request = ctx.request; // koa request
    const response = ctx.response; // koa response

    let schema: GraphQLSchema,
      context: Context,
      rootValue: any,
      pretty,
      graphql,
      formatErrorFn: Function,
      extensionsFn,
      showGraphQL: boolean,
      query: string,
      documentAST,
      variables: {[key: string]: any},
      operationName: string,
      validationRules: [any],
      result: ExecutionResult;

    try{
        
      const optionsData: OptionsData = (typeof options === 'function' ? options(request, response, ctx) : options)

      if (!optionsData || typeof optionsData !== 'object') {
        throw new Error(
          'GraphQL middleware option function must return an options object ' +
            'or a promise which will be resolved to an options object.',
        );
      }

      if (!optionsData.schema) {
        throw new Error('GraphQL middleware options must contain a schema.');
      }

      schema = optionsData.schema;
      context = optionsData.context || ctx;
      rootValue = optionsData.rootValue;
      graphql = optionsData.graphql;
      formatErrorFn = optionsData.formatError;

      if(!/^(GET|POST)$/.test(ctx.method)) {
        response.set('Allow', 'GET, POST');
        ctx.status = 405;
        ctx.Json({status: 405, msg: 'GraphQL only supports GET and POST requests.'})
        // throw new Error('GraphQL only supports GET and POST requests.');
      }


      // ctx.body = ctx.body || ctx.query.query;

      // get graphql params
      const params: IGraphQLParams = ctx.method === 'GET' ? ctx.query : ctx.fields;
      query = params.query;
      variables = params.variables;
      operationName = params.operationName;
      showGraphQL = graphql && canDisplayGraphQL(request, params);

      console.log('\n')
      console.log('ctx graphql params: ', params)
      console.log('\n')

      result = await new Promise((resolve, reject): void => {
        if(!query) {
          if (showGraphQL) {
            return resolve(null);
          }
          ctx.throw(400, `'query' must be required.`)
        }

        // GraphQL source.
        const source = new Source(query, 'GraphQL request');

        // Parse source to AST, reporting any syntax error.
        try {
          documentAST = parse(source);
        } catch (syntaxError) {
          // Return 400: Bad Request if any syntax errors errors exist.
          response.status = 400;
          return resolve({ errors: [syntaxError] });
        }
        
        // Validate AST, reporting any errors.
        const validationErrors = validate(schema, documentAST, validationRules);
        if (validationErrors.length > 0) {
          // Return 400: Bad Request if any validation errors exist.
          response.status = 400;
          return resolve({ errors: validationErrors });
        }

        if (request.method === 'GET') {
          // Determine if this GET request will perform a non-query.
          const operationAST = getOperationAST(documentAST, operationName);
          if (operationAST && operationAST.operation !== 'query') {
            // If GraphQL can be shown, do not perform this query, but
            // provide it to GraphQL so that the requester may perform it
            // themselves if desired.
            if (showGraphQL) {
              return resolve(null);
            }

            // Otherwise, report a 405: Method Not Allowed error.
            response.set('Allow', 'POST');
            ctx.throw(
              405,
              `Can only perform a ${operationAST.operation} operation ` +
                'from a POST request.',
            );
          }
        }

        try {
          resolve(
            execute(
              schema,
              documentAST,
              rootValue,
              context,
              variables,
              operationName,
            ),
          );
        } catch (contextError) {
          // Return 400: Bad Request if any execution context errors exist.
          response.status = 400;
          resolve({ errors: [contextError] });
        }

      });

    } catch (error) {
      // If an error was caught, report the httpError status, or 500.
      response.status = error.status || 500;
      result = { errors: [error] };
    }
    
    if (result && result.data === null) {
      response.status = 500;
    }
    // Format any encountered errors.
    if (result && result.errors) {
      (result as any).errors = result.errors.map(
        err => (formatErrorFn ? formatErrorFn(err, context) : formatError(err)),
      );
    }

    // If allowed to show GraphQL, present it instead of JSON.
    if (showGraphQL) {
      const payload = renderGraphQL();
      response.type = 'text/html';
      response.body = payload;
    } else {
      // Otherwise, present JSON directly.
      const payload = pretty ? JSON.stringify(result, null, 2) : result;
      response.type = 'application/json';
      response.body = payload;
    }

  }
}

/**
 * Helper function to determine if GraphQL can be displayed.
 */
function canDisplayGraphQL(request: Request, params: IGraphQLParams): boolean {
  // If `raw` exists, GraphQL mode is not enabled.
  // Allowed to show GraphQL if not requested as raw and this request
  // prefers HTML over JSON.
  return !params.raw && request.accepts(['json', 'html']) === 'html';
}
