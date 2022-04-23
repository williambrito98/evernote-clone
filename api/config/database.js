const mongoose = require('mongoose')

//UqGD0JoE8gUaQ2Vy

mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://admin:UqGD0JoE8gUaQ2Vy@cluster0.6gsfa.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then(e => {
    console.log('conectado')
}).catch(e => {
    console.log(e)
})



