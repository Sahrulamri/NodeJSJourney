// Mengambil argumen dari command line
const yargs = require('yargs');
const contacts = require('./contacs');

yargs.command({
    command : 'add',
    describe : 'Menambahkan Contact baru',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email : {
            describe : 'Email',
            demandOption : false,
            type : 'string',
        },
        noHp: {
            describe : 'Nomor Handphone',
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv) {
        contacts.simpanContacs(argv.nama, argv.email, argv.noHp);
    }
});

yargs.parse();















// const contacs = require('./contacs.js');


// const main = async () => {
//     const nama = await contacs.tulisPertanyaan(`masukkan Nama Anda :`);
//     const eMail = await contacs.tulisPertanyaan('Masukkan Email Anda :');
//     const noHp = await contacs.tulisPertanyaan(`Masukkan no Hp Anda :`);

//     contacs.simpanContacs(nama, eMail, noHp);
// }

// main();
