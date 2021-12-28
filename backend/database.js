const mongoose      = require('mongoose');
const MONGODB_URI   = 'mongodb://localhost/lubri-app'

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('Database is connected'))
.catch(err => console.log(err))