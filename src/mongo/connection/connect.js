const mongoose = require('mongoose')

const connnectionurl = "mongodb://localhost:27017/backendcrudmongo"
mongoose.connect(connnectionurl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("connect");
}).catch((error) => {
    console.log(error);
})

