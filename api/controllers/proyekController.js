const Proyek = require('../models/Proyek');
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
    // const { page } = req.params;
    const { page } = req.query;
    // const { page } = 1;
    const { limit, offset } = getPagination(page, size);

    Proyek.paginate({}, { offset, limit })
    .then((data) => {
      var hasil = {
        totalItems: data.totalDocs,
        proyeks: data.docs,
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
    Proyek.find({}, function(err, proyecs){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(proyecs);
  });
}


// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Proyek.findOne({_id: id}, function(err, proyec){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!proyec) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(proyec);
  });
}


// Create
module.exports.create = [
  // validations rules
  validator.body('proyekcode', 'Please enter Proyek Code').isLength({ min: 1 }),
  validator.body('proyekcode').custom(value => {
    return Proyek.findOne({proyekcode:value}).then(proyec => {
      if (proyec !== null) {
        return Promise.reject('Name already in use');
      }
    })
  }),
  validator.body('proyekname', 'Please enter proyek Name').isLength({ min: 1 }),
  validator.body('proyekmember', 'Please enter proyek member').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var proyec = new Proyek({
        proyekname : req.body.proyekname,
        proyekcode : req.body.proyekcode,
        proyekmember : req.body.proyekmember,
    })

    // save record
    proyec.save(function(err, proyec){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: proyec._id
        });
    })
  }
]

// Update
module.exports.update = [
  // validation rules
  validator.body('proyekcode', 'Please enter proyek code').isLength({ min: 1 }),
  validator.body('proyekcode').custom( (value, {req}) => {
    return Proyek.findOne({ proyekcode:value, _id:{ $ne: req.params.id } })
      .then( article => {
      if (article !== null) {
        return Promise.reject('code already in use');
      }
    })
  }),
  validator.body('proyekname', 'Please enter Proyek Name').isLength({ min: 1 }),
  validator.body('proyekmember', 'Please enter Proyek Member').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Proyek.findOne({_id: id}, function(err, proyec){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        if(!proyec) {
            return res.status(404).json({
                message: 'No such record'
            });
        }

        // initialize record
        proyec.proyekname =  req.body.proyekname ? req.body.proyekname : proyec.proyekname;
        proyec.proyekcode =  req.body.proyekcode ? req.body.proyekcode : proyec.proyekcode;
        proyec.proyekmember =  req.body.proyekmember ? req.body.proyekmember : proyec.proyekmember;

        // save record
        proyec.save(function(err, proyec){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            if(!proyec) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(proyec);
        });
    });
  }

]


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Proyek.findByIdAndRemove(id, function(err, proyec){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(proyec);
  });
}
