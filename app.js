const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');
const resourceRoutes = require('./src/routes/resourceRoutes');
const errorHandler = require('./src/middleware/error/errorHandler');
const AppError = require('./src/middleware/error/AppError');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('uploads'));

// Routes
app.use('/', resourceRoutes);

// Handle 404 - Keep this after all valid routes
app.all('*', (req, res, next) => {
    next(new AppError(`Page not found (${req.originalUrl})`, 404));
});

// Global error handling middleware - Keep this last
app.use(errorHandler);

// Sync database
sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
