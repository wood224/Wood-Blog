import connect from '../mysql/db';

const categoryService = {
  //获取分类列表
  getCategoryList: async () => {
    const rows = await connect.query('select * from category');
    return rows[0];
  }
}

module.exports = categoryService;