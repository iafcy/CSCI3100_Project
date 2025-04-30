import request from 'supertest';
import app from '../../src/app';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

beforeAll(() => {
  execSync('npx supabase db reset', { stdio: 'inherit' });
});

describe('POST /license/verify', () => {
  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app).post('/license/verify');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('License file is missing');
  });

  it('should return 400 if file is not a text file', async () => {
    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('dummy content'), {
        filename: 'image.png',
        contentType: 'image/png',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Please upload a txt file');
  });

  it('should return 400 if license key does not exist', async () => {
    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('DUMMY_LICENSE'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Not a valid license key');
  });

  it('should return 400 if license key already activated', async () => {
    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('11111111-1111-1111-1111-111111111111'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('License key is already activated');
  });

  it('should return 200 if license key exists and not activated', async () => {
    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('66666666-6666-6666-6666-666666666666'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({
      license_id: '66666666-6666-6666-6666-666666666666',
    });
  });
});
