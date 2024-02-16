const fs = require('fs');

// const { exit } = require('process');

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

    // Ambil seluruh data kontak
const loadContact = () => {
    const file = fs.readFileSync('data/contacs.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

// cari kontak berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find( (contact) => contact.nama.toLowerCase() === nama.toLowerCase());
        return contact;
}
module.exports = {loadContact, findContact};

