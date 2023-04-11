const fs = require('fs');
const path = require('path');
const util = require('util');
const rename = util.promisify(fs.rename); //转为promise

function getFileSuffix(str: string) {
  const i = str.lastIndexOf(".");
  const path = str.substring(i + 1, str.length);
  return path;
}

async function SaveToUploads(dirname: string, tempPath: string, name: string) {
  if (dirname !== 'category' && dirname !== 'note') return
  const suffix = getFileSuffix(tempPath);
  const pathName = `${Date.now()}-${name}.${suffix}`;   //根据当前时间戳生成文件名
  const targetPath = path.join(__dirname, `../public/uploads/${dirname}`, `${pathName}`);
  try {
    await rename(tempPath, targetPath);
  } catch (error) {
    console.error(error);
  }
  return `/uploads/${dirname}/${pathName}`;
}

module.exports = SaveToUploads;