const fs = require('fs');
const path = require('path');
const util = require('util');
const rename = util.promisify(fs.rename); //转为promise

const allowedDirs = ['category', 'note', 'avatar', 'friendLink'];
const allowedSuffixes = ['jpg', 'png'];
const maxSize = 4 * 1024 * 1024;          //4MB

//获取文件后缀名
function getFileSuffix(str: string) {
  const i = str.lastIndexOf(".");
  const path = str.substring(i + 1, str.length);
  return path;
}

//校验文件
function checkFile(tempPath: string) {
  const suffix = getFileSuffix(tempPath);
  if (!allowedSuffixes.includes(suffix)) {
    return false;
  }
  const size = fs.statSync(tempPath).size;
  if (size > maxSize) return false
  return suffix;
}

//保存文件    参数：(要保存的目录名，文件路径，文件名)
export async function saveToUploads(dirname: string, tempPath: string, name: string) {
  if (!allowedDirs.includes(dirname)) return '';
  const suffix = checkFile(tempPath);
  if (!suffix) return '';
  const pathName = `${Date.now()}-${name}.${suffix}`;   //根据当前时间戳生成文件名
  const targetPath = path.join(__dirname, `../public/uploads/${dirname}`, `${pathName}`);
  try {
    await rename(tempPath, targetPath);
  } catch (error) {
    console.error(error);
  }
  return `/uploads/${dirname}/${pathName}`;
}