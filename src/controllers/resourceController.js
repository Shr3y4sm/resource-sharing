const Resource = require('../models/resource');
const path = require('path');
const fs = require('fs');
const AppError = require('../middleware/error/AppError');

class ResourceController {
    // Display homepage
    static async home(req, res, next) {
        try {
            res.render('index');
        } catch (error) {
            next(new AppError('Failed to load homepage', 500));
        }
    }

    // Show upload form
    static async showUploadForm(req, res, next) {
        try {
            res.render('upload');
        } catch (error) {
            next(new AppError('Failed to load upload form', 500));
        }
    }

    // Show sign-in page
    static async showSignIn(req, res, next) {
        try {
            res.render('sign-in');
        } catch (error) {
            next(new AppError('Failed to load sign-in page', 500));
        }
    }

    // Handle resource upload
    static async uploadResource(req, res, next) {
        try {
            if (!req.file) {
                return next(new AppError('Please upload a file', 400));
            }

            const { title, semester, branch, subject } = req.body;
            
            if (!title || !semester || !branch || !subject) {
                return next(new AppError('Please provide all required fields', 400));
            }

            const fileName = req.file.filename;

            await Resource.create({
                title,
                fileName,
                semester,
                branch,
                subject,
            });

            res.redirect('/');
        } catch (error) {
            next(new AppError('Failed to upload file', 500));
        }
    }

    // List all resources
    static async listResources(req, res, next) {
        try {
            const resources = await Resource.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.render('resources', { resources });
        } catch (error) {
            next(new AppError('Failed to fetch resources', 500));
        }
    }

    // Download resource
    static async downloadResource(req, res, next) {
        try {
            const filePath = path.join(__dirname, '../../uploads', req.params.filename);
            
            if (!fs.existsSync(filePath)) {
                return next(new AppError('File not found', 404));
            }

            res.download(filePath, (err) => {
                if (err) {
                    next(new AppError('Failed to download file', 500));
                }
            });
        } catch (error) {
            next(new AppError('Failed to process download', 500));
        }
    }

    // Delete resource (commented out in original code)
    static async deleteResource(req, res, next) {
        try {
            const resource = await Resource.findByPk(req.params.id);
            if (!resource) {
                return next(new AppError('Resource not found', 404));
            }

            const filePath = path.join(__dirname, '../../uploads', resource.fileName);

            // Delete file from filesystem
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        return next(new AppError('Failed to delete file', 500));
                    }
                });
            }

            // Delete resource from database
            await resource.destroy();

            res.json({ success: true });
        } catch (error) {
            next(new AppError('Failed to delete resource', 500));
        }
    }
}

module.exports = ResourceController;