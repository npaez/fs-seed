/**
 * testing route
 * @route GET /
 */
exports.home = (req, res) => res.success('fs-seed', 200);

/**
 * testing private route
 * @route GET /private
 */
exports.homePrivate = (req, res) => res.success('fs-seed private', 200);