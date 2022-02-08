const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const Proyek = new Schema ({
  proyekname: { type: String, required: true },
  proyekcode: { type: String, required: true, index: { unique: true } },
  proyekmember: { type: String, required: true },
});
Proyek.plugin(mongoosePaginate);

module.exports = mongoose.model('Proyek', Proyek)
