const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stadium: { type: String, required: true },
    thumbnail: { type: String }
})

const Team = mongoose.model('Team', teamSchema)

module.exports = { Team }