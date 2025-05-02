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

import userRouter from '../../src/routes/userRouter';
import userService from '../../src/services/userService';

const mockUser = [
    { id: 1, name: 'mock1', username: 'user1' }
]

const targetUser = [
    { id: 2, name: 'target1', username: 'user2' },
    { id: 3, name: 'target2', username: 'user3' },
]

jest.mock('../services/userService');
const mockedUserService = userService as jest.Mocked<typeof userService>;

jest.mock('../middleware/auth', () => ({
    authRequired: (req: any, res: any, next: any) => {
      req.user = { id: 1 }; 
      next();
    },
    authOptional: (req: any, res: any, next: any) => {
    next();
    }
  }));
  
const app = express();
app.use(express.json());
app.use('/user', userRouter)

describe('POST /user/follow', () => {
    it('should follow user successfully', async () => {
        mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[0], error: null });
        mockedUserService.followUser.mockResolvedValue({ data: undefined, error: null });
  
        const res = await request(app).post('/user/follow').send({ targetUserId: targetUser[0].id });
  
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
        expect(res.body.error).toBeDefined;
      });
  
      it('should return 400 if user not found', async () => {
        mockedUserService.getUserNameById.mockResolvedValue({ data: null, error: null });
  
        const res = await request(app).post('/user/follow').send({ targetUserId: 999 });
  
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User not found');
      });
  
      it('should return 500 if follow service error', async () => {
        mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[0], error: null });
        mockedUserService.followUser.mockResolvedValue({ 
          data: undefined, 
          error: { message: '', code: '', details: '', name: '', hint: '' } 
        });
    
        const res = await request(app).post('/user/follow').send({ targetUserId: targetUser[0].id });
    
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Internal server error');
        expect(res.body.error).toBeDefined();
      });
    });
  
describe('POST /user/unfollow', () => {
  it('should unfollow user successfully', async () => {
    mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[1], error: null });
    mockedUserService.unfollowUser.mockResolvedValue({ data: {}, error: null });

    const res = await request(app).post('/user/unfollow').send({ targetUserId: targetUser[1].id });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.error).toBeDefined;
  });

  it('should return 400 if user not found', async () => {
    mockedUserService.getUserNameById.mockResolvedValue({ data: null, error: null });

    const res = await request(app).post('/user/unfollow').send({ targetUserId: 999 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User not found');
  });

  it('should return 500 if block service error', async () => {
    mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[0], error: null });
    mockedUserService.blockUser.mockResolvedValue({ 
      data: undefined, 
      error: { message: '', code: '', details: '', name: '', hint: '' } 
    });

    const res = await request(app).post('/user/block').send({ targetUserId: targetUser[0].id });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /user/block', () => {
    it('should block user successfully', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[0], error: null });
      mockedUserService.blockUser.mockResolvedValue({ data: undefined, error: null });
  
      const res = await request(app).post('/user/block').send({ targetUserId: targetUser[0].id });
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.error).toBeDefined;
    });
  
    it('should return 400 if user not found', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: null, error: null });
  
      const res = await request(app).post('/user/block').send({ targetUserId: 999 });
  
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User not found');
    });
  
    it('should return 500 if unblock service error', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[1], error: null });
      mockedUserService.unblockUser.mockResolvedValue({ 
        data: undefined, 
        error: { message: '', code: '', details: '', name: '', hint: '' } 
      });
  
      const res = await request(app).post('/user/unblock').send({ targetUserId: targetUser[1].id });
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
      expect(res.body.error).toBeDefined();
    });
  });
  
  describe('POST /user/unblock', () => {
    it('should unblock user successfully', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[1], error: null });
      mockedUserService.unblockUser.mockResolvedValue({ data: {}, error: null });
  
      const res = await request(app).post('/user/unblock').send({ targetUserId: targetUser[1].id });
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.error).toBeDefined;
    });
  
    it('should return 400 if user not found', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: null, error: null });
  
      const res = await request(app).post('/user/unblock').send({ targetUserId: 999 });
  
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: 'User not found' });
    });
  
    it('should return 500 if unblock service error', async () => {
      mockedUserService.getUserNameById.mockResolvedValue({ data: targetUser[1], error: null });
      mockedUserService.unblockUser.mockResolvedValue({ 
        data: undefined, 
        error: { message: '', code: '', details: '', name: '', hint: '' } 
      });
  
      const res = await request(app).post('/user/unblock').send({ targetUserId: targetUser[1].id });
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /user/following', () => {
    it('should get following list successfully', async () => {
      mockedUserService.getFollowingUser.mockResolvedValue({
        data: [targetUser[0], targetUser[1]],
        error: null
      });
  
      const res = await request(app).get('/user/following');
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.data).toEqual([targetUser[0], targetUser[1]]);
    });
  
    it('should return 500 if getFollowingUser service fails', async () => {
      mockedUserService.getFollowingUser.mockResolvedValue({ 
        data: undefined, 
        error: { message: '', code: '', details: '', name: '', hint: '' } 
      });
  
      const res = await request(app).get('/user/following');
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
      expect(res.body.error).toBeDefined();
    });
  });

  describe('GET /user/blocking', () => {
    it('should get blocking list successfully', async () => {
      mockedUserService.getBlockingUser.mockResolvedValue({
        data: [targetUser[0], targetUser[1]],
        error: null
      });
  
      const res = await request(app).get('/user/blocking');
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('success');
      expect(res.body.data).toEqual([targetUser[0], targetUser[1]]);
    });
  
    it('should return 500 if getBlockingUser service fails', async () => {
      mockedUserService.getBlockingUser.mockResolvedValue({ 
        data: undefined, 
        error: { message: '', code: '', details: '', name: '', hint: '' } 
      });
  
      const res = await request(app).get('/user/blocking');
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
      expect(res.body.error).toBeDefined();
    });
  });
