const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const { nextTick } = require('process');
const port = 80;

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
