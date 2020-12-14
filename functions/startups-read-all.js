import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log("Function `startups-read-all` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all_startups")), { size: 10 }))
  .then((response) => {
    const startupsRefs = response.data
    console.log("Startup refs", startupsRefs)
    console.log(`${startupsRefs.length} statups found`)
    const getAllStartupsDataQuery = startupsRefs.map((ref) => {
      return q.Get(ref)
    })
    // then query the refs
    return client.query(getAllStartupsDataQuery).then((ret) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret)
      })
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
