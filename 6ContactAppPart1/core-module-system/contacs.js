const fs = require('fs');
const readline = require('readline');

    const rl = readline.createInterface({ 
        input:process.stdin,
        output:process.stdout 
    });

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

    // Membuat Promise
const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        })
    })
};

const simpanContacs = (nama, eMail, noHp) => {
    const data = {
        nama : nama,
        eMail : eMail,
        noHp :noHp
    }
    const file = fs.readFileSync('data/contacs.json', 'utf-8');
    const contacs = JSON.parse(file);
    contacs.push(data);
    fs.writeFileSync('data/contacs.json', JSON.stringify(contacs, null, 2), (err) => {
    if (err) throw err;
        console.log(err);
    });
    console.log(`Terima kasih sudah memasukkan data`);

rl.close();
}

module.exports = {
    tulisPertanyaan : tulisPertanyaan,
    simpanContacs : simpanContacs
}


