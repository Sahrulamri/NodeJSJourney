const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact} = require('./utils/contacts');

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);


// Build in Middleware
app.use(express.static('public'));



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

// Ambil semua data kontak
app.get('/contact', (req, res) => {
  const contacts = loadContact();

  res.render('contact', {
    layout : 'layouts/main-layout',
    title : 'Halaman Contact',
    contacts
  });

});
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  res.render('detail', {
    layout : 'layouts/main-layout',
    title : 'Halaman Detail Contact',
    contact,
  });

});


app.use('/', (req, res) => {
res.status(404);
  res.send('404 Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})



