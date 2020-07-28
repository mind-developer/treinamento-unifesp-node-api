function handleError (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).json({
    success: false,
    error: err.message
  })
}

module.exports = handleError
