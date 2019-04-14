const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    // mongoURI: 'mongodb://localhost:27017/cerebrum'
    mongoURI: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@nodebet-kzcgn.mongodb.net/test?retryWrites=true`
}