const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const Rembes = new Schema ({
  rembesuserid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rembesproid: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyek' },
  rembestgl: { type: Date, default:Date.now  },
  rembesnilai: { type: Number, default: 0 },
  rembesimage: { type: String, required: true },
  rembesdesc: { type: String, required: true },
});
Rembes.plugin(mongoosePaginate);

module.exports = mongoose.model('Rembes', Rembes)
