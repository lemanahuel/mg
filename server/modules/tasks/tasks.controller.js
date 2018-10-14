const async = require('async');
const _ = require('lodash');
const TaskModel = require('./task.model');

module.exports = class Task {

  static create(req, res) {
    TaskModel.create(req.body, (err, doc) => {
      res.status(200).json(doc);
    });
  }

  static list(req, res) {
    let q = req.query;
    let findParams = {};
    let findOptions = {};

    if (q.completed) {
      findParams.completed = true;
    }
    if (q.createdAt && parseInt(q.createdAt, 10)) {
      findParams.createdAt = {
        $gte: parseInt(q.createdAt, 10)
      };
    }

    if (q.limit) {
      findOptions.limit = q.limit;
    }

    if (q.order) {
      findOptions.order = q.order;
    }

    TaskModel.find(findParams, findOptions).lean().exec((err, docs) => {
      res.status(200).json(docs);
    });
  }

  static read(req, res) {
    TaskModel.findById(req.id).lean().exec((err, docs) => {
      res.status(200).json(docs);
    });
  }

  static update(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, req.body).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static delete(req, res) {
    TaskModel.findByIdAndRemove(req.params.id).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static updateDescription(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      description: req.body.description
    }).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static updateTitle(req, res) {
    TaskModel.findById(req.params.id).exec((err, doc) => {
      doc.title = req.body.title;
      doc.save((err, doc) => {
        res.status(200).json(doc);
      });
    });
  }

  static complete(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      completed: true
    }, { new: true }).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static uncomplete(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      complete: false
    }).lean().exec((err, doc) => {
      res.status(200).json(doc);
    });
  }

  static stats(req, res) {
    TaskModel.find().lean().exec((err, docs) => {
      res.status(200).json({
        amount: docs.length,
        completed: _.filter(docs, doc => doc.completed).length,
        incompleted: _.filter(docs, doc => !doc.completed).length
      });
    });
  }
}