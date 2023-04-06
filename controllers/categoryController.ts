const categoryService = require('../services/categoryService');

const categoryController = {
  getCategoryList : async (req: any,res: any)=>{
    const data = await categoryService.getCategoryList();
    res.send(data)
  }
}

module.exports = categoryController;