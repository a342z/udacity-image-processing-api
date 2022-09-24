import express from 'express';
import imagesRouter from './api/images';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('hello');
});

routes.use('/images', imagesRouter);

export default routes;
