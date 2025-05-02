jest.mock('../utils/supabase', () => ({
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
import { title } from 'process';

jest.mock('../services/threadService');
const mockedThreadService = threadService as jest.Mocked<typeof threadService>;
jest.mock('../services/commentService');
const mockedCommentService = commentService as jest.Mocked<typeof commentService>;
jest.mock('../services/userService');
const mockedUserService = userService as jest.Mocked<typeof userService>;

jest.mock('../middleware/auth', () => ({
    authRequired: (req: any, res: any, next: any) => {
      req.user = {
        id: '1',
        user_metadata: {
          username: 'User 1',
        },
      };
      next();
    },
  }));
  
  const app = express();
  app.use(express.json());
  app.use('/thread', threadRouter);

  describe('POST /thread', () => {
    it('should create a thread successfully', async () => {
      mockedThreadService.createThread.mockResolvedValue({
        data: { id: '1', title: 'Test Thread' },
        error: null,
      });
      mockedCommentService.createComment.mockResolvedValue({
        data: { id: '2', content: 'Some content' },
        error: null,
      });
  
      const res = await request(app)
        .post('/thread')
        .send({ title: 'Test Thread', content: 'Some content' });
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.data).toEqual({
        id: '1',
        title: 'Test Thread',
        username: 'User 1',
        like: 0,
        dislike: 0,
        user_reaction: null,
      });
    });
  });

  describe('GET /thread/following', () => {
    it('should get following threads', async () => {
      mockedThreadService.getFollowingThreads.mockResolvedValue({ data: [{ id: '1', title: 'Following Thread' }], error: null });
      mockedThreadService.getFollowingThreadsCount.mockResolvedValue({ data: 1, error: null });

      const res = await request(app).get('/thread/following');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.data).toEqual({
        threads: [{ id: '1', title: 'Following Thread' }],
        threadsCount: 1,
      });
    });
  });

  describe('GET /thread/user/:userId', () => {
    it('should get user threads', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: { username: 'User1' }, error: null });
      mockedThreadService.getUserThreads.mockResolvedValue({ data: [{ id: '1', title: 'User Thread' }], error: null });
      mockedThreadService.getUserThreadsCount.mockResolvedValue({ count: 1, error: null }); // <-- ✅ ADD THIS
  
      const res = await request(app).get('/thread/user/1');
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.data).toEqual({
        threads: [{ id: '1', title: 'User Thread' }],
        threadsCount: 1,
        username: 'User1',
      });
    });
  });

  describe('GET /thread/:threadId', () => {
    it('should get thread details', async () => {
      mockedThreadService.getThreadById.mockResolvedValue({ data: { id: '1', title: 'Thread Details' }, error: null });
      mockedThreadService.getThreadPageCountById.mockResolvedValue(1); 
      mockedThreadService.getThreadPageById.mockResolvedValue({ data: { id: '1', page: 1 }, error: null });
  
      const res = await request(app).get('/thread/1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success')
      expect(res.body.data).toEqual({
        comments: { id: '1', page: 1 },
        page: 1,
        pageCount: 1,
      });
    });
  });

  describe('POST /thread/:threadId/like', () => {
    it('should like a thread', async () => {
      mockedThreadService.likeThreadById.mockResolvedValue({ data: {}, error: null });

      const res = await request(app).post('/thread/1/like');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success')
    });
  });

  describe('POST /thread/:threadId/dislike', () => {
    it('should dislike a thread', async () => {
      mockedThreadService.dislikeThreadById.mockResolvedValue({ data: {}, error: null });

      const res = await request(app).post('/thread/1/dislike');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success')
    });
  });

  describe('DELETE /thread/:threadId/reaction', () => {
    it('should remove reaction from a thread', async () => {
      mockedThreadService.removeReactionInThreadById.mockResolvedValue({ data: {}, error: null });

      const res = await request(app).delete('/thread/1/reaction');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success')
    });
  });
