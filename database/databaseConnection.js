import mysql from "mysql2";



const connection = mysql.createConnection({
 host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
 database : 'jktech_db',
});


export function databaseConnect() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        return
      }
      return resolve("Connected to jkTech Assignment database!")
    });

  })

}


export const executeQuery = (query_string) => {
  return new Promise((resolve, reject) => {
    connection.query(query_string, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return reject(err)
      }
      return resolve(results)
    });
  })


}