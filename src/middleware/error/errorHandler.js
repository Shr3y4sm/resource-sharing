const AppError = require('./AppError');

// Handle Multer file size error
const handleFileSizeError = () => {
    return new AppError('File too large. Maximum size is 10MB', 400);
};

// Handle database errors
const handleSequelizeError = (err) => {
    return new AppError('Database operation failed', 500);
};

// Handle file not found error
const handleFileNotFoundError = () => {
    return new AppError('File not found', 404);
};

// Development error response
const sendErrorDev = (err, req, res) => {
    return res.status(err.statusCode).render('error', {
        title: 'Error',
        msg: err.message,
        error: err
    });
};

// Production error response
const sendErrorProd = (err, req, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Error',
            msg: err.message,
            error: null
        });
    }
    
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    return res.status(500).render('error', {
        title: 'Error',
        msg: 'Something went wrong!',
        error: null
    });
};

// Main error handling middleware
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else {
        let error = { ...err };
        error.message = err.message;

        if (err.code === 'LIMIT_FILE_SIZE') error = handleFileSizeError();
        if (err.name === 'SequelizeError') error = handleSequelizeError(err);
        if (err.code === 'ENOENT') error = handleFileNotFoundError();

        sendErrorProd(error, req, res);
    }
};