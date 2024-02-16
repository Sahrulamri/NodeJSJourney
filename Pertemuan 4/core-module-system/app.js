//  Core Module
// File System

const fs = require('fs');

// =================================================================================

// Menulis/ membuat file secara syncronous

// try {
//     fs.writeFileSync('text.txt', 'Hello World secara syncronous');
// } catch (err) {
//     console.log(err)
// }

//  ===========================================================================

// Menulis/membuat file dengan asyncronous



// fs.writeFileSync('text.txt', 'Hello World secara asyncronous guyyysss', (err) => {
//   if (err) throw err;
//   console.log(err);
// });

//  ===============================================================

// Membaca isi file secara syncronous
// const data = fs.readFileSync('text.txt', 'utf-8');
// console.log(data)

// ======================================================================

// Membacaa isi file secara asincronous
// import { readFile } from 'node:fs';

// readFile('text.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// // =========================================================================
// READLINE
// const readline = require('readline');

// const rl = readline.createInterface({ 
//     input:process.stdin,
//     output:process.stdout 
// });

// rl.question('Halo, selamat siang! \n silahkan masukkan nama Anda :', (nama) => {
//     rl.question('Silahkan masukkan noHp Anda :', (noHp) => {
//         console.log(`Halo  ${nama}`);
//         console.log(`no Hp Anda Adalah  ${noHp}`);
//         console.log(`Terima kasih atas kontribusinya!`)
//     rl.close();
//     });
// });


// =======================================================================================
// Latihan Aplikasi Kontac



function feedBack() {
    const rl = readline.createInterface({ 
        input:process.stdin,
        output:process.stdout 
    });


    rl.question('Halo, selamat siang! \n silahkan masukkan nama Anda :', (nama) => {
    rl.question('Silahkan masukkan noHp Anda :', (noHp) => {
        const data = {
            nama : nama,
            noHp :noHp
        }
        const file = fs.readFileSync('contacs.json', 'utf-8');
        const contacs = JSON.parse(file);
        contacs.push(data);
        fs.writeFileSync('contacs.json', JSON.stringify(contacs, null, 2), (err) => {
        if (err) throw err;
            console.log(err);
        });
        

    rl.close();
    });
});
}

feedBack();


