const Report = require('../models/Report');
const validator = require('express-validator');

// Get all
module.exports.list = function (req, res, next) {
    Report.find({}, function(err, report){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(report);
  });
}


// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Report.findOne({_id: id}, function(err, report){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!report) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(report);
  });
}


// Create
module.exports.create = [
  // validations rules
  validator.body('title', 'Please enter report Title').isLength({ min: 1 }),
  validator.body('title').custom(value => {
    return Report.findOne({title:value}).then(report => {
      if (report !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  validator.body('author', 'Please enter Author Name').isLength({ min: 1 }),
  validator.body('body', 'Please enter report Content').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var report = new Report({
        title : req.body.title,
        author : req.body.author,
        body : req.body.body,
    })

    // save record
    report.save(function(err, report){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: report._id
        });
    })
  }
]

// Update
module.exports.update = [
  // validation rules
  validator.body('title', 'Please enter report Title').isLength({ min: 1 }),
  validator.body('title').custom( (value, {req}) => {
    return Report.findOne({ title:value, _id:{ $ne: req.params.id } })
      .then( report => {
      if (report !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  validator.body('author', 'Please enter Author Name').isLength({ min: 1 }),
  validator.body('body', 'Please enter report Content').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Report.findOne({_id: id}, function(err, report){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        if(!report) {
            return res.status(404).json({
                message: 'No such record'
            });
        }

        // initialize record
        report.title =  req.body.title ? req.body.title : report.title;
        report.author =  req.body.author ? req.body.author : report.author;
        report.body =  req.body.body ? req.body.body : report.body;

        // save record
        Report.save(function(err, report){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            if(!report) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(report);
        });
    });
  }

]


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Report.findByIdAndRemove(id, function(err, report){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(report);
  });
}
