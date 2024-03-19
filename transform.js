function process() {
  return {
    code: `module.exports = {};`,
  };
}
  
function getCacheKey() {
  return "transform";
}
  
export default {
  process,
  getCacheKey,
};
  