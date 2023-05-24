import { AppDataSource } from '../mysql/db';
import { Category } from '../entity/Category';
import { CategoryInfo } from '../entity/CategoryInfo';
import { Like } from 'typeorm';
import { noteService } from './noteService';
import { archiveService } from './archiveService';

const categoryRepository = AppDataSource.getRepository(Category);

const archiveType = 2;   //所属归档 type

export const categoryService = {
  //查询分类
  check: async (name: string) => {
    const rows = await categoryRepository.find({ where: { name: name } });
    return rows;
  },

  //根据 id 获取分类
  getIdCategory: async (id: number) => {
    const category = await categoryRepository.findOne({ where: { id: id } });
    return category;
  },

  //获取分类数量
  getCategoryCount: async () => {
    const count = await categoryRepository.count({ where: { isDelete: 0 } });
    return count;
  },

  //获取分类列表
  getCategoryList: async (limit?: number, offset?: number) => {
    const count = await categoryRepository.count({ where: { isDelete: 0 } });
    const rows = await categoryRepository.createQueryBuilder('category')
      .innerJoinAndSelect('category.categoryInfo', 'categoryInfo')
      .where('category.is_delete=:isDelete', { isDelete: 0 }).orderBy("category.id")
      .limit(limit).offset(offset).getMany();
    return {
      count,
      rows
    };
  },

  //新增分类
  addCategory: async (name: string, coverImg: string = '', introduction: string = '') => {
    const row = await AppDataSource.transaction(async transactionalEntityManager => {
      const category = new Category();
      category.name = name;
      const saveCategoryData = await transactionalEntityManager.save(category);

      const categoryInfo = new CategoryInfo();
      categoryInfo.coverImg = coverImg;
      categoryInfo.introduction = introduction;
      categoryInfo.category = saveCategoryData;
      const row = await transactionalEntityManager.save(categoryInfo);

      const archiveRow = await archiveService.addArchive(saveCategoryData.name, archiveType, saveCategoryData.id);

      return row;
    })
    return row;
  },

  //修改分类
  updateCategory: async (id: number, name: string, coverImg: string = '', introduction: string = '') => {
    const rows = await AppDataSource.transaction(async transactionalEntityManager => {
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
          categoryInfo.updateTime = new Date();
        }
        row2 = await transactionalEntityManager.save(categoryInfo);

        const archiveRow = await archiveService.addArchive(row1.name, archiveType, row1.id, true);
      }

      return {
        row1, row2
      }
    })
    return rows;
  },

  //删除分类
  deleteCategory: async (id: number) => {
    const rows = await AppDataSource.transaction(async transactionalEntityManager => {
      const row1 = await transactionalEntityManager.update(Category, id, { isDelete: 1 });
      const row2 = await noteService.deleteCategoryNote(id);
      return {
        row1,
        row2
      }
    })
    return rows;
  },

  //恢复删除的分类
  restoreCategory: async (id: number) => {
    const row = await categoryRepository.update(id, { isDelete: 0 });
    return row;
  },

  //搜索分类
  searchCategory: async (name: string, limit: number, offset: number) => {
    const count = await categoryRepository.count({ where: { name: Like(`%${name}%`), isDelete: 0 } })
    const rows = await categoryRepository.createQueryBuilder('category')
      .innerJoinAndSelect('category.categoryInfo', 'categoryInfo')
      .where({ name: Like(`%${name}%`), isDelete: 0 })
      .orderBy("category.id").limit(limit).offset(offset).getMany();
    return {
      count,
      rows
    };
  },

  //获取各分类下笔记数量
  getCategoryNoteCount: async () => {
    const rows = await categoryRepository.createQueryBuilder('category')
      .innerJoin('category.notes', 'note', "note.is_delete = :isDelete", { isDelete: 0 })
      .select(['category.name AS name', 'COUNT(note.id) AS count'])
      .where('category.is_delete = :isDelete', { isDelete: 0 })
      .groupBy('category.id')
      .limit(5)
      .orderBy('count', 'DESC')
      .getRawMany();
    return rows;
  }
}