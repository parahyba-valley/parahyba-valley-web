import { query as q } from 'faunadb';
import getId from './utils/get-id';
import ServerClient from './utils/fauna-auth';

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = getId(event.path);
  return ServerClient.query(q.Update(q.Ref(`classes/startups/${id}`), { data }))
    .then((response) => callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    })).catch((error) => callback(null, {
      statusCode: 400,
      body: JSON.stringify(error),
    }));
};
