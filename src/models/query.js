import mysql from "mysql";

// dados para estabeler a ligação ao servidor MySQL
const pool = mysql.createPool({
  host: "saturno.esec.pt",
  user: "a2019117919",
  password: "cdmfbd",
  database: "a2019117919",
  charset: "utf8",
  // possibilidade de execução de várias instruções SQL em sequência
  multipleStatements: true
});

// função para a execução das queries, garantindo que o código que depende dos seus resultados aguarda pelos mesmos
export const runQuery = async (query, callback) => {
  pool.getConnection(function (err, connection) {
      if (err) {
          console.error(err);
      }
      connection.query(query, function (err, result, fields) {
          if (err) {
              console.error(err);
          }
          connection.release();
          return callback(err, result, fields);
      });
  });
}