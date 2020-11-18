const express = require('express');
const app = express();
const gems = require('./models/gems.js'); //NOTE: it must start with ./ if it's just a file, not an NPM package

// index
app.get('/gems/', (req, res) => {
  res.render(
    'index.ejs',
  {
    allGems:gems
  }
   );
 });

// show route
app.get('/gems/:indexOfGemsArray', (req, res) => {
    res.render('show.ejs', {
      gem: gems[req.params.indexOfGemsArray]
    });
});

app.listen(3000, () => {
  console.log('Kira Kira');
})
