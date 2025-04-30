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

describe('POST /user/follow', () => {
  it('should return 401 when not logged in', async () => {
    const payload = {
      targetUserId: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
    };

    const res = await request(app).post('/user/follow').send(payload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return target user with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
    };

    const res = await request(app)
      .post('/user/follow')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        id: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
      }),
    );
  });

  it('should return status 204 if user is already followed', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
    };

    const res = await request(app)
      .post('/user/follow')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(204);
  });

  it('should return status 400 if target user not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    };

    const res = await request(app)
      .post('/user/follow')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found');
  });
});

describe('POST /user/block', () => {
  it('should return 401 when not logged in', async () => {
    const payload = {
      targetUserId: '30731eed-1517-4e0c-9795-0d1ecf13a889',
    };

    const res = await request(app).post('/user/block').send(payload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return target user with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '30731eed-1517-4e0c-9795-0d1ecf13a889',
    };

    const res = await request(app)
      .post('/user/block')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        id: '30731eed-1517-4e0c-9795-0d1ecf13a889',
      }),
    );
  });

  it('should return status 204 if user is already blocked', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '30731eed-1517-4e0c-9795-0d1ecf13a889',
    };

    const res = await request(app)
      .post('/user/block')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(204);
  });

  it('should return status 400 if target user not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    };

    const res = await request(app)
      .post('/user/block')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found');
  });
});

describe('GET /user/following', () => {
  it('should return 401 when not logged in', async () => {
    const res = await request(app).get('/user/following');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return following list with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const res = await request(app)
      .get('/user/following')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('username');
    });
  });

  it('should return empty list with status 200 if not following any user', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user2@example.com',
      'Password-2',
    );

    const res = await request(app)
      .get('/user/following')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  });
});

describe('GET /user/blocking', () => {
  it('should return 401 when not logged in', async () => {
    const res = await request(app).get('/user/blocking');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return blocking list with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const res = await request(app)
      .get('/user/blocking')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('username');
    });
  });

  it('should return empty list with status 200 if not blocking any user', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user2@example.com',
      'Password-2',
    );

    const res = await request(app)
      .get('/user/blocking')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  });
});

describe('POST /user/unfollow', () => {
  it('should return 401 when not logged in', async () => {
    const payload = {
      targetUserId: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
    };

    const res = await request(app).post('/user/unfollow').send(payload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return target user with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
    };

    const res = await request(app)
      .post('/user/unfollow')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        target_user_id: '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea',
      }),
    );
  });

  it('should return status 400 if target user not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    };

    const res = await request(app)
      .post('/user/unfollow')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found');
  });

  it('should return status 400 if target user is not followed', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '4712ebce-15df-42a0-a1ad-3dc3cc162add',
    };

    const res = await request(app)
      .post('/user/unfollow')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User is not already followed');
  });
});

describe('POST /user/unblock', () => {
  it('should return 401 when not logged in', async () => {
    const payload = {
      targetUserId: '30731eed-1517-4e0c-9795-0d1ecf13a889',
    };

    const res = await request(app).post('/user/unblock').send(payload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('missing authentication token');
  });

  it('should return target user with status 200', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '30731eed-1517-4e0c-9795-0d1ecf13a889',
    };

    const res = await request(app)
      .post('/user/unblock')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toEqual(
      expect.objectContaining({
        target_user_id: '30731eed-1517-4e0c-9795-0d1ecf13a889',
      }),
    );
  });

  it('should return status 400 if target user not found', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    };

    const res = await request(app)
      .post('/user/unblock')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found');
  });

  it('should return status 400 if target user is not blocked', async () => {
    const { accessToken, refreshToken, userId } = await login(
      'user1@example.com',
      'Password-1',
    );

    const payload = {
      targetUserId: '4712ebce-15df-42a0-a1ad-3dc3cc162add',
    };

    const res = await request(app)
      .post('/user/unblock')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('RefreshToken', refreshToken);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User is not already blocked');
  });
});
