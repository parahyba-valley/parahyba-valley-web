import { query as q } from 'faunadb';
import { serverClient } from './utils/fauna-auth';

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  console.log("Function `startups-create` invoked", data);
  const startup = {
    data: data
  };
  /* construct the fauna query */
  return serverClient.query(q.Create(q.Ref("classes/startups"), startup))
  .then((response) => {
    console.log("success", response);
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    });
  }).catch((error) => {
    console.log("error", error);
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  });
}
