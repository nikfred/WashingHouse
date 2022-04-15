module.exports = function (err, req, res) {
    return res.status(err.status || 500).json({message: err.message || "Непредвиденая ошибка"})
}