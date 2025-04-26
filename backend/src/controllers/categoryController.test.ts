import request from 'supertest';
import express from 'express';
import categoryRouter from '../routes/categoryRouter';

const categoryList = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
  { id: 4, name: 'Category 4' },
  { id: 5, name: 'Category 5' },
];

const threadList = [
  { id: 1, title: 'Thread 1', category_id: 1 },
  { id: 2, title: 'Thread 2', category_id: 2 },
  { id: 3, title: 'Thread 3', category_id: 3 },
  { id: 4, title: 'Thread 4', category_id: 4 },
  { id: 5, title: 'Thread 5', category_id: 5 },
  { id: 6, title: 'Thread 6', category_id: 1 },
  { id: 7, title: 'Thread 7', category_id: 2 },
  { id: 8, title: 'Thread 8', category_id: 3 },
  { id: 9, title: 'Thread 9', category_id: 4 },
  { id: 10, title: 'Thread 10', category_id: 5 },
  { id: 11, title: 'Thread 11', category_id: 1 },
  { id: 12, title: 'Thread 12', category_id: 2 },
];

jest.mock('../services/categoryService', () => ({
  __esModule: true,
  default: {
    getCategoryList: jest.fn(() => ({
      data: categoryList,
      error: null
    })),
    getThreadsCountByCategoryId: jest.fn((categoryId: number) => ({
      count: threadList.filter(t => t.category_id == categoryId).length,
      error: null
    })),
    getThreadsByCategoryId: jest.fn((
      categoryId: number,
      limit: number,
      offset: number,
      userId: string | null,
      sort_by: 'time' | 'likes',
    ) => {
      const threads = threadList
        .slice(offset)
        .filter(t => t.category_id == categoryId);
      
      return {
        data: threads.slice(0, limit),
        error: null,
      }
    }),
    getCategoryById: jest.fn((id: number) => ({
      data: categoryList.find(c => c.id == id),
      error: null
    }))
  }
}));

jest.mock('../middleware/auth', () => ({
  authOptional: (req: any, res: any, next: any) => {
    req.user = { id: 'test-user-id' };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/category', categoryRouter);

describe('GET /category/list', () => {
  it('should return category list with status 200', async () => {
    const res = await request(app).get('/category/list');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.category).toEqual(categoryList);
  });
});

describe('GET /category/:categoryId', () => {
  it('should return thread list for a category', async () => {
    const res = await request(app).get('/category/1?limit=2&offset=0');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([
      { id: 1, title: 'Thread 1', category_id: 1 },
      { id: 6, title: 'Thread 6', category_id: 1 },
    ]);
  });

  it('should return empty list if offset is larger than the total count', async () => {
    const res = await request(app).get('/category/1?limit=2&offset=999');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([]);
  });

  it('should return 400 error if limit is invalid', async () => {
    const res = await request(app).get('/category/99?limit=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if limit is 0', async () => {
    const res = await request(app).get('/category/99?limit=0');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if offset is invalid', async () => {
    const res = await request(app).get('/category/99?offset=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid offset value');
  });

  it('should return 400 error if sort_by is invalid', async () => {
    const res = await request(app).get('/category/1?sort_by=not-likes-or-time');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid sort_by parameter. Use 'time' or 'likes'.");
  });

  it('should return 400 error if categoryId is invalid', async () => {
    const res = await request(app).get('/category/99');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Category not found');
  });
});
