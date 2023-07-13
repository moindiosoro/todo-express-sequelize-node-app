const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return TodoItem
    .findAll({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId,
      },
    })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return TodoItem
        .update({
          content: req.body.content || todoItem.content,
          complete: req.body.complete || todoItem.complete,
        }, {where: {
          id: req.params.todoItemId,
        todoId: req.params.todoId,
        },}
        )
        .then(() => res.status(200).send(todo))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
      .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res) {
    return TodoItem
    .findAll({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId,
      },
    })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
        return TodoItem
          .destroy({
            where: {
              id: req.params.todoItemId,
              todoId: req.params.todoId,
            },
          })
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};