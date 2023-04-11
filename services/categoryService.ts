import connect from '../mysql/db';

const categoryService = {
  //查询分类
  check: async (name: string) => {
    const rows = await connect.query('select * from category where name=?', [name]);
    return rows[0];
  },

  //获取分类列表
  getCategoryList: async () => {
    const rows = await connect.query("SELECT c.id,c.name,ci.cover_img,ci.introduction,DATE_FORMAT(ci.createtime,'%Y-%m-%d %H:%i:%s') as createtime,DATE_FORMAT(ci.updatetime,'%Y-%m-%d %H:%i:%s') as updatetime from category as c INNER JOIN category_info as ci ON ci.category_id = c.id;");
    return rows[0];
  },

  //新增分类
  addCategory: async (name: string, coverImg: string = '', introduction: string = '') => {
    const rows1 = await connect.query('insert into category (name) values (?);', [name]);
    const rows2 = await connect.query('insert into category_info (cover_img,introduction,createtime,category_id) values(?,?,NOW(),LAST_INSERT_ID());', [coverImg, introduction]);
    return {
      row1: rows1[0].affectedRows,
      row2: rows2[0].affectedRows
    };
  },

  //修改分类
  updateCategory: async (id: number, name: string, coverImg: string = '', introduction: string = '') => {
    const rows1 = await connect.query("UPDATE category SET name=? WHERE id=?;", [name, id]);
    const rows2 = coverImg === '' ? await connect.query("UPDATE category_info SET introduction=? WHERE category_id=?", [introduction, id]) : await connect.query("UPDATE category_info SET cover_img=?, introduction=? WHERE category_id=?", [coverImg, introduction, id]);
    return {
      row1: rows1[0].affectedRows,
      row2: rows2[0].affectedRows
    };
  }
}

module.exports = categoryService;