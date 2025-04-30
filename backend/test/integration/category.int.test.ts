import request from 'supertest';
import app from '../../src/app';
import { execSync } from 'child_process';

const categoryList = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
  { id: 4, name: 'Category 4' },
  { id: 5, name: 'Category 5' },
];

beforeAll(() => {
  execSync('npx supabase db reset', { stdio: 'inherit' });
});

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
    expect(res.body.data.threads).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: 'Thread 1 title',
          category_id: 1,
        }),
        expect.objectContaining({
          id: 2,
          title: 'Thread 2 title',
          category_id: 1,
        }),
      ]),
    );
  });

  it('should return empty list if offset is larger than the total count', async () => {
    const res = await request(app).get('/category/1?limit=2&offset=999');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([]);
  });

  it('should return 400 error if limit is invalid', async () => {
    const res = await request(app).get('/category/1?limit=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if limit is 0', async () => {
    const res = await request(app).get('/category/99?limit=0');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if offset is invalid', async () => {
    const res = await request(app).get('/category/1?offset=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid offset value');
  });

  it('should return 400 error if sort_by is invalid', async () => {
    const res = await request(app).get('/category/1?sort_by=not-likes-or-time');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Invalid sort_by parameter. Use 'time' or 'likes'.",
    );
  });

  it('should return 400 error if categoryId is invalid', async () => {
    const res = await request(app).get('/category/99');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Category not found');
  });
});
