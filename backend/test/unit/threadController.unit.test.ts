jest.mock('../../src/utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      single: jest.fn(),
    })),
  },
}));

import request from 'supertest';
import express from 'express';

import threadRouter from '../../src/routes/threadRouter';
import threadService from '../../src/services/threadService';
import commentService from '../../src/services/commentService';
import userService from '../../src/services/userService';
import categoryService from '../../src/services/categoryService';

jest.mock('../../src/services/threadService');
const mockedThreadService = threadService as jest.Mocked<typeof threadService>;
jest.mock('../../src/services/commentService');
const mockedCommentService = commentService as jest.Mocked<
  typeof commentService
>;
jest.mock('../../src/services/userService');
const mockedUserService = userService as jest.Mocked<typeof userService>;
jest.mock('../../src/services/categoryService');
const mockedCategoryService = categoryService as jest.Mocked<
  typeof categoryService
>;

jest.mock('../../src/middleware/auth', () => ({
  authRequired: (req: any, res: any, next: any) => {
    req.user = {
      id: '1',
      user_metadata: {
        username: 'User 1',
      },
    };
    next();
  },
  authOptional: (req: any, res: any, next: any) => {
    next();
  },
}));

const app = express();
app.use(express.json());
app.use('/thread', threadRouter);

describe('POST /thread', () => {
  it('should create a thread successfully', async () => {
    mockedCategoryService.getCategoryById.mockResolvedValue({
      data: { id: 1, name: 'Category 1' },
      error: null,
    });
    mockedThreadService.createThread.mockResolvedValue({
      data: { id: 1, title: 'Test Thread' },
      error: null,
    });
    mockedCommentService.createComment.mockResolvedValue({
      data: { id: 1, content: 'Some content' },
      error: null,
    });

    const res = await request(app)
      .post('/thread')
      .send({ title: 'Test Thread', content: 'Some content', categoryId: 1 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual({
      id: 1,
      title: 'Test Thread',
      username: 'User 1',
      like: 0,
      dislike: 0,
      user_reaction: null,
    });
  });

  it('should return 400 if category is not found', async () => {
    mockedCategoryService.getCategoryById.mockResolvedValue({
      data: null,
      error: null,
    });

    const payload = {
      categoryId: 99,
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Category not found');
  });

  it('should return 500 for find category service error', async () => {
    mockedCategoryService.getCategoryById.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const payload = {
      categoryId: 99,
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 400 if category ID is missing', async () => {
    const payload = {
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Category ID is missing');
  });

  it('should return 400 if title is missing', async () => {
    const payload = {
      categoryId: 1,
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is missing');
  });

  it('should return 400 if title is empty', async () => {
    const payload = {
      categoryId: 1,
      title: '',
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is missing');
  });

  it('should return 400 if title is not string', async () => {
    const payload = {
      categoryId: 1,
      title: 1,
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is should be a string');
  });

  it('should return 400 if content is missing', async () => {
    const payload = {
      categoryId: 1,
      title: 'New thread title',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is empty', async () => {
    const payload = {
      categoryId: 1,
      title: 'New thread title',
      content: '',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is not string', async () => {
    const payload = {
      categoryId: 1,
      title: 'New thread title',
      content: 1,
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is should be a string');
  });

  it('should return 500 for create thread service error', async () => {
    mockedCategoryService.getCategoryById.mockResolvedValue({
      data: { id: 1, name: 'Category 1' },
      error: null,
    });
    mockedThreadService.createThread.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app)
      .post('/thread')
      .send({ title: 'Test Thread', content: 'Some content', categoryId: 1 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 500 for create thread service error', async () => {
    mockedCategoryService.getCategoryById.mockResolvedValue({
      data: { id: 1, name: 'Category 1' },
      error: null,
    });
    mockedThreadService.createThread.mockResolvedValue({
      data: { id: 1, title: 'Test Thread' },
      error: null,
    });
    mockedCommentService.createComment.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app)
      .post('/thread')
      .send({ title: 'Test Thread', content: 'Some content', categoryId: 1 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /thread/following', () => {
  it('should get following threads', async () => {
    mockedThreadService.getFollowingThreads.mockResolvedValue({
      data: [{ id: '1', title: 'Following Thread' }],
      error: null,
    });
    mockedThreadService.getFollowingThreadsCount.mockResolvedValue({
      data: 1,
      error: null,
    });

    const res = await request(app).get('/thread/following');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual({
      threads: [{ id: '1', title: 'Following Thread' }],
      threadsCount: 1,
    });
  });

  it('should return 500 for count service error', async () => {
    mockedThreadService.getFollowingThreads.mockResolvedValue({
      data: [{ id: '1', title: 'Following Thread' }],
      error: null,
    });
    mockedThreadService.getFollowingThreadsCount.mockResolvedValue({
      data: 1,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).get('/thread/following');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 500 for get follow thread service error', async () => {
    mockedThreadService.getFollowingThreads.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });
    mockedThreadService.getFollowingThreadsCount.mockResolvedValue({
      data: 1,
      error: null,
    });

    const res = await request(app).get('/thread/following');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return empty list if offset is larger than the total count', async () => {
    mockedThreadService.getFollowingThreadsCount.mockResolvedValue({
      data: 1,
      error: null,
    });

    const res = await request(app).get('/thread/following?limit=2&offset=999');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([]);
  });

  it('should return 400 error if limit is invalid', async () => {
    const res = await request(app).get('/thread/following?limit=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if limit is 0', async () => {
    const res = await request(app).get('/thread/following?limit=0');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if offset is invalid', async () => {
    const res = await request(app).get('/thread/following?offset=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid offset value');
  });

  it('should return 400 error if sort_by is invalid', async () => {
    const res = await request(app).get(
      '/thread/following?sort_by=not-likes-or-time',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Invalid sort_by parameter. Use 'time' or 'likes'.",
    );
  });
});

describe('GET /thread/user/:userId', () => {
  it('should get user threads', async () => {
    mockedUserService.getUserNameById.mockResolvedValue({
      data: { username: 'User1' },
      error: null,
    });
    mockedThreadService.getUserThreads.mockResolvedValue({
      data: [{ id: '1', title: 'User Thread' }],
      error: null,
    });
    mockedThreadService.getUserThreadsCount.mockResolvedValue({
      count: 1,
      error: null,
    });

    const res = await request(app).get('/thread/user/1');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual({
      threads: [{ id: '1', title: 'User Thread' }],
      threadsCount: 1,
      username: 'User1',
    });
  });

  it('should return 500 for count service error', async () => {
    mockedUserService.getUserNameById.mockResolvedValue({
      data: { username: 'User1' },
      error: null,
    });
    mockedThreadService.getUserThreads.mockResolvedValue({
      data: [{ id: '1', title: 'Following Thread' }],
      error: null,
    });
    mockedThreadService.getUserThreadsCount.mockResolvedValue({
      count: 1,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).get('/thread/user/1');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 500 for get follow thread service error', async () => {
    mockedThreadService.getUserThreads.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });
    mockedThreadService.getUserThreadsCount.mockResolvedValue({
      count: 1,
      error: null,
    });

    const res = await request(app).get('/thread/user/1');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return empty list if offset is larger than the total count', async () => {
    mockedThreadService.getFollowingThreadsCount.mockResolvedValue({
      data: 1,
      error: null,
    });

    const res = await request(app).get('/thread/user/1?limit=2&offset=999');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([]);
  });

  it('should return 400 error if limit is invalid', async () => {
    const res = await request(app).get('/thread/user/1?limit=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if limit is 0', async () => {
    const res = await request(app).get('/thread/user/1?limit=0');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if offset is invalid', async () => {
    const res = await request(app).get('/thread/user/1?offset=not-a-number');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid offset value');
  });

  it('should return 400 error if sort_by is invalid', async () => {
    const res = await request(app).get(
      '/thread/user/1?sort_by=not-likes-or-time',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Invalid sort_by parameter. Use 'time' or 'likes'.",
    );
  });
});

describe('GET /thread/:threadId', () => {
  it('should get thread details', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.getThreadPageCountById.mockResolvedValue(1);
    mockedThreadService.getThreadPageById.mockResolvedValue({
      data: { id: '1', page: 1 },
      error: null,
    });

    const res = await request(app).get('/thread/1');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual({
      comments: { id: '1', page: 1 },
      page: 1,
      pageCount: 1,
    });
  });

  it('should return 400 if thread not found', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: null,
    });

    const res = await request(app).get('/thread/1');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });

  it('should return 500 for find thread service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).get('/thread/1');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 500 for get thread page service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.getThreadPageCountById.mockResolvedValue(1);
    mockedThreadService.getThreadPageById.mockResolvedValue({
      data: { id: '1', page: 1 },
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).get('/thread/1');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /thread/:threadId/like', () => {
  it('should like a thread', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.likeThreadById.mockResolvedValue({
      data: {},
      error: null,
    });

    const res = await request(app).post('/thread/1/like');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('should return 400 if thread not found', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: null,
    });

    const res = await request(app).post('/thread/1/like');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });

  it('should return 500 for find thread service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).post('/thread/1/like');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 500 for like thread service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.likeThreadById.mockResolvedValue({
      data: {},
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).post('/thread/1/like');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /thread/:threadId/dislike', () => {
  it('should dislike a thread', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.dislikeThreadById.mockResolvedValue({
      data: {},
      error: null,
    });

    const res = await request(app).post('/thread/1/dislike');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('should return 400 if thread not found', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: null,
    });

    const res = await request(app).post('/thread/1/dislike');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });

  it('should return 500 for find thread service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).post('/thread/1/dislike');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 500 for dislike thread service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.dislikeThreadById.mockResolvedValue({
      data: {},
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).post('/thread/1/dislike');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });
});

describe('DELETE /thread/:threadId/reaction', () => {
  it('should remove reaction from a thread', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.removeReactionInThreadById.mockResolvedValue({
      data: {},
      error: null,
    });

    const res = await request(app).delete('/thread/1/reaction');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('should return 400 if thread not found', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: null,
    });

    const res = await request(app).delete('/thread/1/reaction');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });

  it('should return 500 for find thread service error', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: null,
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).delete('/thread/1/reaction');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should remove reaction from a thread', async () => {
    mockedThreadService.getThreadById.mockResolvedValue({
      data: { id: '1', title: 'Thread Details' },
      error: null,
    });
    mockedThreadService.removeReactionInThreadById.mockResolvedValue({
      data: {},
      error: { message: '', code: '', details: '', name: '', hint: '' },
    });

    const res = await request(app).delete('/thread/1/reaction');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });
});
