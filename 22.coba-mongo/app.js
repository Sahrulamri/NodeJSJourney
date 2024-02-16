const {MongoClient, ObjectId} = require ('mongodb');

const uri = 'mongodb://127.0.0.1:27017';

const dbName = 'mahasiswa';

const client = new MongoClient(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

// Jalankan Menggunakan Callback
client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi gagal')
    }
    // console.log('Koneksi Berhasil');

    // Menambahkan data ke collection mahasiswa
    // pilih database
    const db = client.db(dbName);
    // Menambahkan 1 data
    // 
    
    // Menambahkan banyak data
    db.collection('mahasiswa').insertMany(
        [
            {
                nama : 'Erik',
                email: 'erik@example.com',
                nim : 'A11.2022.56746'
            },
            {
                nama : 'Avip',
                email: 'avip@gmail.com',
                nim : 'A11.2022.68543'
            }
        ],
        (error, result) => {
            if(error) {
                return console.log('Gagal menambahkan data')
            }

            console.log(result)
        }
    )

    // Menampilkan semua data
    console.log(
        db
        .collection('mahasiswa')
        .find()
        .toArray((error, result) => {
        console.log(result)
    })
    );

    // Menampilkan data berdasarkan kriteria
    console.log(
        db
        .collection('mahasiswa')
        .find({ nama: 'Erik'})
        .toArray((error, result) => {
        console.log(result)
    })
    );
    
    console.log(
        db
        .collection('mahasiswa')
        .find({ _id: ObjectId('656dde340cce8a5a389da0c6') })
        .toArray((error, result) => {
        console.log(result)
    })
    );

    // Update 1 data
    const updatePromise = db.collection('mahasiswa').updateOne(
        {
            _id: ObjectId('656dde340cce8a5a389da0c6'),
        },
        {
            $set: {
                nama: 'avip syaifullah',
            },
        }
    );
    updatePromise.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error)
    });

    // Update banyak data berdasarkan kriteria
    // const updatePromise = db.collection('mahasiswa').updateMany(
    //         {
    //             nama: 'Erik',
    //         },
    //         {
    //             $set: {
    //                 nama: 'Erik Emanuel',
    //             },
    //         }
    //     );
    //     updatePromise.then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error)
    //     });

    //  Menghapus 1 data
    // 
    
    // Menghapus banyak data
    db.collection('mahasiswa')
    .deleteMany(
        {
            nama: 'Erik Emanuel',
        }
    ).then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
});