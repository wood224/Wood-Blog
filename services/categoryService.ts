import { AppDataSource } from '../mysql/db';
import { Category } from '../entity/Category';
import { CategoryInfo } from '../entity/CategoryInfo';

const categoryService = {
  //查询分类
  check: async (name: string) => {
    const rows = await AppDataSource.manager.find(Category, { where: { name: name } });
    return rows;
  },

  //获取分类列表
  getCategoryList: async () => {
    // const rows = await connect.query("SELECT c.id,c.name,ci.cover_img,ci.introduction,DATE_FORMAT(ci.createtime,'%Y-%m-%d %H:%i:%s') as createtime,DATE_FORMAT(ci.updatetime,'%Y-%m-%d %H:%i:%s') as updatetime from category as c INNER JOIN category_info as ci ON ci.category_id = c.id;");
    const rows = await AppDataSource.manager.createQueryBuilder(Category, 'category')
      .innerJoinAndSelect('category.categoryInfo', 'categoryInfo').getMany();
    return rows;
  },

  //新增分类
  addCategory: async (name: string, coverImg: string = '', introduction: string = '') => {
    // const rows1 = await connect.query('insert into category (name) values (?);', [name]);
    // const rows2 = await connect.query('insert into category_info (cover_img,introduction,createtime,category_id) values(?,?,NOW(),LAST_INSERT_ID());', [coverImg, introduction]);

    //主表数据
    const category = new Category();
    category.name = name;
    //插入数据
    const saveCategoryData = await AppDataSource.manager.save(category);
    //副表数据
    const categoryInfo = new CategoryInfo();
    categoryInfo.coverImg = coverImg;
    categoryInfo.introduction = introduction;
    categoryInfo.category = saveCategoryData;
    //插入数据
    const row = await AppDataSource.manager.save(categoryInfo);

    return row;
  },

  //修改分类
  updateCategory: async (id: number, name: string, coverImg: string = '', introduction: string = '') => {
    // const rows1 = await connect.query("UPDATE category SET name=? WHERE id=?;", [name, id]);
    // const rows2 = coverImg === '' ? await connect.query("UPDATE category_info SET introduction=? WHERE category_id=?", [introduction, id]) : await connect.query("UPDATE category_info SET cover_img=?, introduction=? WHERE category_id=?", [coverImg, introduction, id]);

    const rows = await AppDataSource.manager.transaction(async transactionalEntityManager => {
      const category = await transactionalEntityManager.findOne(Category, { where: { id }, relations: ["categoryInfo"] },);
      if (category) {
        const categoryInfo = category.categoryInfo;
        category.name = name
        const row1 = await transactionalEntityManager.save(category);
        if (categoryInfo) {
          if (coverImg) {
            categoryInfo.coverImg = coverImg;
          }
          categoryInfo.introduction = introduction;
        }
        const row2 = await transactionalEntityManager.save(categoryInfo);
        return {
          row1,
          row2
        }
      } else {
        return null;
      }
    })
    return rows;
  }
}

module.exports = categoryService;