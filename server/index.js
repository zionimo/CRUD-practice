const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require("mysql");

// mysql.createPool(): 앱과 MySQL db 연결 풀을 생성하기 위한 메서드.
// mysql.createPool()의 매개변수: host, user, password, database, connectionLimit(선택적)
const db = mysql.createPool({
  host: "localhost", // MySQL db 서버의 호스트 주소
  user: "root", // db에 연결할 사용자 이름
  password: "mtmddus0558*", // 사용자의 비밀번호
  database: "cruddatabase", // 연결할 db의 이름
  // connectionLimit: 풀에 연결할 최대 연결 수(선택적)
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    console.log(result);
  });
});
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

// 앱이 port에서 실행되게 함
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
