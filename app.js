const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(cookieParser());
app.use(express.static('public'));

app.use((req, res, next) => {
  const cookie = req.cookies.cloudmnCookie;

  if (!cookie) {
    res.cookie('cloudmnCookie', 'hello', {});
    console.log('cookie created successfully');
  } else {
    console.log('cookie exists', cookie);
  }

  console.log(req.get('Referer'));

  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'iframe/button.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
