import request from 'supertest';
import express from 'express';
import commentRouter from '../routes/commentRouter';
import commentService from '../services/commentService';
import threadService from '../services/threadService';

jest.mock('../services/commentService');
const mockedCommentService = commentService as jest.Mocked<typeof commentService>;
jest.mock('../services/threadService');
const mockedThreadServicae = threadService as jest.Mocked<typeof threadService>;

jest.mock('../middleware/auth', () => ({
  authRequired: (req: any, res: any, next: any) => {
    req.user = {
      id: '1',
      user_metadata: {
        username: 'User 1'
      }
    };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/comment', commentRouter);

describe('POST /comment', () => {
  it('should return 200 and new comment', async () => {
    const fakeComment = {
      id: 1,
      content: '<p>Hello world</p>',
      thread_id: 1,
      user_id: 1,
      filtered_content: '<p>Hello world</p>',
    };

    mockedThreadServicae.getThreadById.mockResolvedValue({ data: { thread_id: 1 }, error: null});
    mockedCommentService.createComment.mockResolvedValue({ data: fakeComment, error: null });

    const payload = {
      threadId: 1,
      content: '<p>Hello world</p>'
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      ...fakeComment,
      username: 'User 1',
      like: 0,
      dislike: 0,
      user_reaction: null,
    });
  });

  it('should return 500 and on error', async () => {
    mockedCommentService.createComment.mockResolvedValue({
      data: null,
      error: {
        message: '',
        code: '',
        details: '',
        name: '',
        hint: ''
      }
    });

    const payload = {
      threadId: 1,
      content: '<p>Hello world</p>'
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });

  it('should return 400 if threadId is not provided in payload', async () => {
    const payload = {
      content: '<p>Hello world</p>'
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread ID is missing');
  });

  it('should return 400 if content is not provided in payload', async () => {
    const payload = {
      threadId: 1
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is empty', async () => {
    const payload = {
      threadId: 1,
      content: ''
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if thread is not found', async () => {
    mockedThreadServicae.getThreadById.mockResolvedValue({ data: null, error: null});

    const payload = {
      threadId: 999,
      content: '<p>Hello world</p>'
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });
});

describe('POST /comment/:commentId/like', () => {
  it('should return 200 and liked data', async () => {
    const commentId = 1;
    mockedCommentService.getCommentById.mockResolvedValue({
      data: { id: commentId }, error: null
    });
    mockedCommentService.likeCommentById.mockResolvedValue({
      data: {
        user_id: 1,
        is_like: true
      },
      error: null
    });

    const res = await request(app).post(`/comment/${commentId}/like`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      user_id: 1,
      is_like: true
    });
  });

  it('should return 400 if comment is not found', async () => {
    const commentId = 1;
    mockedCommentService.getCommentById.mockResolvedValue({
      data: null, error: null
    });

    const res = await request(app).post(`/comment/${commentId}/like`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Comment not found');
  });
});

describe('POST /comment/:commentId/dislike', () => {
  it('should return 200 and disliked data', async () => {
    const commentId = 1;
    mockedCommentService.getCommentById.mockResolvedValue({
      data: { id: commentId }, error: null
    });
    mockedCommentService.dislikeCommentById.mockResolvedValue({
      data: {
        user_id: 1,
        is_like: false
      },
      error: null
    });

    const res = await request(app).post(`/comment/${commentId}/dislike`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      user_id: 1,
      is_like: false
    });
  });

  it('should return 400 if comment is not found', async () => {
    const commentId = 1;
    mockedCommentService.getCommentById.mockResolvedValue({
      data: null, error: null
    });

    const res = await request(app).post(`/comment/${commentId}/dislike`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Comment not found');
  });
});

describe('DELETE /comment/:commentId/reaction', () => {
  it('should return 200', async () => {
    const commentId = 1;
    mockedCommentService.getCommentById.mockResolvedValue({
      data: { id: commentId }, error: null
    });
    mockedCommentService.removeReactionInCommentById.mockResolvedValue({
      data: {
        user_id: 1,
        is_like: true
      },
      error: null
    });

    const res = await request(app).delete(`/comment/${commentId}/reaction`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('should return 400 if comment is not found', async () => {
    const commentId = 1;
    mockedCommentService.getCommentById.mockResolvedValue({
      data: null, error: null
    });

    const res = await request(app).delete(`/comment/${commentId}/reaction`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Comment not found');
  });
});
