const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/contacts');
const {body, validationResult, check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);


// Build in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie : {maxAge : 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized : true,
  })
);
app.use(flash());

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
    contacts,
    msg: req.flash('msg'),
  });
});

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {

  res.render('addContact', {
    layout : 'layouts/main-layout',
    title : 'Halaman Tambah Contact',
  });
});

// proses data contact
app.post('/contact', [
  check('email', 'Email Anda tidak vallid').isEmail(),
  body('email').custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error('Email sudah digunakan!');
    }
    return true;
  }),
  check('nohp', 'No HP Anda tidak valid').isMobilePhone('id-ID'),
 
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    // return res.status(400).json({errors :errors.array()});
    res.render('addContact', {
      title: 'Form tambah Contact',
      layout : 'layouts/main-layout',
      errors : errors.array(),
    });
  } else {
    addContact(req.body)
    // kirimkan flash message
    req.flash('msg', 'Contact Baru Berhasil Ditambahkan!');
    res.redirect('/contact');
  }
});

// halamaan detail contact
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



