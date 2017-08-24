function buildPerPageParams(param) {
  return Math.min(50, parseInt(param, 10)) || 10
}

function buildPageParams(param) {
  return Math.max(0, parseInt(param, 10) - 1) || 0
}

module.exports = {
  buildPageParams: buildPageParams,
  buildPerPageParams: buildPerPageParams
}
