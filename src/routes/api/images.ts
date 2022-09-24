import { Router, Request, Response } from 'express';
import sharp from 'sharp'
import path from 'path';

const imagesRouter = Router();
const imagesfullPath = path.resolve('./images/full');
const imagesResizedPath = path.resolve('./images/resized');
interface ImageParams {
  filename?: string;
  width?: string;
  height?: string;
}

const imagesList: Array<string | undefined> = ['cat'];
imagesRouter.get('/', async (req: Request, res: Response) => {
  const params: ImageParams = req.query;
  console.log(params);
  if (params.filename == undefined) {
    res.send('filename param is required');
    return;
  }
  if (params.filename == '') {
    res.send('filename param cant be empty');
    return;
  }
  if (!imagesList.includes(params.filename)) {
    res.send('image was not found');
    return;
  }
  if (!params.width && !params.height) {
    res.sendFile(imagesfullPath + '/' + params.filename + '.jpg');
    return;
  }
  if (!params.width || !params.height) {
    res.send('width param and height param both are required');
    return;
  }

  if (Number(params.width) <= 0) {
    res.send('width should be a positve number');
    return;
  }

  if (Number(params.height) <= 0) {
    res.send('height should be a positve number');
    return;
  }

  if (params.height && params.width) {
    const imageResizedPath =
      imagesResizedPath +
      '/' +
      params.filename +
      '_resized_' +
      params.width +
      '_' +
      params.height +
      '.jpg';
    await sharp(imagesfullPath + '/cat.jpg')
      .resize(Number(params.width), Number(params.height))
      .jpeg({ mozjpeg: true })
      .toFile(imageResizedPath);

    res.sendFile(imageResizedPath);
  }
});

export default imagesRouter;
