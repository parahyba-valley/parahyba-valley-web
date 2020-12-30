import { query as q } from 'faunadb';
import { serverClient } from './utils/fauna-auth';

exports.handler = (event, context, callback) => {
  const { STARTUPS_SIZE } = process.env;
  return serverClient.query(q.Paginate(q.Match(q.Ref('indexes/all_startups')), { size: parseInt(STARTUPS_SIZE) }))
    .then((response) => {
      const startupsRefs = response.data;
      const getAllStartupsDataQuery = startupsRefs.map((ref) => q.Get(ref));

      return serverClient.query(getAllStartupsDataQuery).then((ret) => callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret),
      }));
    }).catch((error) => callback(null, {
      statusCode: 400,
      body: JSON.stringify(error),
    }));
};
