const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Flash Require
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash  = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');


const app = express();
const port = 3000;

// Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized :true,
    })
);
app.use(flash());

// Halaman Home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Sandhika',
            email : 'saghikagalih@gmail.com',
            nim : 'A11.2021.56678'
        },
        {
            nama : 'Erik',
            email : 'erik@gmail.com',
            nim : 'A11.2021.34527',
        },
        {
            nama : 'Doddy Ferdiansyah',
            email: 'doddyferdyansyah@gmail.com',
            nim : 'A11.2022.45328'
        },
    ];
res.render('index',{
    layout:'layouts/main-layout',
    nama: 'Sandhika',
    mahasiswa,
    title: 'Halaman Home',
    })
    console.log('ini halaman home');
});

// Halaman About
app.get('/about', (req, res) => {

    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
});

// Halaman Contact
app.get('/contact', async (req, res) => {

    const contacts = await Contact.find();

    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });
});

// Halaman Detail Contact
app.get('/contact/:nama', async (req, res) => {
    
    const contact = await Contact.findOne({nama : req.params.nama})

    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    })
})

app.listen(port, () => {
    console.log(`Mongo Contact App is Listening at http://localhost:${port}`);
});