const fs = require('fs');
const path = require('path');

function getPathName(str: string) {
  const i = str.lastIndexOf("\\");
  const path = str.substring(i + 1, str.length);
  return path;
}

function saveToUploads(file: any) {
  const tempPath = file.path;
  const pathName = `${Date.now()}-${getPathName(tempPath)}`;   //根据当前时间戳生成文件名
  const targetPath = path.join(__dirname, '../public/uploads', `${pathName}`);
  fs.rename(tempPath, targetPath, (err: Error) => {
    if (err) {
      throw err;
    }
  })
  return `/uploads/${pathName}`;
}

module.exports = saveToUploads;