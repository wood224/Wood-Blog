import { AppDataSource } from '../mysql/db';
import { Category } from '../entity/Category';
import { CategoryInfo } from '../entity/CategoryInfo';

export const categoryService = {
  //查询分类
  check: async (name: string) => {
    const rows = await AppDataSource.manager.find(Category, { where: { name: name } });
    return rows;
  },

  //获取分类列表
  getCategoryList: async () => {
    const rows = await AppDataSource.manager.createQueryBuilder(Category, 'category')
      .innerJoinAndSelect('category.categoryInfo', 'categoryInfo').orderBy("category.id").getMany();
    return rows;
  },

  //新增分类
  addCategory: async (name: string, coverImg: string = '', introduction: string = '') => {
    const rows = await AppDataSource.manager.transaction(async transactionalEntityManager => {
      //主表数据
      const category = new Category();
      category.name = name;
      //插入数据
      const saveCategoryData = await transactionalEntityManager.save(category);
      //副表数据
      const categoryInfo = new CategoryInfo();
      categoryInfo.coverImg = coverImg;
      categoryInfo.introduction = introduction;
      categoryInfo.category = saveCategoryData;
      //插入数据
      const row = await transactionalEntityManager.save(categoryInfo);

      return row;
    })
    return rows;
  },

  //修改分类
  updateCategory: async (id: number, name: string, coverImg: string = '', introduction: string = '') => {
    const rows = await AppDataSource.manager.transaction(async transactionalEntityManager => {
      const category = await transactionalEntityManager.findOne(Category, { where: { id }, relations: ["categoryInfo"] },);
      let row1 = null;
      let row2 = null;
      if (category) {
        const categoryInfo = category.categoryInfo;
        category.name = name
        row1 = await transactionalEntityManager.save(category);
        if (categoryInfo) {
          if (coverImg) {
            categoryInfo.coverImg = coverImg;
          }
          categoryInfo.introduction = introduction;
        }
        row2 = await transactionalEntityManager.save(categoryInfo);
      }
      return {
        row1, row2
      }
    })
    return rows;
  },

  //删除分类
  deleteCategory: async (id: number) => {
    const row = await AppDataSource.manager.delete(Category, id);
    return row;
  },

  //搜索分类
  searchCategory: async (name: string) => {
    const rows = await AppDataSource.manager.createQueryBuilder(Category, 'category')
      .innerJoinAndSelect('category.categoryInfo', 'categoryInfo').where('category.name LIKE :name', { name: `%${name}%` }).getMany();
    return rows;
  }
}