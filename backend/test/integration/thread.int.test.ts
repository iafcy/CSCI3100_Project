import request from 'supertest';
import app from '../../src/app';
import { execSync } from 'child_process';
import { supabase } from '../../src/utils/supabase';

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    userId: data.user.id,
  };
};

beforeAll(() => {
  execSync('npx supabase db reset', { stdio: 'inherit' });
});

describe('POST /thread', () => {
  it('should return 401 when not logged in', async () => {
    const payload = {
      categoryId: 1,
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app).post('/thread').send(payload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return 400 if category is not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 99,
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Category not found');
  });

  it('should return 400 if category ID is missing', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Category ID is missing');
  });

  it('should return 400 if title is missing', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      content: 'New thread content',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is missing');
  });

  it('should return 400 if title is empty', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      title: '',
      content: 'New thread content',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is missing');
  });

  it('should return 400 if title is not string', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      title: 1,
      content: 'New thread content',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is should be a string');
  });

  it('should return 400 if content is missing', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      title: 'New thread title',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is empty', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      title: 'New thread title',
      content: '',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is missing');
  });

  it('should return 400 if content is not string', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      title: 'New thread title',
      content: 1,
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Content is should be a string');
  });

  it('should return new thread with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      categoryId: 1,
      title: 'New thread title',
      content: 'New thread content',
    };

    const res = await request(app)
      .post('/thread')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        title: 'New thread title',
        username: 'User 1',
        like: 0,
        dislike: 0,
        user_reaction: null,
      }),
    );
  });
});

describe('GET /thread/following', () => {
  it('should return 401 when not logged in', async () => {
    const res = await request(app).get('/thread/following');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should get following threads', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const res = await request(app)
      .get('/thread/following')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toBeDefined();
    expect(res.body.data.threadsCount).toBeDefined();
  });

  it('should return empty list if offset is larger than the total count', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );
    const res = await request(app)
      .get('/thread/following?limit=2&offset=999')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([]);
  });

  it('should return 400 error if limit is invalid', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );
    const res = await request(app)
      .get('/thread/following?limit=not-a-number')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if limit is 0', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );
    const res = await request(app)
      .get('/thread/following?limit=0')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if offset is invalid', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );
    const res = await request(app)
      .get('/thread/following?offset=not-a-number')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid offset value');
  });

  it('should return 400 error if sort_by is invalid', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );
    const res = await request(app)
      .get('/thread/following?sort_by=not-likes-or-time')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Invalid sort_by parameter. Use 'time' or 'likes'.",
    );
  });
});

describe('GET /thread/:userId', () => {
  it('should get user threads', async () => {
    const res = await request(app).get(
      '/thread/user/606f8d97-eb19-4901-b229-b9358647caa5',
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toBeDefined();
    expect(res.body.data.threadsCount).toBeDefined();
  });

  it('should return empty list if offset is larger than the total count', async () => {
    const res = await request(app).get(
      '/thread/user/606f8d97-eb19-4901-b229-b9358647caa5?limit=2&offset=999',
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data.threads).toEqual([]);
  });

  it('should return 400 error if limit is invalid', async () => {
    const res = await request(app).get(
      '/thread/user/606f8d97-eb19-4901-b229-b9358647caa5?limit=not-a-number',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if limit is 0', async () => {
    const res = await request(app).get(
      '/thread/user/606f8d97-eb19-4901-b229-b9358647caa5?limit=0',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid limit value');
  });

  it('should return 400 error if offset is invalid', async () => {
    const res = await request(app).get(
      '/thread/user/606f8d97-eb19-4901-b229-b9358647caa5?offset=not-a-number',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid offset value');
  });

  it('should return 400 error if sort_by is invalid', async () => {
    const res = await request(app).get(
      '/thread/user/606f8d97-eb19-4901-b229-b9358647caa5?sort_by=not-likes-or-time',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Invalid sort_by parameter. Use 'time' or 'likes'.",
    );
  });

  it('should return 400 error if user is not found', async () => {
    const res = await request(app).get(
      '/thread/user/11111111-1111-1111-1111-111111111111',
    );

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found');
  });
});

describe('GET /thread/:threadId', () => {
  it('should get thread details', async () => {
    const res = await request(app).get('/thread/1');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        page: 1,
        pageCount: 1,
      }),
    );
  });

  it('should return 400 if thread is not found', async () => {
    const res = await request(app).get('/thread/999');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });
});

describe('POST /thread/:threadId/like', () => {
  it('should return 200 and liked data', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const threadId = 1;

    const res = await request(app)
      .post(`/thread/${threadId}/like`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      user_id: userId,
      is_like: true,
    });
  });

  it('should return 400 if thread is not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const threadId = 99;

    const res = await request(app)
      .post(`/thread/${threadId}/like`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });
});

describe('POST /thread/:threadId/dislike', () => {
  it('should return 200 and disliked data', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const threadId = 2;

    const res = await request(app)
      .post(`/thread/${threadId}/dislike`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      user_id: userId,
      is_like: false,
    });
  });

  it('should return 400 if thread is not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const threadId = 99;

    const res = await request(app)
      .post(`/thread/${threadId}/dislike`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });
});

describe('DELETE /thread/:threadId/reaction', () => {
  it('should return 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const threadId = 1;

    const res = await request(app)
      .delete(`/thread/${threadId}/reaction`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('should return 400 if thread is not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const threadId = 99;

    const res = await request(app)
      .delete(`/thread/${threadId}/reaction`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Thread not found');
  });
});
