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
  const { sort_by = 'time' } = req.query; // sort by time or likes

  const userId = req.user?.id ?? null;

  if (!['time', 'likes'].includes(sort_by)) {
    return res.status(400).json({ message: "Invalid sort_by parameter. Use 'time' or 'likes'." });
  }

  const { count, error: countError } = await categoryService.getThreadsCountByCategoryId(categoryId);
  const { data, error } = await categoryService.getThreadsByCategoryId(categoryId, userId, sort_by);

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