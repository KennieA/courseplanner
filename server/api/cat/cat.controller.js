'use strict';

import _ from 'lodash';
import Cat from './cat.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}


// Gets a list of Cats
export function index(req, res) {
  Cat.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Cat from the DB
export function show(req, res) {
  Cat.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cat in the DB
export function create(req, res) {
  Cat.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Deletes a Cat from the DB
export function destroy(req, res) {
  Cat.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Updates an existing Employee in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Cat.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
