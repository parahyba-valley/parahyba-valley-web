import { query as q } from 'faunadb';
import { serverClient } from './utils/fauna-auth';

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const startup = {
    data,
  };
  return serverClient.query(q.Create(q.Ref('classes/startups'), startup))
    .then((response) => callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    })).catch((error) => callback(null, {
      statusCode: 400,
      body: JSON.stringify(error),
    }));
};
