// const { Client } = require('pg')
// const client = new Client({
//   host: 'my.database-server.com',
//   port: 5334,
//   user: 'database-user',
//   password: 'secretpassword!!',
// })

const fs = require('fs')
const { Pool } = require('pg')
const pool = new Pool({
  database: 'imagedb',
  user: 'postgres',
})
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
// callback - checkout a client

let findById = (restaurant_id) => {
  // pool.connect((err, client, done) => {
  //   if (err) throw err
  //   client.query('SELECT * FROM imagetable WHERE restaurant_id = $1', [restaurant_id], (err, res) => {
  //     console.log(res)
  //     // done()
  //     if (err) {
  //       // client.release()
  //       console.log(err.stack)
  //     } else {
  //       // console.log(res.rows[0])
  //       client.release()
  //       return (res.rows)
  //     }
  //   })
  // })



// promise - checkout a client
return pool.connect()
  .then(client => {
    return client
      .query('SELECT * FROM imagetable WHERE restaurant_id = $1', [restaurant_id])
      .then(res => {
        client.release()
       return (res.rows[0])
      })
      .catch(err => {
        client.release()
        return (err.stack)
      })
  })


// // async/await - check out a client
// (async () => {
//   const client = await pool.connect()
//   try {
//     const res = await client.query('SELECT * FROM imagetable WHERE restaurant_id = $1', [restaurant_id])
//     console.log(res.rows[0])
//   } finally {
//     // Make sure to release the client before any error handling,
//     // just in case the error handling itself throws an error.
//     client.release()
//   }
// })().catch(err => console.log(err.stack))

}


let findRestaurantAndPhoto = (restraurant_id, image_title) => {
  // promise - checkout a client
return pool.connect()
.then(client => {
  return client
    .query('SELECT * FROM imagetable WHERE restaurant_id = $1', [restaurant_id])
    .then(res => {
      client.release()
     return (res.rows[0])
    })
    .catch(err => {
      client.release()
      return (err.stack)
    })
})
}


module.exports = { findById, findRestaurantAndPhoto };