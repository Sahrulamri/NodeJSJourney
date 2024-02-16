const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// Build in Middleware
app.use(express.static('public'));

// Aplication level Middleware

app.use((req, res, next) => {
  console.log('Time : ', Date.now());
  next();
});



app.get('/', (req, res) => {
   const mahasiswa = [
    {
      nama : 'Sandhika Galih',
      email : 'sandhikagalih@gmail.com'
    },
    {
      nama : 'Erik',
      email : 'erik@gmail.com'
    },
    {
      nama : 'Doddy Ferdiansyah',
      email : 'doddyferdiansyah@gmail.com'
    }
   ]
    res.render('index', {
      nama : 'Sandhika Galih',
      layout: 'layouts/main-layout',
     title : 'halaman Home',
     mahasiswa : mahasiswa
    });
})
app.get('/about', (req, res) => {

  res.render('about', {
    layout : 'layouts/main-layout',
    title : 'halaman About'
  });
})
app.get('/contact', (req, res) => {

  res.render('contact', {
    layout : 'layouts/main-layout',
    title : 'Halaman Contact'
  });

})

app.get('/product/:id', (req, res) => {


    res.send(`Product ID : ${req.params.id} <br> Category Name : ${req.query.category}`);
    
})

app.use('/', (req, res) => {
res.status(404);
  res.send('404 Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})



