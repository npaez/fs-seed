/**
 * testing route
 * @route GET /
 */
export const home = (req, res) => res.success('fs-seed', 200);

/**
 * testing private route
 * @route GET /private
 */
export const homePrivate = (req, res) => res.success('fs-seed private', 200);