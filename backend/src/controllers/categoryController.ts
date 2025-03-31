import { equal } from 'assert';
import categoryService from '../services/categoryService';

const getCategory = async (req: any, res: any) => {
  const { data, error } = await categoryService.getCategoryList();

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        category: data
      }
    });
  }
}

const getThreads = async (req: any, res: any) => {
  const { categoryId } = req.params;
  const userId = req.user?.id ?? null;

  const { count, error: countError }= await categoryService.getThreadsCountByCategoryId(categoryId);
  const { data, error } = await categoryService.getThreadsByCategoryId(categoryId, userId);

  if (!error && !countError) {
    return res.status(200).json({
      message: 'success',
      data: {
        threadsCount: Number(count),
        threads: data
      }
    });
  }
}

export default {
  getCategory,
  getThreads,
};