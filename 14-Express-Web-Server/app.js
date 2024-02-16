const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root : __dirname});
})
app.get('/about', (req, res) => {
//   res.send('Ini adalah halaman about')
res.sendFile('./about.html', {root : __dirname});
})
app.get('/contact', (req, res) => {
//   res.send('Ini  adalah halaman Contact')
res.sendFile('./contact.html', {root : __dirname});
// res.json({
//     nama : 'Sandhika Galih',
//     email : 'sandhikagalih@gmail.com',
//     noHp : '987898766675'
// })
})

app.get('/product/:id', (req, res) => {
    // res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`);

    res.send(`Product ID : ${req.params.id} <br> Category Name : ${req.query.category}`);
    
})

app.use('/', (req, res) => {
res.status(404);
  res.send('404 Page Not Found');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})



// const http = require('http');
// const fs = require('fs');

// const port = 3000;

// const renderHtml = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if(err) {
//             res.writeHead(404);
//             res.write('Error : File Not Found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type' : 'text/html',
//     })
//     const url = req.url;
//     console.log(url);
//     // if(url === '/about') {
//     //     renderHtml('./about.html', res);
        
//     // } else if(url === '/contact') {
//     //     renderHtml('./contact.html', res);
//     // } else {
//     //     renderHtml('./index.html', res);
//     // }
//     switch(url) {
//         case '/about' :
//             renderHtml('./about.html', res);
//             break;
//         case '/contact' :
//             renderHtml('./contact.html', res);
//             break;
//         default:
//             renderHtml('./index.html', res);
//             break;
//     }
// }).listen(port, () => {
//     console.log(`Server is Listening on port ${port}.`);
// })