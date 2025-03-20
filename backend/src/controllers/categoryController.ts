import categoryService from '../services/categoryService';

const getCategory = async (req: any, res: any) => {
  const list = await categoryService.getCategoryList();

  return res.status(200).json({
    message: 'success',
    data: {
      category: list
    }
  })
}

const getThreads = async (req: any, res: any) => {
  const { categoryId } = req.params;

  const threadsCount = await categoryService.getThreadsCountByCategoryId(categoryId);
  const threads = await categoryService.getThreadsByCategoryId(categoryId);

  return res.status(200).json({
    message: 'success',
    data: {
      threadsCount: Number(threadsCount),
      threads
    }
  });
}

export default {
  getCategory,
  getThreads,
};