import { query as q } from 'faunadb';
import getId from './utils/get-id';
import { serverClient } from './utils/fauna-auth';

exports.handler = (event, context, callback) => {
  const id = getId(event.path);
  return serverClient.query(q.Delete(q.Ref(`classes/startups/${id}`)))
    .then((response) => callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    })).catch((error) => callback(null, {
      statusCode: 400,
      body: JSON.stringify(error),
    }));
};
