/**
 * testing route
 * @route GET /
 */
const home = (req, res) => res.success('fs-seed', 200);

/**
 * testing private route
 * @route GET /private
 */
const homePrivate = (req, res) => res.success('fs-seed private', 200);

// export module
export default {
  home,
  homePrivate
};