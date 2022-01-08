/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 762:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 646:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 270:
/***/ ((module) => {

module.exports = eval("require")("@linear/sdk");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const { LinearClient } = __nccwpck_require__(270)
const linear = new LinearClient({
    apiKey: "lin_api_2IczXFvoXNVm9LeXPNyo7DcQOtOaZ7eusoQuT2OO"
});
const core = __nccwpck_require__(762);
const github = __nccwpck_require__(646);

async function getMyIssues() {
    const issues = await linear.issues()
    console.log(issues.issueSearch("CHA-921"))
    console.log(process.env.LINEAR_API_KEY)
}

try {
    getMyIssues()
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;