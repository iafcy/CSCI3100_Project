import request from 'supertest';
import app from '../../src/app';
import { execSync } from 'child_process';
import { supabase } from '../../src/utils/supabase';

let accessToken = '';
let refreshToken = '';
let userId = '';

beforeEach(async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'user1@example.com',
    password: 'Password-1',
  });

  if (error) throw error;

  accessToken = data.session.access_token;
  refreshToken = data.session.refresh_token;
  userId = data.user.id;
});

beforeAll(() => {
  execSync('npx supabase db reset', { stdio: 'inherit' });
});

describe('POST /comment', () => {
  it('should return 401 when not logged in', async () => {
    const payload = {
      threadId: 1,
      content: '<p>Hello world</p>',
    };

    const res = await request(app).post('/comment').send(payload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return 200 and new comment', async () => {
    const res = await request(app)
      .post('/comment')
      .send({
        threadId: 1,
        content: '<p>Hello world</p>',
      })
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        content: '<p>Hello world</p>',
        thread_id: 1,
        filtered_content: '<p>Hello world</p>',
        username: 'User 1',
        like: 0,
        dislike: 0,
        user_reaction: null,
      }),
    );
  });

  it('should return 400 if threadId is not provided in payload', async () => {
    const payload = {
      content: '<p>Hello world</p>',
    };

    const res = await request(app)
      .post('/comment')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread ID is missing');
  });

  it('should return 400 if content is not provided in payload', async () => {
    const payload = {
      threadId: 1,
    };

    const res = await request(app)
      .post('/comment')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is empty', async () => {
    const payload = {
      threadId: 1,
      content: '',
    };

    const res = await request(app)
      .post('/comment')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is not a string', async () => {
    const payload = {
      threadId: 1,
      content: 1,
    };

    const res = await request(app)
      .post('/comment')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content should be a string');
  });

  it('should return 400 if thread is not found', async () => {
    const payload = {
      threadId: 999,
      content: '<p>Hello world</p>',
    };

    const res = await request(app)
      .post('/comment')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });
});

describe('POST /comment/:commentId/like', () => {
  it('should return 200 and liked data', async () => {
    const commentId = 1;

    const res = await request(app)
      .post(`/comment/${commentId}/like`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      user_id: userId,
      is_like: true,
    });
  });

  it('should return 400 if comment is not found', async () => {
    const commentId = 99;

    const res = await request(app)
      .post(`/comment/${commentId}/like`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Comment not found');
  });
});

describe('POST /comment/:commentId/dislike', () => {
  it('should return 200 and disliked data', async () => {
    const commentId = 2;

    const res = await request(app)
      .post(`/comment/${commentId}/dislike`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      user_id: userId,
      is_like: false,
    });
  });

  it('should return 400 if comment is not found', async () => {
    const commentId = 99;

    const res = await request(app)
      .post(`/comment/${commentId}/dislike`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Comment not found');
  });
});

describe('DELETE /comment/:commentId/reaction', () => {
  it('should return 200', async () => {
    const commentId = 1;

    const res = await request(app)
      .delete(`/comment/${commentId}/reaction`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('should return 400 if comment is not found', async () => {
    const commentId = 99;

    const res = await request(app)
      .delete(`/comment/${commentId}/reaction`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Comment not found');
  });
});
