// Handle 404 errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// Handle internal errors
const internalError = (err, req, res, next) => {
  // If the error status hasn't been set yet, change it to 500
  // Otherwise use the non-200 status code that was provided
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)

  // Return JSON instead of an html page
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, internalError }
