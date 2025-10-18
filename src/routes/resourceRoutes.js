const express = require('express');
const router = express.Router();
const ResourceController = require('../controllers/resourceController');
const upload = require('../middleware/upload');

// Home page
router.get('/', ResourceController.home);

// Upload routes
router.get('/upload', ResourceController.showUploadForm);
router.post('/upload', upload.single('file'), ResourceController.uploadResource);

// Sign in route
router.get('/sign-in', ResourceController.showSignIn);

// Resources routes
router.get('/resources', ResourceController.listResources);
router.get('/download/:filename', ResourceController.downloadResource);

// Uncomment to enable delete functionality
// router.delete('/delete/:id', ResourceController.deleteResource);

module.exports = router;