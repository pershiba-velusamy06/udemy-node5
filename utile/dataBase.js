const mongoose = require('mongoose');
let _db;

const createMongoConnection = (callBack) => {
    mongoose.connect('mongodb+srv://pershibavelusamy06:pershiba123@elredmongolearnings.uev0ssg.mongodb.net/')
        .then(() => {
            const client = mongoose.connection.getClient(); 
           
            _db = client.db();
            callBack(client);
        })
        .catch((err) => {
            console.log('MongoDB connection error:', err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.getDb = getDb;
exports.createMongoConnection = createMongoConnection;
