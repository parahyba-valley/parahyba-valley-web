import getId from './utils/get-id';
import { query as q } from 'faunadb';
import { serverClient } from './utils/fauna-auth';

exports.handler = (event, context, callback) => {
  const id = getId(event.path);
  console.log(`Function 'startups-delete' invoked. delete id: ${id}`);
  return client.query(q.Delete(q.Ref(`classes/startups/${id}`)))
  .then((response) => {
    console.log("success", response);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    });
  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  });
}
