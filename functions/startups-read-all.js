import { query as q } from 'faunadb';
import { serverClient } from './utils/fauna-auth';

exports.handler = (event, context, callback) => {
  console.log("Function `startups-read-all` invoked");
  return serverClient.query(q.Paginate(q.Match(q.Ref("indexes/all_startups")), { size: 1000 }))
  .then((response) => {
    const startupsRefs = response.data;
    console.log("Startup refs", startupsRefs);
    console.log(`${startupsRefs.length} statups found`);
    const getAllStartupsDataQuery = startupsRefs.map((ref) => {
      return q.Get(ref);
    });
    // then query the refs
    return serverClient.query(getAllStartupsDataQuery).then((ret) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret)
      });
    });
  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  });
}
