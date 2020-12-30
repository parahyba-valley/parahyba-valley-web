import faunadb from 'faunadb';

export default ServerClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});
