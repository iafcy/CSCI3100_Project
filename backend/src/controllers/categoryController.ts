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
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const getThreads = async (req: any, res: any) => {
  const { categoryId } = req.params;
  const { sort_by = 'time', limit = 10, offset = 0 } = req.query; // sort by time or likes

  const userId = req.user?.id ?? null;

  // validation for query
  if (!['time', 'likes'].includes(sort_by)) {
    return res.status(400).json({ message: "Invalid sort_by parameter. Use 'time' or 'likes'." });
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ message: 'Invalid limit value' });
  }

  if (isNaN(offset) || offset < 0) {
    return res.status(400).json({ message: 'Invalid offset value' });
  }

  const { data: categoryData, error: categoryError } = await categoryService.getCategoryById(categoryId);

  if (categoryError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: categoryError.message
    });
  } else if (!categoryData) {
    return res.status(400).json({
      message: 'Category not found',
    });
  }

  const { count, error: countError } = await categoryService.getThreadsCountByCategoryId(categoryId);

  if (!countError) {
    if (count && count <= offset) {
      return res.status(200).json({
        message: 'success',
        data: {
          threadsCount: Number(count),
          threads: []
        }
      });
    }
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: countError.message
    });
  }

  const { data, error } = await categoryService.getThreadsByCategoryId(
    categoryId,
    limit,
    offset,
    userId,
    sort_by
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        threadsCount: Number(count),
        threads: data
      }
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

export default {
  getCategory,
  getThreads,
};