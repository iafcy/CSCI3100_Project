import request from 'supertest';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const TEST_UPLOAD_DIR = path.join(__dirname, 'test-uploads');
process.env.UPLOAD_DIR = TEST_UPLOAD_DIR;

import licenseRouter from '../../src/routes/licenseRouter';
import licenseService from '../../src/services/licenseService';

jest.mock('../../src/services/licenseService');
const mockedLicenseService = licenseService as jest.Mocked<
  typeof licenseService
>;

const app = express();
app.use(express.json());
app.use('/license', licenseRouter);

beforeEach(async () => {
  await fs.mkdir(TEST_UPLOAD_DIR, { recursive: true });
});

afterEach(async () => {
  try {
    const files = await fs.readdir(TEST_UPLOAD_DIR);
    const unlinkPromises = files.map((file) =>
      fs.unlink(path.join(TEST_UPLOAD_DIR, file)),
    );
    await Promise.all(unlinkPromises);
  } catch (err) {}
});

afterAll(async () => {
  await fs.rm(TEST_UPLOAD_DIR, { recursive: true, force: true });
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

  it('should return 500 if cannot read license key', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue(null);

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('dummy content'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error reading the license file');
  });

  it('should return 400 if license key does not exist', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue('DUMMY_LICENSE');
    mockedLicenseService.checkLicense.mockResolvedValue({
      exists: false,
      activated: false,
    });

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
    mockedLicenseService.readLicenseKey.mockResolvedValue('DUMMY_LICENSE');
    mockedLicenseService.checkLicense.mockResolvedValue({
      exists: true,
      activated: true,
    });

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('DUMMY_LICENSE'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('License key is already activated');
  });

  it('should return 200 if license key exists and not activated', async () => {
    mockedLicenseService.readLicenseKey.mockResolvedValue('DUMMY_LICENSE');
    mockedLicenseService.checkLicense.mockResolvedValue({
      exists: true,
      activated: false,
    });

    const res = await request(app)
      .post('/license/verify')
      .attach('file', Buffer.from('DUMMY_LICENSE'), {
        filename: 'license.txt',
        contentType: 'text/plain',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toMatchObject({ license_id: 'DUMMY_LICENSE' });
  });
});
