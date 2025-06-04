const fs = require('fs/promises');
const path = require('path');

const allowedDirs = ['category', 'note', 'avatar', 'friendLink'];
const allowedSuffixes = ['jpg', 'png'];
const maxSize = 4 * 1024 * 1024; // 4MB

// 获取文件后缀名
function getFileSuffix(str: string) {
  const i = str.lastIndexOf(".");
  const suffix = str.substring(i + 1, str.length);
  return suffix;
}

// 校验文件（异步）
async function checkFile(tempPath: string) {
  const suffix = getFileSuffix(tempPath);
  if (!allowedSuffixes.includes(suffix)) {
    return false;
  }

  try {
    const stats = await fs.stat(tempPath); // 使用异步 stat
    if (stats.size > maxSize) return false;
    return suffix;
  } catch (error) {
    console.error('文件校验失败:', error);
    return false;
  }
}

// 确保目录存在
async function ensureDirExists(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch (error) {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

// 保存文件
export async function saveToUploads(dirname: string, tempPath: string) {
  if (!allowedDirs.includes(dirname)) return '';
  const suffix = await checkFile(tempPath); // 使用 await
  if (!suffix) return '';
  const pathName = `${Date.now()}.${suffix}`;
  const targetPath = path.join(__dirname, '..', 'public', 'uploads', dirname, pathName);
  const targetDir = path.dirname(targetPath);

  try {
    await ensureDirExists(targetDir);
    await fs.copyFile(tempPath, targetPath);
    await fs.unlink(tempPath);
  } catch (error) {
    console.error('文件保存失败:', error);
    throw error;
  }

  return `/uploads/${dirname}/${pathName}`;
}