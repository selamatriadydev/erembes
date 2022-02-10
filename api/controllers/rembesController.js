const Rembes = require('../models/Rembes');
const validator = require('express-validator');

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Get all limit paginasi
module.exports.list_limit = function (req, res, next) {
// const { page, size } = req.query;
    const size = 10;
    const { iduser } = req.params;
    const { page  } = req.query;
    // const { page } = 1;
    const { limit, offset } = getPagination(page, size);

    Rembes.paginate({rembesuserid: iduser}, { offset, limit })
    .then((data) => {
      var hasil = {
        totalItems: data.totalDocs,
        rembes: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      };
      return res.json(hasil);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error getting records.'
      });
    });
}
// Get all
module.exports.list = function (req, res, next) {
    Rembes.find({}, function(err, data){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(data);
  });
}


// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Rembes
  .findOne({ _id: id })
  .populate('rembesuserid')
  .populate('rembesproid')
  .then((data) => {
    return res.json(data);
  })
  .catch((err) => {
    return res.status(500).json({
      message: 'Error getting records.'
    });
  });
  // Rembes.findOne({_id: id}, function(err, data){
  //     if(err) {
  //         return res.status(500).json({
  //             message: 'Error getting record.'
  //         });
  //     }
  //     if(!data) {
  //         return res.status(404).json({
  //             message: 'No such record'
  //         });
  //     }
  //     return res.json(data);
  // });
}
// Get uploadImg
module.exports.uploadImg = function(req, res) {
  var file = req.file.name;
  return res.json({
      message: 'saved',
      file: file
  });
}


// Create
module.exports.create = [
  // validations rules
  validator.body('rembesuserid', 'Please enter user id').isLength({ min: 1 }),
  validator.body('rembesproid', 'Please enter Proyek id').isLength({ min: 1 }),
  validator.body('rembestgl', 'Please enter tanggal').isLength({ min: 1 }),
  validator.body('rembesnilai', 'Please enter nilai').isLength({ min: 1 }),
  validator.body('rembesimage', 'Please enter image').isLength({ min: 1 }),
  validator.body('rembesdesc', 'Please enter keterangan').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    let host_get = req.headers.host;
    let host_url = host_get.replace('/public', '');
    let file_url = 'http://' + host_url+'/api/uploads/'+req.body.rembesimage;
    // initialize record
    var rembes = new Rembes({
        rembesuserid : req.body.rembesuserid,
        rembesproid : req.body.rembesproid,
        rembestgl : req.body.rembestgl,
        rembesnilai : req.body.rembesnilai,
        rembesimage : req.body.rembesimage,
        rembesimageurl :file_url,
        rembesdesc : req.body.rembesdesc,
    })
    // save record
    rembes.save(function(err, data){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: data._id
        });
    })
  }
]

// Update
module.exports.update = [
  // validation rules
  validator.body('rembesuserid', 'Please enter user id').isLength({ min: 1 }),
  validator.body('rembesproid', 'Please enter Proyek id').isLength({ min: 1 }),
  validator.body('rembestgl', 'Please enter tanggal').isLength({ min: 1 }),
  validator.body('rembesnilai', 'Please enter nilai').isLength({ min: 1 }),
  validator.body('rembesimage', 'Please enter image').isLength({ min: 1 }),
  validator.body('rembesdesc', 'Please enter keterangan').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Rembes.findOne({_id: id}, function(err, data){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        if(!data) {
            return res.status(404).json({
                message: 'No such record'
            });
        }
        let host_get = req.headers.host;
        let host_url = host_get.replace('/public', '');
        let file_url = 'http://' + host_url+'/api/uploads/'+req.body.rembesimage;
        // initialize record
        data.rembesuserid =  req.body.rembesuserid ? req.body.rembesuserid : data.rembesuserid;
        data.rembesproid =  req.body.rembesproid ? req.body.rembesproid : data.rembesproid;
        data.rembestgl =  req.body.rembestgl ? req.body.rembestgl : data.rembestgl;
        data.rembesnilai =  req.body.rembesnilai ? req.body.rembesnilai : data.rembesnilai;
        data.rembesimage =  req.body.rembesimage ? req.body.rembesimage : data.rembesimage;
        data.rembesimageurl =  req.body.rembesimage ? file_url : data.rembesimageurl;
        data.rembesdesc =  req.body.rembesdesc ? req.body.rembesdesc : data.rembesdesc;

        // save record
        data.save(function(err, rembes){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            if(!rembes) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(rembes);
        });
    });
  }

]


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Rembes.findByIdAndRemove(id, function(err, proyec){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(proyec);
  });
}
