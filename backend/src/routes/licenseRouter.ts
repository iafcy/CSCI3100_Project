import express from 'express';
import multer from 'multer';

import licenseController from '../controllers/licenseController';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.route('/verify')
  .post(upload.single('file'), licenseController.verifyLicense)

export default router;
