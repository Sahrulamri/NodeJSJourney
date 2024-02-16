// Mengambil argumen dari command line
const yargs = require('yargs');
const { tulisPertanyaan,simpanContacs } = require('./contacs');


yargs.parse();

// const contacs = require('./contacs.js');


const main = async () => {
    const nama = await tulisPertanyaan(`masukkan Nama Anda :`);
    const eMail = await tulisPertanyaan('Masukkan Email Anda :');
    const noHp = await tulisPertanyaan(`Masukkan no Hp Anda :`);

    simpanContacs(nama, eMail, noHp);
}

main();
