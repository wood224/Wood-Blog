import { AppDataSource } from "../mysql/db";
import { Upload } from "../entity/Upload";

const uploadRepository = AppDataSource.getRepository(Upload);

export const uploadService = {
  //上传图片
  upload: async (path: string) => {
    const upload = new Upload();
    upload.path = path;
    const row = uploadRepository.save(upload);
    return row;
  }
}