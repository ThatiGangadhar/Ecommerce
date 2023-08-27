

const errorHandler = (err, req, res, next) => {
    console.log('Error Handler', res.statusCode)
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500 ;

    switch (statusCode) {
        case 400:
            res.json({title: 'Validation Failed', message: err.message, stackTrace: err.stack })
            break;
        default:
            res.json({title: 'Internal Server Error', message: err.message, stackTrace: err.stack })
            break;
    }
}

module.exports = errorHandler