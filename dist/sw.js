var __wpo = {
  "assets": {
    "main": [
      "/app.js",
      "/",
      "/favicon.ico",
      "/vendor.js",
      "/../statics/background.jpg"
    ],
    "additional": [],
    "optional": []
  },
  "externals": [
    "/vendor.js",
    "/../statics/background.jpg"
  ],
  "hashesMap": {
    "b9f728055b56687f858cf7cbd3a127ea219dced1": "/app.js",
    "349662e1798e8868037518e70ce15646011d5012": "/favicon.ico",
    "d81ef5dab22795e3344cc1ab7bb7c0ff7d9876a7": "/"
  },
  "strategy": "changed",
  "responseStrategy": "network-first",
  "version": "9/23/2019, 7:22:20 PM",
  "name": "webpack-offline",
  "pluginVersion": "5.0.7",
  "relativePaths": false
};

/******/ (function(modules) { // webpackBootstrap
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f49d99bcaf3b3ce948aa";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "__offline_serviceworker";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22cacheMaps%22%3A%5B%5D%2C%22navigationPreload%22%3A%22true%22%7D!./node_modules/offline-plugin/tpls/empty-entry.js")(__webpack_require__.s = "./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22cacheMaps%22%3A%5B%5D%2C%22navigationPreload%22%3A%22true%22%7D!./node_modules/offline-plugin/tpls/empty-entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22cacheMaps%22%3A%5B%5D%2C%22navigationPreload%22%3A%22true%22%7D!./node_modules/offline-plugin/tpls/empty-entry.js":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22cacheMaps%22%3A%5B%5D%2C%22navigationPreload%22%3A%22true%22%7D!./node_modules/offline-plugin/tpls/empty-entry.js ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function () {\n  var waitUntil = ExtendableEvent.prototype.waitUntil;\n  var respondWith = FetchEvent.prototype.respondWith;\n  var promisesMap = new WeakMap();\n\n  ExtendableEvent.prototype.waitUntil = function (promise) {\n    var extendableEvent = this;\n    var promises = promisesMap.get(extendableEvent);\n\n    if (promises) {\n      promises.push(Promise.resolve(promise));\n      return;\n    }\n\n    promises = [Promise.resolve(promise)];\n    promisesMap.set(extendableEvent, promises);\n\n    // call original method\n    return waitUntil.call(extendableEvent, Promise.resolve().then(function processPromises() {\n      var len = promises.length;\n\n      // wait for all to settle\n      return Promise.all(promises.map(function (p) {\n        return p[\"catch\"](function () {});\n      })).then(function () {\n        // have new items been added? If so, wait again\n        if (promises.length != len) return processPromises();\n        // we're done!\n        promisesMap[\"delete\"](extendableEvent);\n        // reject if one of the promises rejected\n        return Promise.all(promises);\n      });\n    }));\n  };\n\n  FetchEvent.prototype.respondWith = function (promise) {\n    this.waitUntil(promise);\n    return respondWith.call(this, promise);\n  };\n})();;\n        'use strict';\n\nif (typeof DEBUG === 'undefined') {\n  var DEBUG = false;\n}\n\nfunction WebpackServiceWorker(params, helpers) {\n  var cacheMaps = helpers.cacheMaps;\n  // navigationPreload: true, { map: (URL) => URL, test: (URL) => boolean }\n  var navigationPreload = helpers.navigationPreload;\n\n  // (update)strategy: changed, all\n  var strategy = params.strategy;\n  // responseStrategy: cache-first, network-first\n  var responseStrategy = params.responseStrategy;\n\n  var assets = params.assets;\n\n  var hashesMap = params.hashesMap;\n  var externals = params.externals;\n\n  var prefetchRequest = params.prefetchRequest || {\n    credentials: 'same-origin',\n    mode: 'cors'\n  };\n\n  var CACHE_PREFIX = params.name;\n  var CACHE_TAG = params.version;\n  var CACHE_NAME = CACHE_PREFIX + ':' + CACHE_TAG;\n\n  var PRELOAD_CACHE_NAME = CACHE_PREFIX + '$preload';\n  var STORED_DATA_KEY = '__offline_webpack__data';\n\n  mapAssets();\n\n  var allAssets = [].concat(assets.main, assets.additional, assets.optional);\n\n  self.addEventListener('install', function (event) {\n    console.log('[SW]:', 'Install event');\n\n    var installing = undefined;\n\n    if (strategy === 'changed') {\n      installing = cacheChanged('main');\n    } else {\n      installing = cacheAssets('main');\n    }\n\n    event.waitUntil(installing);\n  });\n\n  self.addEventListener('activate', function (event) {\n    console.log('[SW]:', 'Activate event');\n\n    var activation = cacheAdditional();\n\n    // Delete all assets which name starts with CACHE_PREFIX and\n    // is not current cache (CACHE_NAME)\n    activation = activation.then(storeCacheData);\n    activation = activation.then(deleteObsolete);\n    activation = activation.then(function () {\n      if (self.clients && self.clients.claim) {\n        return self.clients.claim();\n      }\n    });\n\n    if (navigationPreload && self.registration.navigationPreload) {\n      activation = Promise.all([activation, self.registration.navigationPreload.enable()]);\n    }\n\n    event.waitUntil(activation);\n  });\n\n  function cacheAdditional() {\n    if (!assets.additional.length) {\n      return Promise.resolve();\n    }\n\n    if (DEBUG) {\n      console.log('[SW]:', 'Caching additional');\n    }\n\n    var operation = undefined;\n\n    if (strategy === 'changed') {\n      operation = cacheChanged('additional');\n    } else {\n      operation = cacheAssets('additional');\n    }\n\n    // Ignore fail of `additional` cache section\n    return operation['catch'](function (e) {\n      console.error('[SW]:', 'Cache section `additional` failed to load');\n    });\n  }\n\n  function cacheAssets(section) {\n    var batch = assets[section];\n\n    return caches.open(CACHE_NAME).then(function (cache) {\n      return addAllNormalized(cache, batch, {\n        bust: params.version,\n        request: prefetchRequest,\n        failAll: section === 'main'\n      });\n    }).then(function () {\n      logGroup('Cached assets: ' + section, batch);\n    })['catch'](function (e) {\n      console.error(e);\n      throw e;\n    });\n  }\n\n  function cacheChanged(section) {\n    return getLastCache().then(function (args) {\n      if (!args) {\n        return cacheAssets(section);\n      }\n\n      var lastCache = args[0];\n      var lastKeys = args[1];\n      var lastData = args[2];\n\n      var lastMap = lastData.hashmap;\n      var lastVersion = lastData.version;\n\n      if (!lastData.hashmap || lastVersion === params.version) {\n        return cacheAssets(section);\n      }\n\n      var lastHashedAssets = Object.keys(lastMap).map(function (hash) {\n        return lastMap[hash];\n      });\n\n      var lastUrls = lastKeys.map(function (req) {\n        var url = new URL(req.url);\n        url.search = '';\n        url.hash = '';\n\n        return url.toString();\n      });\n\n      var sectionAssets = assets[section];\n      var moved = [];\n      var changed = sectionAssets.filter(function (url) {\n        if (lastUrls.indexOf(url) === -1 || lastHashedAssets.indexOf(url) === -1) {\n          return true;\n        }\n\n        return false;\n      });\n\n      Object.keys(hashesMap).forEach(function (hash) {\n        var asset = hashesMap[hash];\n\n        // Return if not in sectionAssets or in changed or moved array\n        if (sectionAssets.indexOf(asset) === -1 || changed.indexOf(asset) !== -1 || moved.indexOf(asset) !== -1) return;\n\n        var lastAsset = lastMap[hash];\n\n        if (lastAsset && lastUrls.indexOf(lastAsset) !== -1) {\n          moved.push([lastAsset, asset]);\n        } else {\n          changed.push(asset);\n        }\n      });\n\n      logGroup('Changed assets: ' + section, changed);\n      logGroup('Moved assets: ' + section, moved);\n\n      var movedResponses = Promise.all(moved.map(function (pair) {\n        return lastCache.match(pair[0]).then(function (response) {\n          return [pair[1], response];\n        });\n      }));\n\n      return caches.open(CACHE_NAME).then(function (cache) {\n        var move = movedResponses.then(function (responses) {\n          return Promise.all(responses.map(function (pair) {\n            return cache.put(pair[0], pair[1]);\n          }));\n        });\n\n        return Promise.all([move, addAllNormalized(cache, changed, {\n          bust: params.version,\n          request: prefetchRequest,\n          failAll: section === 'main',\n          deleteFirst: section !== 'main'\n        })]);\n      });\n    });\n  }\n\n  function deleteObsolete() {\n    return caches.keys().then(function (keys) {\n      var all = keys.map(function (key) {\n        if (key.indexOf(CACHE_PREFIX) !== 0 || key.indexOf(CACHE_NAME) === 0) return;\n\n        console.log('[SW]:', 'Delete cache:', key);\n        return caches['delete'](key);\n      });\n\n      return Promise.all(all);\n    });\n  }\n\n  function getLastCache() {\n    return caches.keys().then(function (keys) {\n      var index = keys.length;\n      var key = undefined;\n\n      while (index--) {\n        key = keys[index];\n\n        if (key.indexOf(CACHE_PREFIX) === 0) {\n          break;\n        }\n      }\n\n      if (!key) return;\n\n      var cache = undefined;\n\n      return caches.open(key).then(function (_cache) {\n        cache = _cache;\n        return _cache.match(new URL(STORED_DATA_KEY, location).toString());\n      }).then(function (response) {\n        if (!response) return;\n\n        return Promise.all([cache, cache.keys(), response.json()]);\n      });\n    });\n  }\n\n  function storeCacheData() {\n    return caches.open(CACHE_NAME).then(function (cache) {\n      var data = new Response(JSON.stringify({\n        version: params.version,\n        hashmap: hashesMap\n      }));\n\n      return cache.put(new URL(STORED_DATA_KEY, location).toString(), data);\n    });\n  }\n\n  self.addEventListener('fetch', function (event) {\n    // Handle only GET requests\n    if (event.request.method !== 'GET') {\n      return;\n    }\n\n    // This prevents some weird issue with Chrome DevTools and 'only-if-cached'\n    // Fixes issue #385, also ref to:\n    // - https://github.com/paulirish/caltrainschedule.io/issues/49\n    // - https://bugs.chromium.org/p/chromium/issues/detail?id=823392\n    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {\n      return;\n    }\n\n    var url = new URL(event.request.url);\n    url.hash = '';\n\n    var urlString = url.toString();\n\n    // Not external, so search part of the URL should be stripped,\n    // if it's external URL, the search part should be kept\n    if (externals.indexOf(urlString) === -1) {\n      url.search = '';\n      urlString = url.toString();\n    }\n\n    var assetMatches = allAssets.indexOf(urlString) !== -1;\n    var cacheUrl = urlString;\n\n    if (!assetMatches) {\n      var cacheRewrite = matchCacheMap(event.request);\n\n      if (cacheRewrite) {\n        cacheUrl = cacheRewrite;\n        assetMatches = true;\n      }\n    }\n\n    if (!assetMatches) {\n      // Use request.mode === 'navigate' instead of isNavigateRequest\n      // because everything what supports navigationPreload supports\n      // 'navigate' request.mode\n      if (event.request.mode === 'navigate') {\n        // Requesting with fetchWithPreload().\n        // Preload is used only if navigationPreload is enabled and\n        // navigationPreload mapping is not used.\n        if (navigationPreload === true) {\n          event.respondWith(fetchWithPreload(event));\n          return;\n        }\n      }\n\n      // Something else, positive, but not `true`\n      if (navigationPreload) {\n        var preloadedResponse = retrivePreloadedResponse(event);\n\n        if (preloadedResponse) {\n          event.respondWith(preloadedResponse);\n          return;\n        }\n      }\n\n      // Logic exists here if no cache match\n      return;\n    }\n\n    // Cache handling/storing/fetching starts here\n    var resource = undefined;\n\n    if (responseStrategy === 'network-first') {\n      resource = networkFirstResponse(event, urlString, cacheUrl);\n    }\n    // 'cache-first' otherwise\n    // (responseStrategy has been validated before)\n    else {\n        resource = cacheFirstResponse(event, urlString, cacheUrl);\n      }\n\n    event.respondWith(resource);\n  });\n\n  self.addEventListener('message', function (e) {\n    var data = e.data;\n    if (!data) return;\n\n    switch (data.action) {\n      case 'skipWaiting':\n        {\n          if (self.skipWaiting) self.skipWaiting();\n        }break;\n    }\n  });\n\n  function cacheFirstResponse(event, urlString, cacheUrl) {\n    handleNavigationPreload(event);\n\n    return cachesMatch(cacheUrl, CACHE_NAME).then(function (response) {\n      if (response) {\n        if (DEBUG) {\n          console.log('[SW]:', 'URL [' + cacheUrl + '](' + urlString + ') from cache');\n        }\n\n        return response;\n      }\n\n      // Load and cache known assets\n      var fetching = fetch(event.request).then(function (response) {\n        if (!response.ok) {\n          if (DEBUG) {\n            console.log('[SW]:', 'URL [' + urlString + '] wrong response: [' + response.status + '] ' + response.type);\n          }\n\n          return response;\n        }\n\n        if (DEBUG) {\n          console.log('[SW]:', 'URL [' + urlString + '] from network');\n        }\n\n        if (cacheUrl === urlString) {\n          (function () {\n            var responseClone = response.clone();\n            var storing = caches.open(CACHE_NAME).then(function (cache) {\n              return cache.put(urlString, responseClone);\n            }).then(function () {\n              console.log('[SW]:', 'Cache asset: ' + urlString);\n            });\n\n            event.waitUntil(storing);\n          })();\n        }\n\n        return response;\n      });\n\n      return fetching;\n    });\n  }\n\n  function networkFirstResponse(event, urlString, cacheUrl) {\n    return fetchWithPreload(event).then(function (response) {\n      if (response.ok) {\n        if (DEBUG) {\n          console.log('[SW]:', 'URL [' + urlString + '] from network');\n        }\n\n        return response;\n      }\n\n      // Throw to reach the code in the catch below\n      throw response;\n    })\n    // This needs to be in a catch() and not just in the then() above\n    // cause if your network is down, the fetch() will throw\n    ['catch'](function (erroredResponse) {\n      if (DEBUG) {\n        console.log('[SW]:', 'URL [' + urlString + '] from cache if possible');\n      }\n\n      return cachesMatch(cacheUrl, CACHE_NAME).then(function (response) {\n        if (response) {\n          return response;\n        }\n\n        if (erroredResponse instanceof Response) {\n          return erroredResponse;\n        }\n\n        // Not a response at this point, some other error\n        throw erroredResponse;\n        // return Response.error();\n      });\n    });\n  }\n\n  function handleNavigationPreload(event) {\n    if (navigationPreload && typeof navigationPreload.map === 'function' &&\n    // Use request.mode === 'navigate' instead of isNavigateRequest\n    // because everything what supports navigationPreload supports\n    // 'navigate' request.mode\n    event.preloadResponse && event.request.mode === 'navigate') {\n      var mapped = navigationPreload.map(new URL(event.request.url), event.request);\n\n      if (mapped) {\n        storePreloadedResponse(mapped, event);\n      }\n    }\n  }\n\n  // Temporary in-memory store for faster access\n  var navigationPreloadStore = new Map();\n\n  function storePreloadedResponse(_url, event) {\n    var url = new URL(_url, location);\n    var preloadResponsePromise = event.preloadResponse;\n\n    navigationPreloadStore.set(preloadResponsePromise, {\n      url: url,\n      response: preloadResponsePromise\n    });\n\n    var isSamePreload = function isSamePreload() {\n      return navigationPreloadStore.has(preloadResponsePromise);\n    };\n\n    var storing = preloadResponsePromise.then(function (res) {\n      // Return if preload isn't enabled or hasn't happened\n      if (!res) return;\n\n      // If navigationPreloadStore already consumed\n      // or navigationPreloadStore already contains another preload,\n      // then do not store anything and return\n      if (!isSamePreload()) {\n        return;\n      }\n\n      var clone = res.clone();\n\n      // Storing the preload response for later consume (hasn't yet been consumed)\n      return caches.open(PRELOAD_CACHE_NAME).then(function (cache) {\n        if (!isSamePreload()) return;\n\n        return cache.put(url, clone).then(function () {\n          if (!isSamePreload()) {\n            return caches.open(PRELOAD_CACHE_NAME).then(function (cache) {\n              return cache['delete'](url);\n            });\n          }\n        });\n      });\n    });\n\n    event.waitUntil(storing);\n  }\n\n  function retriveInMemoryPreloadedResponse(url) {\n    if (!navigationPreloadStore) {\n      return;\n    }\n\n    var foundResponse = undefined;\n    var foundKey = undefined;\n\n    navigationPreloadStore.forEach(function (store, key) {\n      if (store.url.href === url.href) {\n        foundResponse = store.response;\n        foundKey = key;\n      }\n    });\n\n    if (foundResponse) {\n      navigationPreloadStore['delete'](foundKey);\n      return foundResponse;\n    }\n  }\n\n  function retrivePreloadedResponse(event) {\n    var url = new URL(event.request.url);\n\n    if (self.registration.navigationPreload && navigationPreload && navigationPreload.test && navigationPreload.test(url, event.request)) {} else {\n      return;\n    }\n\n    var fromMemory = retriveInMemoryPreloadedResponse(url);\n    var request = event.request;\n\n    if (fromMemory) {\n      event.waitUntil(caches.open(PRELOAD_CACHE_NAME).then(function (cache) {\n        return cache['delete'](request);\n      }));\n\n      return fromMemory;\n    }\n\n    return cachesMatch(request, PRELOAD_CACHE_NAME).then(function (response) {\n      if (response) {\n        event.waitUntil(caches.open(PRELOAD_CACHE_NAME).then(function (cache) {\n          return cache['delete'](request);\n        }));\n      }\n\n      return response || fetch(event.request);\n    });\n  }\n\n  function mapAssets() {\n    Object.keys(assets).forEach(function (key) {\n      assets[key] = assets[key].map(function (path) {\n        var url = new URL(path, location);\n\n        url.hash = '';\n\n        if (externals.indexOf(path) === -1) {\n          url.search = '';\n        }\n\n        return url.toString();\n      });\n    });\n\n    hashesMap = Object.keys(hashesMap).reduce(function (result, hash) {\n      var url = new URL(hashesMap[hash], location);\n      url.search = '';\n      url.hash = '';\n\n      result[hash] = url.toString();\n      return result;\n    }, {});\n\n    externals = externals.map(function (path) {\n      var url = new URL(path, location);\n      url.hash = '';\n\n      return url.toString();\n    });\n  }\n\n  function addAllNormalized(cache, requests, options) {\n    requests = requests.slice();\n\n    var bustValue = options.bust;\n    var failAll = options.failAll !== false;\n    var deleteFirst = options.deleteFirst === true;\n    var requestInit = options.request || {\n      credentials: 'omit',\n      mode: 'cors'\n    };\n\n    var deleting = Promise.resolve();\n\n    if (deleteFirst) {\n      deleting = Promise.all(requests.map(function (request) {\n        return cache['delete'](request)['catch'](function () {});\n      }));\n    }\n\n    return Promise.all(requests.map(function (request) {\n      if (bustValue) {\n        request = applyCacheBust(request, bustValue);\n      }\n\n      return fetch(request, requestInit).then(fixRedirectedResponse).then(function (response) {\n        if (!response.ok) {\n          return { error: true };\n        }\n\n        return { response: response };\n      }, function () {\n        return { error: true };\n      });\n    })).then(function (responses) {\n      if (failAll && responses.some(function (data) {\n        return data.error;\n      })) {\n        return Promise.reject(new Error('Wrong response status'));\n      }\n\n      if (!failAll) {\n        responses = responses.filter(function (data, i) {\n          if (!data.error) {\n            return true;\n          }\n\n          requests.splice(i, 1);\n          return false;\n        });\n      }\n\n      return deleting.then(function () {\n        var addAll = responses.map(function (_ref, i) {\n          var response = _ref.response;\n\n          return cache.put(requests[i], response);\n        });\n\n        return Promise.all(addAll);\n      });\n    });\n  }\n\n  function matchCacheMap(request) {\n    var urlString = request.url;\n    var url = new URL(urlString);\n\n    var requestType = undefined;\n\n    if (isNavigateRequest(request)) {\n      requestType = 'navigate';\n    } else if (url.origin === location.origin) {\n      requestType = 'same-origin';\n    } else {\n      requestType = 'cross-origin';\n    }\n\n    for (var i = 0; i < cacheMaps.length; i++) {\n      var map = cacheMaps[i];\n\n      if (!map) continue;\n      if (map.requestTypes && map.requestTypes.indexOf(requestType) === -1) {\n        continue;\n      }\n\n      var newString = undefined;\n\n      if (typeof map.match === 'function') {\n        newString = map.match(url, request);\n      } else {\n        newString = urlString.replace(map.match, map.to);\n      }\n\n      if (newString && newString !== urlString) {\n        return newString;\n      }\n    }\n  }\n\n  function fetchWithPreload(event) {\n    if (!event.preloadResponse || navigationPreload !== true) {\n      return fetch(event.request);\n    }\n\n    return event.preloadResponse.then(function (response) {\n      return response || fetch(event.request);\n    });\n  }\n}\n\nfunction cachesMatch(request, cacheName) {\n  return caches.match(request, {\n    cacheName: cacheName\n  }).then(function (response) {\n    if (isNotRedirectedResponse(response)) {\n      return response;\n    }\n\n    // Fix already cached redirected responses\n    return fixRedirectedResponse(response).then(function (fixedResponse) {\n      return caches.open(cacheName).then(function (cache) {\n        return cache.put(request, fixedResponse);\n      }).then(function () {\n        return fixedResponse;\n      });\n    });\n  })\n  // Return void if error happened (cache not found)\n  ['catch'](function () {});\n}\n\nfunction applyCacheBust(asset, key) {\n  var hasQuery = asset.indexOf('?') !== -1;\n  return asset + (hasQuery ? '&' : '?') + '__uncache=' + encodeURIComponent(key);\n}\n\nfunction isNavigateRequest(request) {\n  return request.mode === 'navigate' || request.headers.get('Upgrade-Insecure-Requests') || (request.headers.get('Accept') || '').indexOf('text/html') !== -1;\n}\n\nfunction isNotRedirectedResponse(response) {\n  return !response || !response.redirected || !response.ok || response.type === 'opaqueredirect';\n}\n\n// Based on https://github.com/GoogleChrome/sw-precache/pull/241/files#diff-3ee9060dc7a312c6a822cac63a8c630bR85\nfunction fixRedirectedResponse(response) {\n  if (isNotRedirectedResponse(response)) {\n    return Promise.resolve(response);\n  }\n\n  var body = 'body' in response ? Promise.resolve(response.body) : response.blob();\n\n  return body.then(function (data) {\n    return new Response(data, {\n      headers: response.headers,\n      status: response.status\n    });\n  });\n}\n\nfunction copyObject(original) {\n  return Object.keys(original).reduce(function (result, key) {\n    result[key] = original[key];\n    return result;\n  }, {});\n}\n\nfunction logGroup(title, assets) {\n  console.groupCollapsed('[SW]:', title);\n\n  assets.forEach(function (asset) {\n    console.log('Asset:', asset);\n  });\n\n  console.groupEnd();\n}\n        WebpackServiceWorker(__wpo, {\nloaders: {},\ncacheMaps: [],\nnavigationPreload: true,\n});\n        module.exports = __webpack_require__(/*! ./empty-entry.js */ \"./node_modules/offline-plugin/tpls/empty-entry.js\")\n      \n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2ZmbGluZS1wbHVnaW4vdHBscy9lbXB0eS1lbnRyeS5qcz8wY2Q4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDRJQUE0STtBQUM1STtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLElBQUk7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLCtEQUErRDtBQUMvRCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQSxnQkFBZ0I7QUFDaEIsT0FBTztBQUNQLGdCQUFnQjtBQUNoQixPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsSUFBSTtBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxDQUFDO0FBQ0QseUJBQXlCLG1CQUFPLENBQUMsMkVBQWtCIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL29mZmxpbmUtcGx1Z2luL2xpYi9taXNjL3N3LWxvYWRlci5qcz9qc29uPSU3QiUyMmRhdGFfdmFyX25hbWUlMjIlM0ElMjJfX3dwbyUyMiUyQyUyMmNhY2hlTWFwcyUyMiUzQSU1QiU1RCUyQyUyMm5hdmlnYXRpb25QcmVsb2FkJTIyJTNBJTIydHJ1ZSUyMiU3RCEuL25vZGVfbW9kdWxlcy9vZmZsaW5lLXBsdWdpbi90cGxzL2VtcHR5LWVudHJ5LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciB3YWl0VW50aWwgPSBFeHRlbmRhYmxlRXZlbnQucHJvdG90eXBlLndhaXRVbnRpbDtcbiAgdmFyIHJlc3BvbmRXaXRoID0gRmV0Y2hFdmVudC5wcm90b3R5cGUucmVzcG9uZFdpdGg7XG4gIHZhciBwcm9taXNlc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgRXh0ZW5kYWJsZUV2ZW50LnByb3RvdHlwZS53YWl0VW50aWwgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgIHZhciBleHRlbmRhYmxlRXZlbnQgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlcyA9IHByb21pc2VzTWFwLmdldChleHRlbmRhYmxlRXZlbnQpO1xuXG4gICAgaWYgKHByb21pc2VzKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKFByb21pc2UucmVzb2x2ZShwcm9taXNlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvbWlzZXMgPSBbUHJvbWlzZS5yZXNvbHZlKHByb21pc2UpXTtcbiAgICBwcm9taXNlc01hcC5zZXQoZXh0ZW5kYWJsZUV2ZW50LCBwcm9taXNlcyk7XG5cbiAgICAvLyBjYWxsIG9yaWdpbmFsIG1ldGhvZFxuICAgIHJldHVybiB3YWl0VW50aWwuY2FsbChleHRlbmRhYmxlRXZlbnQsIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gcHJvY2Vzc1Byb21pc2VzKCkge1xuICAgICAgdmFyIGxlbiA9IHByb21pc2VzLmxlbmd0aDtcblxuICAgICAgLy8gd2FpdCBmb3IgYWxsIHRvIHNldHRsZVxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gcFtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHt9KTtcbiAgICAgIH0pKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaGF2ZSBuZXcgaXRlbXMgYmVlbiBhZGRlZD8gSWYgc28sIHdhaXQgYWdhaW5cbiAgICAgICAgaWYgKHByb21pc2VzLmxlbmd0aCAhPSBsZW4pIHJldHVybiBwcm9jZXNzUHJvbWlzZXMoKTtcbiAgICAgICAgLy8gd2UncmUgZG9uZSFcbiAgICAgICAgcHJvbWlzZXNNYXBbXCJkZWxldGVcIl0oZXh0ZW5kYWJsZUV2ZW50KTtcbiAgICAgICAgLy8gcmVqZWN0IGlmIG9uZSBvZiB0aGUgcHJvbWlzZXMgcmVqZWN0ZWRcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfTtcblxuICBGZXRjaEV2ZW50LnByb3RvdHlwZS5yZXNwb25kV2l0aCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgdGhpcy53YWl0VW50aWwocHJvbWlzZSk7XG4gICAgcmV0dXJuIHJlc3BvbmRXaXRoLmNhbGwodGhpcywgcHJvbWlzZSk7XG4gIH07XG59KSgpOztcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuXG5pZiAodHlwZW9mIERFQlVHID09PSAndW5kZWZpbmVkJykge1xuICB2YXIgREVCVUcgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gV2VicGFja1NlcnZpY2VXb3JrZXIocGFyYW1zLCBoZWxwZXJzKSB7XG4gIHZhciBjYWNoZU1hcHMgPSBoZWxwZXJzLmNhY2hlTWFwcztcbiAgLy8gbmF2aWdhdGlvblByZWxvYWQ6IHRydWUsIHsgbWFwOiAoVVJMKSA9PiBVUkwsIHRlc3Q6IChVUkwpID0+IGJvb2xlYW4gfVxuICB2YXIgbmF2aWdhdGlvblByZWxvYWQgPSBoZWxwZXJzLm5hdmlnYXRpb25QcmVsb2FkO1xuXG4gIC8vICh1cGRhdGUpc3RyYXRlZ3k6IGNoYW5nZWQsIGFsbFxuICB2YXIgc3RyYXRlZ3kgPSBwYXJhbXMuc3RyYXRlZ3k7XG4gIC8vIHJlc3BvbnNlU3RyYXRlZ3k6IGNhY2hlLWZpcnN0LCBuZXR3b3JrLWZpcnN0XG4gIHZhciByZXNwb25zZVN0cmF0ZWd5ID0gcGFyYW1zLnJlc3BvbnNlU3RyYXRlZ3k7XG5cbiAgdmFyIGFzc2V0cyA9IHBhcmFtcy5hc3NldHM7XG5cbiAgdmFyIGhhc2hlc01hcCA9IHBhcmFtcy5oYXNoZXNNYXA7XG4gIHZhciBleHRlcm5hbHMgPSBwYXJhbXMuZXh0ZXJuYWxzO1xuXG4gIHZhciBwcmVmZXRjaFJlcXVlc3QgPSBwYXJhbXMucHJlZmV0Y2hSZXF1ZXN0IHx8IHtcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICBtb2RlOiAnY29ycydcbiAgfTtcblxuICB2YXIgQ0FDSEVfUFJFRklYID0gcGFyYW1zLm5hbWU7XG4gIHZhciBDQUNIRV9UQUcgPSBwYXJhbXMudmVyc2lvbjtcbiAgdmFyIENBQ0hFX05BTUUgPSBDQUNIRV9QUkVGSVggKyAnOicgKyBDQUNIRV9UQUc7XG5cbiAgdmFyIFBSRUxPQURfQ0FDSEVfTkFNRSA9IENBQ0hFX1BSRUZJWCArICckcHJlbG9hZCc7XG4gIHZhciBTVE9SRURfREFUQV9LRVkgPSAnX19vZmZsaW5lX3dlYnBhY2tfX2RhdGEnO1xuXG4gIG1hcEFzc2V0cygpO1xuXG4gIHZhciBhbGxBc3NldHMgPSBbXS5jb25jYXQoYXNzZXRzLm1haW4sIGFzc2V0cy5hZGRpdGlvbmFsLCBhc3NldHMub3B0aW9uYWwpO1xuXG4gIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdbU1ddOicsICdJbnN0YWxsIGV2ZW50Jyk7XG5cbiAgICB2YXIgaW5zdGFsbGluZyA9IHVuZGVmaW5lZDtcblxuICAgIGlmIChzdHJhdGVneSA9PT0gJ2NoYW5nZWQnKSB7XG4gICAgICBpbnN0YWxsaW5nID0gY2FjaGVDaGFuZ2VkKCdtYWluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbGxpbmcgPSBjYWNoZUFzc2V0cygnbWFpbicpO1xuICAgIH1cblxuICAgIGV2ZW50LndhaXRVbnRpbChpbnN0YWxsaW5nKTtcbiAgfSk7XG5cbiAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdbU1ddOicsICdBY3RpdmF0ZSBldmVudCcpO1xuXG4gICAgdmFyIGFjdGl2YXRpb24gPSBjYWNoZUFkZGl0aW9uYWwoKTtcblxuICAgIC8vIERlbGV0ZSBhbGwgYXNzZXRzIHdoaWNoIG5hbWUgc3RhcnRzIHdpdGggQ0FDSEVfUFJFRklYIGFuZFxuICAgIC8vIGlzIG5vdCBjdXJyZW50IGNhY2hlIChDQUNIRV9OQU1FKVxuICAgIGFjdGl2YXRpb24gPSBhY3RpdmF0aW9uLnRoZW4oc3RvcmVDYWNoZURhdGEpO1xuICAgIGFjdGl2YXRpb24gPSBhY3RpdmF0aW9uLnRoZW4oZGVsZXRlT2Jzb2xldGUpO1xuICAgIGFjdGl2YXRpb24gPSBhY3RpdmF0aW9uLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuY2xpZW50cyAmJiBzZWxmLmNsaWVudHMuY2xhaW0pIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuY2xpZW50cy5jbGFpbSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5hdmlnYXRpb25QcmVsb2FkICYmIHNlbGYucmVnaXN0cmF0aW9uLm5hdmlnYXRpb25QcmVsb2FkKSB7XG4gICAgICBhY3RpdmF0aW9uID0gUHJvbWlzZS5hbGwoW2FjdGl2YXRpb24sIHNlbGYucmVnaXN0cmF0aW9uLm5hdmlnYXRpb25QcmVsb2FkLmVuYWJsZSgpXSk7XG4gICAgfVxuXG4gICAgZXZlbnQud2FpdFVudGlsKGFjdGl2YXRpb24pO1xuICB9KTtcblxuICBmdW5jdGlvbiBjYWNoZUFkZGl0aW9uYWwoKSB7XG4gICAgaWYgKCFhc3NldHMuYWRkaXRpb25hbC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdbU1ddOicsICdDYWNoaW5nIGFkZGl0aW9uYWwnKTtcbiAgICB9XG5cbiAgICB2YXIgb3BlcmF0aW9uID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHN0cmF0ZWd5ID09PSAnY2hhbmdlZCcpIHtcbiAgICAgIG9wZXJhdGlvbiA9IGNhY2hlQ2hhbmdlZCgnYWRkaXRpb25hbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVyYXRpb24gPSBjYWNoZUFzc2V0cygnYWRkaXRpb25hbCcpO1xuICAgIH1cblxuICAgIC8vIElnbm9yZSBmYWlsIG9mIGBhZGRpdGlvbmFsYCBjYWNoZSBzZWN0aW9uXG4gICAgcmV0dXJuIG9wZXJhdGlvblsnY2F0Y2gnXShmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignW1NXXTonLCAnQ2FjaGUgc2VjdGlvbiBgYWRkaXRpb25hbGAgZmFpbGVkIHRvIGxvYWQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhY2hlQXNzZXRzKHNlY3Rpb24pIHtcbiAgICB2YXIgYmF0Y2ggPSBhc3NldHNbc2VjdGlvbl07XG5cbiAgICByZXR1cm4gY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgIHJldHVybiBhZGRBbGxOb3JtYWxpemVkKGNhY2hlLCBiYXRjaCwge1xuICAgICAgICBidXN0OiBwYXJhbXMudmVyc2lvbixcbiAgICAgICAgcmVxdWVzdDogcHJlZmV0Y2hSZXF1ZXN0LFxuICAgICAgICBmYWlsQWxsOiBzZWN0aW9uID09PSAnbWFpbidcbiAgICAgIH0pO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgbG9nR3JvdXAoJ0NhY2hlZCBhc3NldHM6ICcgKyBzZWN0aW9uLCBiYXRjaCk7XG4gICAgfSlbJ2NhdGNoJ10oZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB0aHJvdyBlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FjaGVDaGFuZ2VkKHNlY3Rpb24pIHtcbiAgICByZXR1cm4gZ2V0TGFzdENhY2hlKCkudGhlbihmdW5jdGlvbiAoYXJncykge1xuICAgICAgaWYgKCFhcmdzKSB7XG4gICAgICAgIHJldHVybiBjYWNoZUFzc2V0cyhzZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxhc3RDYWNoZSA9IGFyZ3NbMF07XG4gICAgICB2YXIgbGFzdEtleXMgPSBhcmdzWzFdO1xuICAgICAgdmFyIGxhc3REYXRhID0gYXJnc1syXTtcblxuICAgICAgdmFyIGxhc3RNYXAgPSBsYXN0RGF0YS5oYXNobWFwO1xuICAgICAgdmFyIGxhc3RWZXJzaW9uID0gbGFzdERhdGEudmVyc2lvbjtcblxuICAgICAgaWYgKCFsYXN0RGF0YS5oYXNobWFwIHx8IGxhc3RWZXJzaW9uID09PSBwYXJhbXMudmVyc2lvbikge1xuICAgICAgICByZXR1cm4gY2FjaGVBc3NldHMoc2VjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHZhciBsYXN0SGFzaGVkQXNzZXRzID0gT2JqZWN0LmtleXMobGFzdE1hcCkubWFwKGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIHJldHVybiBsYXN0TWFwW2hhc2hdO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBsYXN0VXJscyA9IGxhc3RLZXlzLm1hcChmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgIHZhciB1cmwgPSBuZXcgVVJMKHJlcS51cmwpO1xuICAgICAgICB1cmwuc2VhcmNoID0gJyc7XG4gICAgICAgIHVybC5oYXNoID0gJyc7XG5cbiAgICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBzZWN0aW9uQXNzZXRzID0gYXNzZXRzW3NlY3Rpb25dO1xuICAgICAgdmFyIG1vdmVkID0gW107XG4gICAgICB2YXIgY2hhbmdlZCA9IHNlY3Rpb25Bc3NldHMuZmlsdGVyKGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgaWYgKGxhc3RVcmxzLmluZGV4T2YodXJsKSA9PT0gLTEgfHwgbGFzdEhhc2hlZEFzc2V0cy5pbmRleE9mKHVybCkgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgT2JqZWN0LmtleXMoaGFzaGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIHZhciBhc3NldCA9IGhhc2hlc01hcFtoYXNoXTtcblxuICAgICAgICAvLyBSZXR1cm4gaWYgbm90IGluIHNlY3Rpb25Bc3NldHMgb3IgaW4gY2hhbmdlZCBvciBtb3ZlZCBhcnJheVxuICAgICAgICBpZiAoc2VjdGlvbkFzc2V0cy5pbmRleE9mKGFzc2V0KSA9PT0gLTEgfHwgY2hhbmdlZC5pbmRleE9mKGFzc2V0KSAhPT0gLTEgfHwgbW92ZWQuaW5kZXhPZihhc3NldCkgIT09IC0xKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGxhc3RBc3NldCA9IGxhc3RNYXBbaGFzaF07XG5cbiAgICAgICAgaWYgKGxhc3RBc3NldCAmJiBsYXN0VXJscy5pbmRleE9mKGxhc3RBc3NldCkgIT09IC0xKSB7XG4gICAgICAgICAgbW92ZWQucHVzaChbbGFzdEFzc2V0LCBhc3NldF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoYW5nZWQucHVzaChhc3NldCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsb2dHcm91cCgnQ2hhbmdlZCBhc3NldHM6ICcgKyBzZWN0aW9uLCBjaGFuZ2VkKTtcbiAgICAgIGxvZ0dyb3VwKCdNb3ZlZCBhc3NldHM6ICcgKyBzZWN0aW9uLCBtb3ZlZCk7XG5cbiAgICAgIHZhciBtb3ZlZFJlc3BvbnNlcyA9IFByb21pc2UuYWxsKG1vdmVkLm1hcChmdW5jdGlvbiAocGFpcikge1xuICAgICAgICByZXR1cm4gbGFzdENhY2hlLm1hdGNoKHBhaXJbMF0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIFtwYWlyWzFdLCByZXNwb25zZV07XG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4gY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgICAgdmFyIG1vdmUgPSBtb3ZlZFJlc3BvbnNlcy50aGVuKGZ1bmN0aW9uIChyZXNwb25zZXMpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocmVzcG9uc2VzLm1hcChmdW5jdGlvbiAocGFpcikge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnB1dChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbW92ZSwgYWRkQWxsTm9ybWFsaXplZChjYWNoZSwgY2hhbmdlZCwge1xuICAgICAgICAgIGJ1c3Q6IHBhcmFtcy52ZXJzaW9uLFxuICAgICAgICAgIHJlcXVlc3Q6IHByZWZldGNoUmVxdWVzdCxcbiAgICAgICAgICBmYWlsQWxsOiBzZWN0aW9uID09PSAnbWFpbicsXG4gICAgICAgICAgZGVsZXRlRmlyc3Q6IHNlY3Rpb24gIT09ICdtYWluJ1xuICAgICAgICB9KV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVPYnNvbGV0ZSgpIHtcbiAgICByZXR1cm4gY2FjaGVzLmtleXMoKS50aGVuKGZ1bmN0aW9uIChrZXlzKSB7XG4gICAgICB2YXIgYWxsID0ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5LmluZGV4T2YoQ0FDSEVfUFJFRklYKSAhPT0gMCB8fCBrZXkuaW5kZXhPZihDQUNIRV9OQU1FKSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdbU1ddOicsICdEZWxldGUgY2FjaGU6Jywga2V5KTtcbiAgICAgICAgcmV0dXJuIGNhY2hlc1snZGVsZXRlJ10oa2V5KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYWxsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExhc3RDYWNoZSgpIHtcbiAgICByZXR1cm4gY2FjaGVzLmtleXMoKS50aGVuKGZ1bmN0aW9uIChrZXlzKSB7XG4gICAgICB2YXIgaW5kZXggPSBrZXlzLmxlbmd0aDtcbiAgICAgIHZhciBrZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICAgIGtleSA9IGtleXNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChrZXkuaW5kZXhPZihDQUNIRV9QUkVGSVgpID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFrZXkpIHJldHVybjtcblxuICAgICAgdmFyIGNhY2hlID0gdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gY2FjaGVzLm9wZW4oa2V5KS50aGVuKGZ1bmN0aW9uIChfY2FjaGUpIHtcbiAgICAgICAgY2FjaGUgPSBfY2FjaGU7XG4gICAgICAgIHJldHVybiBfY2FjaGUubWF0Y2gobmV3IFVSTChTVE9SRURfREFUQV9LRVksIGxvY2F0aW9uKS50b1N0cmluZygpKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHJldHVybjtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2NhY2hlLCBjYWNoZS5rZXlzKCksIHJlc3BvbnNlLmpzb24oKV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9yZUNhY2hlRGF0YSgpIHtcbiAgICByZXR1cm4gY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgIHZhciBkYXRhID0gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdmVyc2lvbjogcGFyYW1zLnZlcnNpb24sXG4gICAgICAgIGhhc2htYXA6IGhhc2hlc01hcFxuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4gY2FjaGUucHV0KG5ldyBVUkwoU1RPUkVEX0RBVEFfS0VZLCBsb2NhdGlvbikudG9TdHJpbmcoKSwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gSGFuZGxlIG9ubHkgR0VUIHJlcXVlc3RzXG4gICAgaWYgKGV2ZW50LnJlcXVlc3QubWV0aG9kICE9PSAnR0VUJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoaXMgcHJldmVudHMgc29tZSB3ZWlyZCBpc3N1ZSB3aXRoIENocm9tZSBEZXZUb29scyBhbmQgJ29ubHktaWYtY2FjaGVkJ1xuICAgIC8vIEZpeGVzIGlzc3VlICMzODUsIGFsc28gcmVmIHRvOlxuICAgIC8vIC0gaHR0cHM6Ly9naXRodWIuY29tL3BhdWxpcmlzaC9jYWx0cmFpbnNjaGVkdWxlLmlvL2lzc3Vlcy80OVxuICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODIzMzkyXG4gICAgaWYgKGV2ZW50LnJlcXVlc3QuY2FjaGUgPT09ICdvbmx5LWlmLWNhY2hlZCcgJiYgZXZlbnQucmVxdWVzdC5tb2RlICE9PSAnc2FtZS1vcmlnaW4nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuICAgIHVybC5oYXNoID0gJyc7XG5cbiAgICB2YXIgdXJsU3RyaW5nID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgICAvLyBOb3QgZXh0ZXJuYWwsIHNvIHNlYXJjaCBwYXJ0IG9mIHRoZSBVUkwgc2hvdWxkIGJlIHN0cmlwcGVkLFxuICAgIC8vIGlmIGl0J3MgZXh0ZXJuYWwgVVJMLCB0aGUgc2VhcmNoIHBhcnQgc2hvdWxkIGJlIGtlcHRcbiAgICBpZiAoZXh0ZXJuYWxzLmluZGV4T2YodXJsU3RyaW5nKSA9PT0gLTEpIHtcbiAgICAgIHVybC5zZWFyY2ggPSAnJztcbiAgICAgIHVybFN0cmluZyA9IHVybC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHZhciBhc3NldE1hdGNoZXMgPSBhbGxBc3NldHMuaW5kZXhPZih1cmxTdHJpbmcpICE9PSAtMTtcbiAgICB2YXIgY2FjaGVVcmwgPSB1cmxTdHJpbmc7XG5cbiAgICBpZiAoIWFzc2V0TWF0Y2hlcykge1xuICAgICAgdmFyIGNhY2hlUmV3cml0ZSA9IG1hdGNoQ2FjaGVNYXAoZXZlbnQucmVxdWVzdCk7XG5cbiAgICAgIGlmIChjYWNoZVJld3JpdGUpIHtcbiAgICAgICAgY2FjaGVVcmwgPSBjYWNoZVJld3JpdGU7XG4gICAgICAgIGFzc2V0TWF0Y2hlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFhc3NldE1hdGNoZXMpIHtcbiAgICAgIC8vIFVzZSByZXF1ZXN0Lm1vZGUgPT09ICduYXZpZ2F0ZScgaW5zdGVhZCBvZiBpc05hdmlnYXRlUmVxdWVzdFxuICAgICAgLy8gYmVjYXVzZSBldmVyeXRoaW5nIHdoYXQgc3VwcG9ydHMgbmF2aWdhdGlvblByZWxvYWQgc3VwcG9ydHNcbiAgICAgIC8vICduYXZpZ2F0ZScgcmVxdWVzdC5tb2RlXG4gICAgICBpZiAoZXZlbnQucmVxdWVzdC5tb2RlID09PSAnbmF2aWdhdGUnKSB7XG4gICAgICAgIC8vIFJlcXVlc3Rpbmcgd2l0aCBmZXRjaFdpdGhQcmVsb2FkKCkuXG4gICAgICAgIC8vIFByZWxvYWQgaXMgdXNlZCBvbmx5IGlmIG5hdmlnYXRpb25QcmVsb2FkIGlzIGVuYWJsZWQgYW5kXG4gICAgICAgIC8vIG5hdmlnYXRpb25QcmVsb2FkIG1hcHBpbmcgaXMgbm90IHVzZWQuXG4gICAgICAgIGlmIChuYXZpZ2F0aW9uUHJlbG9hZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGV2ZW50LnJlc3BvbmRXaXRoKGZldGNoV2l0aFByZWxvYWQoZXZlbnQpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU29tZXRoaW5nIGVsc2UsIHBvc2l0aXZlLCBidXQgbm90IGB0cnVlYFxuICAgICAgaWYgKG5hdmlnYXRpb25QcmVsb2FkKSB7XG4gICAgICAgIHZhciBwcmVsb2FkZWRSZXNwb25zZSA9IHJldHJpdmVQcmVsb2FkZWRSZXNwb25zZShldmVudCk7XG5cbiAgICAgICAgaWYgKHByZWxvYWRlZFJlc3BvbnNlKSB7XG4gICAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgocHJlbG9hZGVkUmVzcG9uc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBMb2dpYyBleGlzdHMgaGVyZSBpZiBubyBjYWNoZSBtYXRjaFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENhY2hlIGhhbmRsaW5nL3N0b3JpbmcvZmV0Y2hpbmcgc3RhcnRzIGhlcmVcbiAgICB2YXIgcmVzb3VyY2UgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAocmVzcG9uc2VTdHJhdGVneSA9PT0gJ25ldHdvcmstZmlyc3QnKSB7XG4gICAgICByZXNvdXJjZSA9IG5ldHdvcmtGaXJzdFJlc3BvbnNlKGV2ZW50LCB1cmxTdHJpbmcsIGNhY2hlVXJsKTtcbiAgICB9XG4gICAgLy8gJ2NhY2hlLWZpcnN0JyBvdGhlcndpc2VcbiAgICAvLyAocmVzcG9uc2VTdHJhdGVneSBoYXMgYmVlbiB2YWxpZGF0ZWQgYmVmb3JlKVxuICAgIGVsc2Uge1xuICAgICAgICByZXNvdXJjZSA9IGNhY2hlRmlyc3RSZXNwb25zZShldmVudCwgdXJsU3RyaW5nLCBjYWNoZVVybCk7XG4gICAgICB9XG5cbiAgICBldmVudC5yZXNwb25kV2l0aChyZXNvdXJjZSk7XG4gIH0pO1xuXG4gIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGRhdGEgPSBlLmRhdGE7XG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGRhdGEuYWN0aW9uKSB7XG4gICAgICBjYXNlICdza2lwV2FpdGluZyc6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoc2VsZi5za2lwV2FpdGluZykgc2VsZi5za2lwV2FpdGluZygpO1xuICAgICAgICB9YnJlYWs7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjYWNoZUZpcnN0UmVzcG9uc2UoZXZlbnQsIHVybFN0cmluZywgY2FjaGVVcmwpIHtcbiAgICBoYW5kbGVOYXZpZ2F0aW9uUHJlbG9hZChldmVudCk7XG5cbiAgICByZXR1cm4gY2FjaGVzTWF0Y2goY2FjaGVVcmwsIENBQ0hFX05BTUUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKERFQlVHKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1tTV106JywgJ1VSTCBbJyArIGNhY2hlVXJsICsgJ10oJyArIHVybFN0cmluZyArICcpIGZyb20gY2FjaGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH1cblxuICAgICAgLy8gTG9hZCBhbmQgY2FjaGUga25vd24gYXNzZXRzXG4gICAgICB2YXIgZmV0Y2hpbmcgPSBmZXRjaChldmVudC5yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgaWYgKERFQlVHKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1NXXTonLCAnVVJMIFsnICsgdXJsU3RyaW5nICsgJ10gd3JvbmcgcmVzcG9uc2U6IFsnICsgcmVzcG9uc2Uuc3RhdHVzICsgJ10gJyArIHJlc3BvbnNlLnR5cGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChERUJVRykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdbU1ddOicsICdVUkwgWycgKyB1cmxTdHJpbmcgKyAnXSBmcm9tIG5ldHdvcmsnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWNoZVVybCA9PT0gdXJsU3RyaW5nKSB7XG4gICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZUNsb25lID0gcmVzcG9uc2UuY2xvbmUoKTtcbiAgICAgICAgICAgIHZhciBzdG9yaW5nID0gY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnB1dCh1cmxTdHJpbmcsIHJlc3BvbnNlQ2xvbmUpO1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbU1ddOicsICdDYWNoZSBhc3NldDogJyArIHVybFN0cmluZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlbnQud2FpdFVudGlsKHN0b3JpbmcpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZldGNoaW5nO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV0d29ya0ZpcnN0UmVzcG9uc2UoZXZlbnQsIHVybFN0cmluZywgY2FjaGVVcmwpIHtcbiAgICByZXR1cm4gZmV0Y2hXaXRoUHJlbG9hZChldmVudCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBpZiAoREVCVUcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnW1NXXTonLCAnVVJMIFsnICsgdXJsU3RyaW5nICsgJ10gZnJvbSBuZXR3b3JrJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFRocm93IHRvIHJlYWNoIHRoZSBjb2RlIGluIHRoZSBjYXRjaCBiZWxvd1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfSlcbiAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGluIGEgY2F0Y2goKSBhbmQgbm90IGp1c3QgaW4gdGhlIHRoZW4oKSBhYm92ZVxuICAgIC8vIGNhdXNlIGlmIHlvdXIgbmV0d29yayBpcyBkb3duLCB0aGUgZmV0Y2goKSB3aWxsIHRocm93XG4gICAgWydjYXRjaCddKGZ1bmN0aW9uIChlcnJvcmVkUmVzcG9uc2UpIHtcbiAgICAgIGlmIChERUJVRykge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NXXTonLCAnVVJMIFsnICsgdXJsU3RyaW5nICsgJ10gZnJvbSBjYWNoZSBpZiBwb3NzaWJsZScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FjaGVzTWF0Y2goY2FjaGVVcmwsIENBQ0hFX05BTUUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvcmVkUmVzcG9uc2UgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBlcnJvcmVkUmVzcG9uc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3QgYSByZXNwb25zZSBhdCB0aGlzIHBvaW50LCBzb21lIG90aGVyIGVycm9yXG4gICAgICAgIHRocm93IGVycm9yZWRSZXNwb25zZTtcbiAgICAgICAgLy8gcmV0dXJuIFJlc3BvbnNlLmVycm9yKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5hdmlnYXRpb25QcmVsb2FkKGV2ZW50KSB7XG4gICAgaWYgKG5hdmlnYXRpb25QcmVsb2FkICYmIHR5cGVvZiBuYXZpZ2F0aW9uUHJlbG9hZC5tYXAgPT09ICdmdW5jdGlvbicgJiZcbiAgICAvLyBVc2UgcmVxdWVzdC5tb2RlID09PSAnbmF2aWdhdGUnIGluc3RlYWQgb2YgaXNOYXZpZ2F0ZVJlcXVlc3RcbiAgICAvLyBiZWNhdXNlIGV2ZXJ5dGhpbmcgd2hhdCBzdXBwb3J0cyBuYXZpZ2F0aW9uUHJlbG9hZCBzdXBwb3J0c1xuICAgIC8vICduYXZpZ2F0ZScgcmVxdWVzdC5tb2RlXG4gICAgZXZlbnQucHJlbG9hZFJlc3BvbnNlICYmIGV2ZW50LnJlcXVlc3QubW9kZSA9PT0gJ25hdmlnYXRlJykge1xuICAgICAgdmFyIG1hcHBlZCA9IG5hdmlnYXRpb25QcmVsb2FkLm1hcChuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKSwgZXZlbnQucmVxdWVzdCk7XG5cbiAgICAgIGlmIChtYXBwZWQpIHtcbiAgICAgICAgc3RvcmVQcmVsb2FkZWRSZXNwb25zZShtYXBwZWQsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBUZW1wb3JhcnkgaW4tbWVtb3J5IHN0b3JlIGZvciBmYXN0ZXIgYWNjZXNzXG4gIHZhciBuYXZpZ2F0aW9uUHJlbG9hZFN0b3JlID0gbmV3IE1hcCgpO1xuXG4gIGZ1bmN0aW9uIHN0b3JlUHJlbG9hZGVkUmVzcG9uc2UoX3VybCwgZXZlbnQpIHtcbiAgICB2YXIgdXJsID0gbmV3IFVSTChfdXJsLCBsb2NhdGlvbik7XG4gICAgdmFyIHByZWxvYWRSZXNwb25zZVByb21pc2UgPSBldmVudC5wcmVsb2FkUmVzcG9uc2U7XG5cbiAgICBuYXZpZ2F0aW9uUHJlbG9hZFN0b3JlLnNldChwcmVsb2FkUmVzcG9uc2VQcm9taXNlLCB7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIHJlc3BvbnNlOiBwcmVsb2FkUmVzcG9uc2VQcm9taXNlXG4gICAgfSk7XG5cbiAgICB2YXIgaXNTYW1lUHJlbG9hZCA9IGZ1bmN0aW9uIGlzU2FtZVByZWxvYWQoKSB7XG4gICAgICByZXR1cm4gbmF2aWdhdGlvblByZWxvYWRTdG9yZS5oYXMocHJlbG9hZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgfTtcblxuICAgIHZhciBzdG9yaW5nID0gcHJlbG9hZFJlc3BvbnNlUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vIFJldHVybiBpZiBwcmVsb2FkIGlzbid0IGVuYWJsZWQgb3IgaGFzbid0IGhhcHBlbmVkXG4gICAgICBpZiAoIXJlcykgcmV0dXJuO1xuXG4gICAgICAvLyBJZiBuYXZpZ2F0aW9uUHJlbG9hZFN0b3JlIGFscmVhZHkgY29uc3VtZWRcbiAgICAgIC8vIG9yIG5hdmlnYXRpb25QcmVsb2FkU3RvcmUgYWxyZWFkeSBjb250YWlucyBhbm90aGVyIHByZWxvYWQsXG4gICAgICAvLyB0aGVuIGRvIG5vdCBzdG9yZSBhbnl0aGluZyBhbmQgcmV0dXJuXG4gICAgICBpZiAoIWlzU2FtZVByZWxvYWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjbG9uZSA9IHJlcy5jbG9uZSgpO1xuXG4gICAgICAvLyBTdG9yaW5nIHRoZSBwcmVsb2FkIHJlc3BvbnNlIGZvciBsYXRlciBjb25zdW1lIChoYXNuJ3QgeWV0IGJlZW4gY29uc3VtZWQpXG4gICAgICByZXR1cm4gY2FjaGVzLm9wZW4oUFJFTE9BRF9DQUNIRV9OQU1FKS50aGVuKGZ1bmN0aW9uIChjYWNoZSkge1xuICAgICAgICBpZiAoIWlzU2FtZVByZWxvYWQoKSkgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiBjYWNoZS5wdXQodXJsLCBjbG9uZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCFpc1NhbWVQcmVsb2FkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZXMub3BlbihQUkVMT0FEX0NBQ0hFX05BTUUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVsnZGVsZXRlJ10odXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGV2ZW50LndhaXRVbnRpbChzdG9yaW5nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHJpdmVJbk1lbW9yeVByZWxvYWRlZFJlc3BvbnNlKHVybCkge1xuICAgIGlmICghbmF2aWdhdGlvblByZWxvYWRTdG9yZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBmb3VuZFJlc3BvbnNlID0gdW5kZWZpbmVkO1xuICAgIHZhciBmb3VuZEtleSA9IHVuZGVmaW5lZDtcblxuICAgIG5hdmlnYXRpb25QcmVsb2FkU3RvcmUuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmUsIGtleSkge1xuICAgICAgaWYgKHN0b3JlLnVybC5ocmVmID09PSB1cmwuaHJlZikge1xuICAgICAgICBmb3VuZFJlc3BvbnNlID0gc3RvcmUucmVzcG9uc2U7XG4gICAgICAgIGZvdW5kS2V5ID0ga2V5O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGZvdW5kUmVzcG9uc2UpIHtcbiAgICAgIG5hdmlnYXRpb25QcmVsb2FkU3RvcmVbJ2RlbGV0ZSddKGZvdW5kS2V5KTtcbiAgICAgIHJldHVybiBmb3VuZFJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHJpdmVQcmVsb2FkZWRSZXNwb25zZShldmVudCkge1xuICAgIHZhciB1cmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcblxuICAgIGlmIChzZWxmLnJlZ2lzdHJhdGlvbi5uYXZpZ2F0aW9uUHJlbG9hZCAmJiBuYXZpZ2F0aW9uUHJlbG9hZCAmJiBuYXZpZ2F0aW9uUHJlbG9hZC50ZXN0ICYmIG5hdmlnYXRpb25QcmVsb2FkLnRlc3QodXJsLCBldmVudC5yZXF1ZXN0KSkge30gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGZyb21NZW1vcnkgPSByZXRyaXZlSW5NZW1vcnlQcmVsb2FkZWRSZXNwb25zZSh1cmwpO1xuICAgIHZhciByZXF1ZXN0ID0gZXZlbnQucmVxdWVzdDtcblxuICAgIGlmIChmcm9tTWVtb3J5KSB7XG4gICAgICBldmVudC53YWl0VW50aWwoY2FjaGVzLm9wZW4oUFJFTE9BRF9DQUNIRV9OQU1FKS50aGVuKGZ1bmN0aW9uIChjYWNoZSkge1xuICAgICAgICByZXR1cm4gY2FjaGVbJ2RlbGV0ZSddKHJlcXVlc3QpO1xuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4gZnJvbU1lbW9yeTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVzTWF0Y2gocmVxdWVzdCwgUFJFTE9BRF9DQUNIRV9OQU1FKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIGV2ZW50LndhaXRVbnRpbChjYWNoZXMub3BlbihQUkVMT0FEX0NBQ0hFX05BTUUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlWydkZWxldGUnXShyZXF1ZXN0KTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQucmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBBc3NldHMoKSB7XG4gICAgT2JqZWN0LmtleXMoYXNzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGFzc2V0c1trZXldID0gYXNzZXRzW2tleV0ubWFwKGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uKTtcblxuICAgICAgICB1cmwuaGFzaCA9ICcnO1xuXG4gICAgICAgIGlmIChleHRlcm5hbHMuaW5kZXhPZihwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgICB1cmwuc2VhcmNoID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGhhc2hlc01hcCA9IE9iamVjdC5rZXlzKGhhc2hlc01hcCkucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGhhc2gpIHtcbiAgICAgIHZhciB1cmwgPSBuZXcgVVJMKGhhc2hlc01hcFtoYXNoXSwgbG9jYXRpb24pO1xuICAgICAgdXJsLnNlYXJjaCA9ICcnO1xuICAgICAgdXJsLmhhc2ggPSAnJztcblxuICAgICAgcmVzdWx0W2hhc2hdID0gdXJsLnRvU3RyaW5nKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIGV4dGVybmFscyA9IGV4dGVybmFscy5tYXAoZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIHZhciB1cmwgPSBuZXcgVVJMKHBhdGgsIGxvY2F0aW9uKTtcbiAgICAgIHVybC5oYXNoID0gJyc7XG5cbiAgICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEFsbE5vcm1hbGl6ZWQoY2FjaGUsIHJlcXVlc3RzLCBvcHRpb25zKSB7XG4gICAgcmVxdWVzdHMgPSByZXF1ZXN0cy5zbGljZSgpO1xuXG4gICAgdmFyIGJ1c3RWYWx1ZSA9IG9wdGlvbnMuYnVzdDtcbiAgICB2YXIgZmFpbEFsbCA9IG9wdGlvbnMuZmFpbEFsbCAhPT0gZmFsc2U7XG4gICAgdmFyIGRlbGV0ZUZpcnN0ID0gb3B0aW9ucy5kZWxldGVGaXJzdCA9PT0gdHJ1ZTtcbiAgICB2YXIgcmVxdWVzdEluaXQgPSBvcHRpb25zLnJlcXVlc3QgfHwge1xuICAgICAgY3JlZGVudGlhbHM6ICdvbWl0JyxcbiAgICAgIG1vZGU6ICdjb3JzJ1xuICAgIH07XG5cbiAgICB2YXIgZGVsZXRpbmcgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIGlmIChkZWxldGVGaXJzdCkge1xuICAgICAgZGVsZXRpbmcgPSBQcm9taXNlLmFsbChyZXF1ZXN0cy5tYXAoZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlWydkZWxldGUnXShyZXF1ZXN0KVsnY2F0Y2gnXShmdW5jdGlvbiAoKSB7fSk7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHJlcXVlc3RzLm1hcChmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgaWYgKGJ1c3RWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0ID0gYXBwbHlDYWNoZUJ1c3QocmVxdWVzdCwgYnVzdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZldGNoKHJlcXVlc3QsIHJlcXVlc3RJbml0KS50aGVuKGZpeFJlZGlyZWN0ZWRSZXNwb25zZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHJldHVybiB7IGVycm9yOiB0cnVlIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyByZXNwb25zZTogcmVzcG9uc2UgfTtcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHRydWUgfTtcbiAgICAgIH0pO1xuICAgIH0pKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZXMpIHtcbiAgICAgIGlmIChmYWlsQWxsICYmIHJlc3BvbnNlcy5zb21lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmVycm9yO1xuICAgICAgfSkpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV3JvbmcgcmVzcG9uc2Ugc3RhdHVzJykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZhaWxBbGwpIHtcbiAgICAgICAgcmVzcG9uc2VzID0gcmVzcG9uc2VzLmZpbHRlcihmdW5jdGlvbiAoZGF0YSwgaSkge1xuICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVxdWVzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWxldGluZy50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFkZEFsbCA9IHJlc3BvbnNlcy5tYXAoZnVuY3Rpb24gKF9yZWYsIGkpIHtcbiAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBfcmVmLnJlc3BvbnNlO1xuXG4gICAgICAgICAgcmV0dXJuIGNhY2hlLnB1dChyZXF1ZXN0c1tpXSwgcmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYWRkQWxsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbWF0Y2hDYWNoZU1hcChyZXF1ZXN0KSB7XG4gICAgdmFyIHVybFN0cmluZyA9IHJlcXVlc3QudXJsO1xuICAgIHZhciB1cmwgPSBuZXcgVVJMKHVybFN0cmluZyk7XG5cbiAgICB2YXIgcmVxdWVzdFR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAoaXNOYXZpZ2F0ZVJlcXVlc3QocmVxdWVzdCkpIHtcbiAgICAgIHJlcXVlc3RUeXBlID0gJ25hdmlnYXRlJztcbiAgICB9IGVsc2UgaWYgKHVybC5vcmlnaW4gPT09IGxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgcmVxdWVzdFR5cGUgPSAnc2FtZS1vcmlnaW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0VHlwZSA9ICdjcm9zcy1vcmlnaW4nO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGVNYXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbWFwID0gY2FjaGVNYXBzW2ldO1xuXG4gICAgICBpZiAoIW1hcCkgY29udGludWU7XG4gICAgICBpZiAobWFwLnJlcXVlc3RUeXBlcyAmJiBtYXAucmVxdWVzdFR5cGVzLmluZGV4T2YocmVxdWVzdFR5cGUpID09PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIG5ld1N0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHR5cGVvZiBtYXAubWF0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbmV3U3RyaW5nID0gbWFwLm1hdGNoKHVybCwgcmVxdWVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdTdHJpbmcgPSB1cmxTdHJpbmcucmVwbGFjZShtYXAubWF0Y2gsIG1hcC50byk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdTdHJpbmcgJiYgbmV3U3RyaW5nICE9PSB1cmxTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ld1N0cmluZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaFdpdGhQcmVsb2FkKGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5wcmVsb2FkUmVzcG9uc2UgfHwgbmF2aWdhdGlvblByZWxvYWQgIT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmZXRjaChldmVudC5yZXF1ZXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnQucHJlbG9hZFJlc3BvbnNlLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQucmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FjaGVzTWF0Y2gocmVxdWVzdCwgY2FjaGVOYW1lKSB7XG4gIHJldHVybiBjYWNoZXMubWF0Y2gocmVxdWVzdCwge1xuICAgIGNhY2hlTmFtZTogY2FjaGVOYW1lXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKGlzTm90UmVkaXJlY3RlZFJlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIEZpeCBhbHJlYWR5IGNhY2hlZCByZWRpcmVjdGVkIHJlc3BvbnNlc1xuICAgIHJldHVybiBmaXhSZWRpcmVjdGVkUmVzcG9uc2UocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24gKGZpeGVkUmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiBjYWNoZXMub3BlbihjYWNoZU5hbWUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5wdXQocmVxdWVzdCwgZml4ZWRSZXNwb25zZSk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpeGVkUmVzcG9uc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSlcbiAgLy8gUmV0dXJuIHZvaWQgaWYgZXJyb3IgaGFwcGVuZWQgKGNhY2hlIG5vdCBmb3VuZClcbiAgWydjYXRjaCddKGZ1bmN0aW9uICgpIHt9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlDYWNoZUJ1c3QoYXNzZXQsIGtleSkge1xuICB2YXIgaGFzUXVlcnkgPSBhc3NldC5pbmRleE9mKCc/JykgIT09IC0xO1xuICByZXR1cm4gYXNzZXQgKyAoaGFzUXVlcnkgPyAnJicgOiAnPycpICsgJ19fdW5jYWNoZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGtleSk7XG59XG5cbmZ1bmN0aW9uIGlzTmF2aWdhdGVSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgcmV0dXJuIHJlcXVlc3QubW9kZSA9PT0gJ25hdmlnYXRlJyB8fCByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdVcGdyYWRlLUluc2VjdXJlLVJlcXVlc3RzJykgfHwgKHJlcXVlc3QuaGVhZGVycy5nZXQoJ0FjY2VwdCcpIHx8ICcnKS5pbmRleE9mKCd0ZXh0L2h0bWwnKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIGlzTm90UmVkaXJlY3RlZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIHJldHVybiAhcmVzcG9uc2UgfHwgIXJlc3BvbnNlLnJlZGlyZWN0ZWQgfHwgIXJlc3BvbnNlLm9rIHx8IHJlc3BvbnNlLnR5cGUgPT09ICdvcGFxdWVyZWRpcmVjdCc7XG59XG5cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvc3ctcHJlY2FjaGUvcHVsbC8yNDEvZmlsZXMjZGlmZi0zZWU5MDYwZGM3YTMxMmM2YTgyMmNhYzYzYThjNjMwYlI4NVxuZnVuY3Rpb24gZml4UmVkaXJlY3RlZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIGlmIChpc05vdFJlZGlyZWN0ZWRSZXNwb25zZShyZXNwb25zZSkpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIHZhciBib2R5ID0gJ2JvZHknIGluIHJlc3BvbnNlID8gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlLmJvZHkpIDogcmVzcG9uc2UuYmxvYigpO1xuXG4gIHJldHVybiBib2R5LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKGRhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY29weU9iamVjdChvcmlnaW5hbCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMob3JpZ2luYWwpLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBrZXkpIHtcbiAgICByZXN1bHRba2V5XSA9IG9yaWdpbmFsW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBsb2dHcm91cCh0aXRsZSwgYXNzZXRzKSB7XG4gIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoJ1tTV106JywgdGl0bGUpO1xuXG4gIGFzc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NldCkge1xuICAgIGNvbnNvbGUubG9nKCdBc3NldDonLCBhc3NldCk7XG4gIH0pO1xuXG4gIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn1cbiAgICAgICAgV2VicGFja1NlcnZpY2VXb3JrZXIoX193cG8sIHtcbmxvYWRlcnM6IHt9LFxuY2FjaGVNYXBzOiBbXSxcbm5hdmlnYXRpb25QcmVsb2FkOiB0cnVlLFxufSk7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vZW1wdHktZW50cnkuanNcIilcbiAgICAgICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22cacheMaps%22%3A%5B%5D%2C%22navigationPreload%22%3A%22true%22%7D!./node_modules/offline-plugin/tpls/empty-entry.js\n");

/***/ }),

/***/ "./node_modules/offline-plugin/tpls/empty-entry.js":
/*!*********************************************************!*\
  !*** ./node_modules/offline-plugin/tpls/empty-entry.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9vZmZsaW5lLXBsdWdpbi90cGxzL2VtcHR5LWVudHJ5LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/offline-plugin/tpls/empty-entry.js\n");

/***/ })

/******/ });