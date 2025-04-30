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
