const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

    // Membuat folder jika belum ada
    const dirPath = './data';
    if(!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    // Membuat file jika belum ada
    const dataPath = './data/contacs.json';
    if(!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]', 'utf-8');
    }


const simpanContacs = (nama, eMail, noHp) => {
    const data = {
        nama : nama,
        eMail : eMail,
        noHp :noHp
    }
    const file = fs.readFileSync('data/contacs.json', 'utf-8');
    const contacs = JSON.parse(file);
    const duplicate = contacs.find((data) => data.eMail === eMail);
    if(duplicate) {
        console.log(chalk.red.bold.inverse`Email sudah ada`);
        return false;
    }

    // Cek email
    if(eMail) {
        if(!validator.isEmail(eMail)) {
            console.log(chalk.red.inverse.bold`Masukkan email yang benar`);
            return false;
        }
    }

    // Cek Nomor
    if(!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.bold.inverse`nomor HP anda tidak valid`);
        return false;
    }

    contacs.push(data);
    fs.writeFileSync('data/contacs.json', JSON.stringify(contacs, null, 2), (err) => {
    if (err) throw err;
        console.log(err);
    });
    console.log(chalk.green.bold.inverse`Terima kasih sudah memasukkan data`);


}

module.exports = {
    
    simpanContacs : simpanContacs
}


