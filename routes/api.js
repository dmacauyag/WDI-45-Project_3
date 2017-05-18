const
  express = require('express'),
  apiRouter = express.Router(),
  apiController = require('../controllers/api.js')

apiRouter.route('/users')
  .get(apiController.index)

apiRouter.route('/users/:id')
  .get(apiController.show)

apiRouter.route('/users/:id/favorites')
  .post(apiController.create)

apiRouter.route('/users/:id/favorites/:favId')
  .patch(apiController.update)
  .delete(apiController.destroy)  

module.exports = apiRouter
