(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/plugins/underwavy/config.js
/* harmony default export */ const config = ({
    name: 'underwavy',
    text: '波浪线',
    icon: 'underwavy',
    tooltip: '波浪线',
});

;// CONCATENATED MODULE: ./src/plugins/underwavy/button.js


function registerButton({ editor }) {
    function onSetup(api) {
        editor.formatter.register(config.name, {
            inline: 'span',
            styles: { textDecoration: 'underline 1px wavy' },
        });

        editor.formatter.formatChanged(config.name, function (state) {
            api.setActive(state);
        });
    }

    function onAction() {
        editor.execCommand('mceToggleFormat', false, config.name);
    }

    editor.ui.registry.addToggleButton(config.name, {
        text: config.text,
        icon: config.icon,
        tooltip: config.tooltip,
        onAction,
        onSetup,
    });

    editor.ui.registry.addToggleMenuItem(config.name, {
        text: config.text,
        icon: config.icon,
        onAction,
        onSetup,
    });
}

;// CONCATENATED MODULE: ./src/plugins/underwavy/index.js




tinymce.PluginManager.add(config.name, function (editor) {
    registerButton({ editor });

    return {
        getMetaData: () => ({
            name: config.name,
        }),
    };
});

/******/ 	return __webpack_exports__;
/******/ })()
;
});