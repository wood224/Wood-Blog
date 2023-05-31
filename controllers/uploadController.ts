import { Request, Response } from 'express';
import { saveToUploads } from '../utils/saveToUploads';
import { uploadService } from '../services/uploadService';
import { ResSend } from '../utils/ResSend';

export const uploadController = {
  //上传图片
  upload: async (req: Request, res: Response) => {
    const img = req.body.img;
    let path = '';
    if (img) {
      path = await saveToUploads('note', img.path);
    }
    const row = await uploadService.upload(path);
    if (row) {
      res.send({ url: path });
    } else {
      ResSend(res, 410, '图标上传出错！');
    }
  },
}