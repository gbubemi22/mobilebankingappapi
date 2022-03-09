const mongoose = require('mongoose');

// const TransferSchema = new mongoose.Schema({
//     balance: {
//        type: [Number],
//        min: 0,
//        trim: true
  
//     },
//     deposit: {
//         type: [Number],
//         default: function (){
//             return this.balance + this.deposit
//         }
    
//     },
//     transfer: {
//         type: [Number],
//         default: function() {
//             return this.balance - this.transfer
//         }
    
//     },
    
// }, {timestamps: true})

// module.exports = mongoose.model('Balance', EntrySchema)

const transferSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    }
})