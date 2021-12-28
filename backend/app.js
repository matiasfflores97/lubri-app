require('./database')
const express   = require('express');
const app       = express();
const cors      = require('cors');
const PORT      = 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/',     require('./routes/loginRoute'))
app.use('/api/', require('./routes/userRoute'))
app.use('/api/', require('./routes/productRoute'))

app.listen(PORT, () => {
    console.log(`app running at port: ${PORT}`)
})

module.exports = app