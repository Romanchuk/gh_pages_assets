(function () {
  function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  /******/
  (function () {
    // webpackBootstrap

    /******/
    "use strict";
    /******/

    var __webpack_modules__ = {
      /***/
      8984:
      /*!********************************************************************************************************************!*\
        !*** ./node_modules/@datana-smart/controls/__ivy_ngcc__/fesm2015/datana-smart-controls-dtn-video-player-common.js ***!
        \********************************************************************************************************************/

      /***/
      function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */


        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          "BaseTransportService": function BaseTransportService() {
            return (
              /* binding */
              _BaseTransportService
            );
          },

          /* harmony export */
          "DEFAULT_PLAYER_OPTIONS": function DEFAULT_PLAYER_OPTIONS() {
            return (
              /* binding */
              _DEFAULT_PLAYER_OPTIONS
            );
          },

          /* harmony export */
          "DrawCanvasBaseService": function DrawCanvasBaseService() {
            return (
              /* binding */
              _DrawCanvasBaseService
            );
          },

          /* harmony export */
          "HttpDrawCanvasBaseLogger": function HttpDrawCanvasBaseLogger() {
            return (
              /* binding */
              _HttpDrawCanvasBaseLogger
            );
          },

          /* harmony export */
          "HttpImgStreamTransportService": function HttpImgStreamTransportService() {
            return (
              /* binding */
              _HttpImgStreamTransportService
            );
          },

          /* harmony export */
          "WebsocketTransportService": function WebsocketTransportService() {
            return (
              /* binding */
              _WebsocketTransportService
            );
          },

          /* harmony export */
          "transportFactory": function transportFactory() {
            return (
              /* binding */
              _transportFactory
            );
          }
          /* harmony export */

        });
        /* harmony import */


        var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! tslib */
        3786);
        /* harmony import */


        var _datana_smart_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! @datana-smart/utils */
        5109);

        var _HttpDrawCanvasBaseLogger = /*#__PURE__*/function () {
          function _HttpDrawCanvasBaseLogger(options) {
            _classCallCheck(this, _HttpDrawCanvasBaseLogger);

            var _a, _b;

            this.options = Object.assign(Object.assign({}, options), {
              component: (_a = options === null || options === void 0 ? void 0 : options.component) !== null && _a !== void 0 ? _a : 'dtn-video-player'
            });

            if (!((_b = this.options) === null || _b === void 0 ? void 0 : _b.endpoint)) {
              console.warn('[dtn-video-player] No logging endpoint specified. No logs would be send');
            }
          }

          _createClass(_HttpDrawCanvasBaseLogger, [{
            key: "log",
            value: function log(obj) {
              var _a;

              var message = "[dtn-video-player] ".concat(obj.message, "'");

              if (this.options.debug) {
                if (obj.level === 'ERROR') {
                  console.warn(message);
                } else {
                  console.log(message);
                }
              }

              if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.endpoint)) {
                return;
              }

              fetch(this.options.endpoint, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  level: obj.level,
                  message: "[Front] ".concat(message),
                  component: this.options.component,
                  metricType: "".concat(this.options.component, "-").concat(obj.metricType)
                })
              });
            }
          }]);

          return _HttpDrawCanvasBaseLogger;
        }();

        var _BaseTransportService = /*#__PURE__*/function () {
          function _BaseTransportService(logger, _options) {
            _classCallCheck(this, _BaseTransportService);

            this.logger = logger;
            this._options = _options;
            this._meta = this._initialMeta();
          }

          _createClass(_BaseTransportService, [{
            key: "meta",
            get: function get() {
              return Object.assign(Object.assign({}, this._meta), {
                connectionId: this._connectionId
              });
            }
          }, {
            key: "connect",
            value: function connect() {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        this.resetMeta();
                        this.meta.connectionId = Date.now().toString().slice(-8);
                        this.logAtteptingConnect();

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }
          }, {
            key: "disconnect",
            value: function disconnect() {
              this.resetMeta();
            }
          }, {
            key: "logAtteptingConnect",
            value: function logAtteptingConnect() {
              this.logger.log({
                level: 'INFO',
                message: "Attepting to connect ".concat(this.type, " ").concat(this.meta.connectionId, ". url: ").concat(this._options.endpoint),
                metricType: "".concat(this.type, "-attempting-to-connect")
              });
            }
          }, {
            key: "logDisconnect",
            value: function logDisconnect() {
              this.logger.log({
                level: 'ERROR',
                message: "".concat(this.type, " ").concat(this.meta.connectionId, " disconnected. url:  ").concat(this._options.endpoint, ".\n            Reconnect will be attempted in ").concat(this._options.reconnectTimeout, " ms"),
                metricType: "".concat(this.type, "-disconnected")
              });
            }
          }, {
            key: "logRecieved",
            value: function logRecieved(blob) {
              this.logger.log({
                level: 'INFO',
                message: "Recieved frame (size: ".concat(blob === null || blob === void 0 ? void 0 : blob.size, ") from websocket: ").concat(this.meta.connectionId),
                metricType: 'frame-recieved'
              });
            }
          }, {
            key: "logConnected",
            value: function logConnected() {
              this.logger.log({
                level: 'INFO',
                message: "Connected to ".concat(this.type, " ").concat(this.meta.connectionId, ". url: ").concat(this._options.endpoint),
                metricType: "".concat(this.type, "-connected")
              });
            }
          }, {
            key: "_initialMeta",
            value: function _initialMeta() {
              return {
                stats: {
                  frameId: 0,
                  recievedFPS: 0,
                  drawnFPS: 0,
                  recieved: 0,
                  errored: 0,
                  skipped: 0,
                  drawn: 0
                }
              };
            }
          }, {
            key: "resetMeta",
            value: function resetMeta() {
              this._meta = this._initialMeta();
            }
          }]);

          return _BaseTransportService;
        }();

        var _HttpImgStreamTransportService = /*#__PURE__*/function (_BaseTransportService2) {
          _inherits(_HttpImgStreamTransportService, _BaseTransportService2);

          var _super2 = _createSuper(_HttpImgStreamTransportService);

          function _HttpImgStreamTransportService(logger, _options, _drawCallback) {
            var _this;

            _classCallCheck(this, _HttpImgStreamTransportService);

            _this = _super2.call(this, logger, _options);
            _this.logger = logger;
            _this._drawCallback = _drawCallback;
            _this._imageBuffer = [];
            _this._isBuffering = false;
            _this.type = 'http-img-stream';
            return _this;
          }

          _createClass(_HttpImgStreamTransportService, [{
            key: "connect",
            value: function connect() {
              var _this2 = this;

              var _super = Object.create(null, {
                connect: {
                  get: function get() {
                    return _get(_getPrototypeOf(_HttpImgStreamTransportService.prototype), "connect", _this2);
                  }
                }
              });

              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this3 = this;

                var signal, req, response, reader, _yield$reader$read, value, done;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _super.connect.call(this);

                      case 2:
                        this._imageBuffer = [];
                        this._abortController = new AbortController();
                        signal = this._abortController.signal;
                        _context3.prev = 5;
                        req = fetch(this._options.endpoint, {
                          signal: signal
                        });
                        _context3.next = 9;
                        return req;

                      case 9:
                        response = _context3.sent;
                        this.logConnected();
                        reader = response.body.getReader(); // eslint-disable-next-line no-constant-condition

                      case 12:
                        if (!true) {
                          _context3.next = 25;
                          break;
                        }

                        _context3.next = 15;
                        return reader.read();

                      case 15:
                        _yield$reader$read = _context3.sent;
                        value = _yield$reader$read.value;
                        done = _yield$reader$read.done;

                        if (!done) {
                          _context3.next = 20;
                          break;
                        }

                        return _context3.abrupt("break", 25);

                      case 20:
                        if (!signal.aborted) {
                          _context3.next = 22;
                          break;
                        }

                        return _context3.abrupt("break", 25);

                      case 22:
                        this.readImg(value, function (readyImgBuffer) {
                          return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                            var blob;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    blob = new Blob([readyImgBuffer]);
                                    this.logRecieved(blob);
                                    _context2.next = 4;
                                    return this._drawCallback(blob, this.meta);

                                  case 4:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, this);
                          }));
                        });
                        _context3.next = 12;
                        break;

                      case 25:
                        _context3.next = 32;
                        break;

                      case 27:
                        _context3.prev = 27;
                        _context3.t0 = _context3["catch"](5);
                        this._imageBuffer = [];
                        this.logDisconnect();
                        setTimeout(function () {
                          _this3.connect();
                        }, this._options.reconnectTimeout);

                      case 32:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this, [[5, 27]]);
              }));
            }
          }, {
            key: "disconnect",
            value: function disconnect() {
              var _a;

              _get(_getPrototypeOf(_HttpImgStreamTransportService.prototype), "disconnect", this).call(this);

              (_a = this._abortController) === null || _a === void 0 ? void 0 : _a.abort();
            }
          }, {
            key: "readImg",
            value: function readImg(value, cb) {
              var i = 0;

              while (i < value.length) {
                if (i < value.length - 2) {
                  // New image
                  if (value[i] === 255 && value[i + 1] === 216) {
                    this._imageBuffer = [];
                    this._isBuffering = true;
                  } // End image


                  if (value[i] === 255 && value[i + 1] === 217) {
                    this._imageBuffer.push(value[i]);

                    this._imageBuffer.push(value[i + 1]);

                    var arr = new Uint8Array(this._imageBuffer);
                    cb(arr);
                    this._imageBuffer = [];
                    this._isBuffering = false;
                    i++;
                  } else {
                    if (this._isBuffering) {
                      this._imageBuffer.push(value[i]);
                    }
                  }
                } else {
                  if (this._isBuffering) {
                    this._imageBuffer.push(value[i]);
                  }
                }

                i++;
              } // Protect buffer


              if (this._imageBuffer.length > 4000000) {
                this._imageBuffer = [];
              }
            }
          }]);

          return _HttpImgStreamTransportService;
        }(_BaseTransportService);

        var _WebsocketTransportService = /*#__PURE__*/function (_BaseTransportService3) {
          _inherits(_WebsocketTransportService, _BaseTransportService3);

          var _super3 = _createSuper(_WebsocketTransportService);

          function _WebsocketTransportService(logger, _options, _drawCallback) {
            var _this4;

            _classCallCheck(this, _WebsocketTransportService);

            _this4 = _super3.call(this, logger, _options);
            _this4.logger = logger;
            _this4._drawCallback = _drawCallback;
            _this4.type = 'websocket';
            return _this4;
          }

          _createClass(_WebsocketTransportService, [{
            key: "connect",
            value: function connect() {
              var _this5 = this;

              var _super = Object.create(null, {
                connect: {
                  get: function get() {
                    return _get(_getPrototypeOf(_WebsocketTransportService.prototype), "connect", _this5);
                  }
                }
              });

              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var _this6 = this;

                var ws;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _super.connect.call(this);

                      case 2:
                        ws = new WebSocket(this._options.endpoint);
                        this._currentWs = ws;

                        ws.onopen = function () {
                          _this6.logConnected();

                          ws.onmessage = function (data) {
                            return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      this.logRecieved(data.data);
                                      _context4.next = 3;
                                      return this._drawCallback(data.data, this.meta);

                                    case 3:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4, this);
                            }));
                          };
                        };

                        ws.onclose = function () {
                          // TODO: do not recconect on manual disconnect;
                          _this6.logDisconnect();

                          setTimeout(function () {
                            _this6.connect();
                          }, _this6._options.reconnectTimeout);
                        };

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              }));
            }
          }, {
            key: "disconnect",
            value: function disconnect() {
              _get(_getPrototypeOf(_WebsocketTransportService.prototype), "disconnect", this).call(this);

              this._currentWs.close();
            }
          }]);

          return _WebsocketTransportService;
        }(_BaseTransportService);

        var _transportFactory = function _transportFactory(logger, options, drawCallback) {
          switch (options.transport) {
            case 'http-img-stream':
              return new _HttpImgStreamTransportService(logger, options, drawCallback);

            case 'websocket':
            default:
              return new _WebsocketTransportService(logger, options, drawCallback);
          }
        };

        var _DrawCanvasBaseService = /*#__PURE__*/function () {
          function _DrawCanvasBaseService(logger) {
            _classCallCheck(this, _DrawCanvasBaseService);

            this.logger = logger;
            this._isDrawing = false;
          }

          _createClass(_DrawCanvasBaseService, [{
            key: "inited",
            get: function get() {
              return !!this._canvas;
            }
          }, {
            key: "init",
            value: function init(canvas, options, eventCallback) {
              if (!canvas) {
                throw new Error('[dtn-video-player] No canvas specified!');
              }

              this._canvas = canvas;
              this._context = canvas.getContext('2d', {
                alpha: false
              });
              this._options = options;
              this._transport = _transportFactory(this.logger, options, this.tryDraw.bind(this));

              this._transport.connect(); // notify UI if there is no frames recieved in 5 sec https://jira.datana.ru/browse/NKR-2429


              if (this._options.noFramesTimeout === false) {
                return;
              } else if (typeof this._options.noFramesTimeout === 'number' && this._options.noFramesTimeout > 0) {
                this._timeoutTimer = new _datana_smart_utils__WEBPACK_IMPORTED_MODULE_1__.DtnTimeoutTimer();

                this._timeoutTimer.start(this._options.noFramesTimeout, function (isRecieving) {
                  eventCallback({
                    type: 'frames_recieving_state_changed',
                    payload: isRecieving
                  });
                });
              }
            }
          }, {
            key: "canvasResize",
            value: function canvasResize(width, height) {
              if (!this._canvas) {
                return;
              }

              this._canvas.width = width;
              this._canvas.height = height;
            }
          }, {
            key: "dispose",
            value: function dispose() {
              var _a;

              this._fpsInterval && clearInterval(this._fpsInterval);
              (_a = this._timeoutTimer) === null || _a === void 0 ? void 0 : _a.stop();

              this._transport.disconnect();
            }
          }, {
            key: "tryDraw",
            value: function tryDraw(source, transportMeta) {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _this7 = this;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        this._timeoutTimer.bounce();

                        if (this._options.overlayStats) {
                          this._fpsCounter(transportMeta.stats);
                        }

                        transportMeta.stats.frameId++;
                        transportMeta.stats.recieved++;

                        if (this.inited) {
                          _context7.next = 7;
                          break;
                        }

                        console.warn('[dtn-video-player] Service must be inited before draw!');
                        return _context7.abrupt("return");

                      case 7:
                        if (!this._isDrawing) {
                          _context7.next = 11;
                          break;
                        }

                        transportMeta.stats.skipped++;
                        this.logger.log({
                          level: 'INFO',
                          message: "Skip frame ".concat(transportMeta.stats.frameId || '', " draw (another in process) (size: ").concat(source === null || source === void 0 ? void 0 : source.size, "). Websocket: ").concat(transportMeta.connectionId),
                          metricType: 'frame-skip'
                        });
                        return _context7.abrupt("return");

                      case 11:
                        this._isDrawing = true;
                        requestAnimationFrame(function () {
                          return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(_this7, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                            var _a;

                            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                              while (1) {
                                switch (_context6.prev = _context6.next) {
                                  case 0:
                                    _context6.prev = 0;
                                    _context6.next = 3;
                                    return this._drawToCanvas(source, transportMeta);

                                  case 3:
                                    transportMeta.stats.drawn++;
                                    this.logger.log({
                                      level: 'INFO',
                                      message: "Drawn frame ".concat(transportMeta.stats.frameId || '', " (size: ").concat((_a = source) === null || _a === void 0 ? void 0 : _a.size, "). Websocket: ").concat(transportMeta.connectionId),
                                      metricType: 'frame-drawn'
                                    });
                                    _context6.next = 12;
                                    break;

                                  case 7:
                                    _context6.prev = 7;
                                    _context6.t0 = _context6["catch"](0);
                                    transportMeta.stats.errored++;
                                    this.logger.log({
                                      level: 'ERROR',
                                      message: "Failed to draw frame ".concat(transportMeta.stats.frameId || '', " (size: ").concat(source === null || source === void 0 ? void 0 : source.size, "). Websocket: ").concat(transportMeta.connectionId, " \n Error: ").concat(_context6.t0 === null || _context6.t0 === void 0 ? void 0 : _context6.t0.message),
                                      metricType: 'frame-draw-error'
                                    });
                                    throw _context6.t0;

                                  case 12:
                                    _context6.prev = 12;
                                    this._isDrawing = false;
                                    return _context6.finish(12);

                                  case 15:
                                  case "end":
                                    return _context6.stop();
                                }
                              }
                            }, _callee6, this, [[0, 7, 12, 15]]);
                          }));
                        });

                      case 13:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, this);
              }));
            }
          }, {
            key: "_drawToCanvas",
            value: function _drawToCanvas(source, transportMeta) {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var img, url, _img;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (!(typeof createImageBitmap !== 'undefined')) {
                          _context8.next = 7;
                          break;
                        }

                        _context8.next = 3;
                        return createImageBitmap(source);

                      case 3:
                        img = _context8.sent;

                        this._scaleAndDrawImage(img, transportMeta.stats); //@ts-ignore


                        _context8.next = 15;
                        break;

                      case 7:
                        if (!(typeof Image !== 'undefined')) {
                          _context8.next = 14;
                          break;
                        }

                        url = URL.createObjectURL(source); //@ts-ignore

                        _img = new Image();

                        _img.onload = function () {
                          // @ts-ignore
                          this._scaleAndDrawImage(_img, transportMeta.stats);
                        }.bind(this);

                        _img.src = url; //@ts-ignore

                        _context8.next = 15;
                        break;

                      case 14:
                        throw new Error("No available drawing mechanism. Tried 'createImageBitmap' and 'Image'!");

                      case 15:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, this);
              }));
            }
            /**
             *  Scale image to canvas size and draw image
             *
             * @private
             * @param {ImageBitmap} img
             * @memberof DrawCanvasService
             */

          }, {
            key: "_scaleAndDrawImage",
            value: function _scaleAndDrawImage(img, stats) {
              var hRatio = this._canvas.width / img.width;
              var vRatio = this._canvas.height / img.height;
              var ratio = Math.min(hRatio, vRatio);

              this._context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

              if (this._context.fillText && this._options.overlayStats) {
                this._context.fillStyle = 'red';
                var yPos = 20;

                this._context.fillText(stats.frameId.toString(), 10, yPos);

                yPos += 30;
                this._context.fillStyle = 'yellow';

                this._context.fillText("\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E FPS: ".concat(stats.recievedFPS), 10, yPos);

                yPos += 30;
                this._context.fillStyle = 'lime';

                this._context.fillText("\u041E\u0442\u0440\u0438\u0441\u043E\u0432\u0430\u043D\u043E FPS: ".concat(stats.drawnFPS), 10, yPos);

                yPos += 30;
                this._context.fillStyle = 'yellow';

                this._context.fillText("\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E: ".concat(stats.skipped), 10, yPos);

                yPos += 30;
                this._context.fillStyle = 'red';

                this._context.fillText("\u041E\u0448\u0438\u0431\u043E\u043A: ".concat(stats.errored), 10, yPos);
              }
            }
          }, {
            key: "_fpsCounter",
            value: function _fpsCounter(stats) {
              if (stats.frameId === 0) {
                this._fpsInterval && clearInterval(this._fpsInterval);
                this._fpsInterval = setInterval(function () {
                  stats.recievedFPS = stats.recieved;
                  stats.drawnFPS = stats.recieved;
                  stats.recieved = 0;
                  stats.drawn = 0;
                }, 1000);
              }
            }
          }]);

          return _DrawCanvasBaseService;
        }();

        var _DEFAULT_PLAYER_OPTIONS = {
          transport: 'websocket',
          endpoint: '',
          reconnectTimeout: 1000,
          noFramesTimeout: 5000,
          aspectRatio: '4/3',
          overlayStats: false,
          locales: {
            framesNotRecieving: 'Конфликт входных данных'
          },
          scaleToViewport: true
        };
        /**
         * Generated bundle index. Do not edit.
         */

        /***/
      },

      /***/
      5109:
      /*!**************************************************************************************!*\
        !*** ./node_modules/@datana-smart/utils/__ivy_ngcc__/fesm2015/datana-smart-utils.js ***!
        \**************************************************************************************/

      /***/
      function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */


        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          "DtnTimeoutTimer": function DtnTimeoutTimer() {
            return (
              /* binding */
              _DtnTimeoutTimer
            );
          }
          /* harmony export */

        });
        /**
         *
         * notify UI if there is no data recieved in 5 sec
         * https://jira.datana.ru/browse/NKR-2429, https://jira.datana.ru/browse/NKR-2539
         *
         * @export
         * @class DtnTimeoutTimer
         */


        var _DtnTimeoutTimer = /*#__PURE__*/function () {
          function _DtnTimeoutTimer() {
            _classCallCheck(this, _DtnTimeoutTimer);

            this._dataRecieving = false;
          }

          _createClass(_DtnTimeoutTimer, [{
            key: "start",
            value: function start(timeout, changeStateCallback) {
              var _this8 = this;

              if (typeof timeout !== 'number' && timeout < 1000) {
                throw new Error('[DtnTimeoutTimer] Timeout must be number and not less then 1s');
              }

              if (this._interval) {
                throw new Error("[DtnTimeoutTimer] You can't start timer twice. Use another instanse of timer.");
              }

              this._interval = setInterval(function () {
                _this8._dataRecieving = !!_this8._lastRecieved && Date.now() - _this8._lastRecieved < timeout; // state changed

                if (_this8._prevDataRecieving !== _this8._dataRecieving) {
                  _this8._prevDataRecieving = _this8._dataRecieving;
                  changeStateCallback(_this8._prevDataRecieving);
                }
              }, 500);
            }
          }, {
            key: "bounce",
            value: function bounce() {
              this._lastRecieved = Date.now();
            }
          }, {
            key: "stop",
            value: function stop() {
              clearInterval(this._interval);
            }
          }]);

          return _DtnTimeoutTimer;
        }();
        /**
         * Generated bundle index. Do not edit.
         */

        /***/

      },

      /***/
      3786:
      /*!*****************************************!*\
        !*** ./node_modules/tslib/tslib.es6.js ***!
        \*****************************************/

      /***/
      function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */


        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          "__extends": function __extends() {
            return (
              /* binding */
              _extends
            );
          },

          /* harmony export */
          "__assign": function __assign() {
            return (
              /* binding */
              _assign2
            );
          },

          /* harmony export */
          "__rest": function __rest() {
            return (
              /* binding */
              _rest
            );
          },

          /* harmony export */
          "__decorate": function __decorate() {
            return (
              /* binding */
              _decorate
            );
          },

          /* harmony export */
          "__param": function __param() {
            return (
              /* binding */
              _param
            );
          },

          /* harmony export */
          "__metadata": function __metadata() {
            return (
              /* binding */
              _metadata
            );
          },

          /* harmony export */
          "__awaiter": function __awaiter() {
            return (
              /* binding */
              _awaiter
            );
          },

          /* harmony export */
          "__generator": function __generator() {
            return (
              /* binding */
              _generator
            );
          },

          /* harmony export */
          "__createBinding": function __createBinding() {
            return (
              /* binding */
              _createBinding
            );
          },

          /* harmony export */
          "__exportStar": function __exportStar() {
            return (
              /* binding */
              _exportStar
            );
          },

          /* harmony export */
          "__values": function __values() {
            return (
              /* binding */
              _values
            );
          },

          /* harmony export */
          "__read": function __read() {
            return (
              /* binding */
              _read
            );
          },

          /* harmony export */
          "__spread": function __spread() {
            return (
              /* binding */
              _spread
            );
          },

          /* harmony export */
          "__spreadArrays": function __spreadArrays() {
            return (
              /* binding */
              _spreadArrays
            );
          },

          /* harmony export */
          "__spreadArray": function __spreadArray() {
            return (
              /* binding */
              _spreadArray
            );
          },

          /* harmony export */
          "__await": function __await() {
            return (
              /* binding */
              _await
            );
          },

          /* harmony export */
          "__asyncGenerator": function __asyncGenerator() {
            return (
              /* binding */
              _asyncGenerator
            );
          },

          /* harmony export */
          "__asyncDelegator": function __asyncDelegator() {
            return (
              /* binding */
              _asyncDelegator
            );
          },

          /* harmony export */
          "__asyncValues": function __asyncValues() {
            return (
              /* binding */
              _asyncValues
            );
          },

          /* harmony export */
          "__makeTemplateObject": function __makeTemplateObject() {
            return (
              /* binding */
              _makeTemplateObject
            );
          },

          /* harmony export */
          "__importStar": function __importStar() {
            return (
              /* binding */
              _importStar
            );
          },

          /* harmony export */
          "__importDefault": function __importDefault() {
            return (
              /* binding */
              _importDefault
            );
          },

          /* harmony export */
          "__classPrivateFieldGet": function __classPrivateFieldGet() {
            return (
              /* binding */
              _classPrivateFieldGet
            );
          },

          /* harmony export */
          "__classPrivateFieldSet": function __classPrivateFieldSet() {
            return (
              /* binding */
              _classPrivateFieldSet
            );
          }
          /* harmony export */

        });
        /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.
        
        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.
        
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */

        /* global Reflect, Promise */


        var _extendStatics = function extendStatics(d, b) {
          _extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            }
          };

          return _extendStatics(d, b);
        };

        function _extends(d, b) {
          if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

          _extendStatics(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }

        var _assign2 = function _assign() {
          _assign2 = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];

              for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
            }

            return t;
          };

          return _assign2.apply(this, arguments);
        };

        function _rest(s, e) {
          var t = {};

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
          }

          if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
          }
          return t;
        }

        function _decorate(decorators, target, key, desc) {
          var c = arguments.length,
              r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
              d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          }
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        }

        function _param(paramIndex, decorator) {
          return function (target, key) {
            decorator(target, key, paramIndex);
          };
        }

        function _metadata(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
        }

        function _awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function (resolve) {
              resolve(value);
            });
          }

          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }

            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }

            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        }

        function _generator(thisArg, body) {
          var _ = {
            label: 0,
            sent: function sent() {
              if (t[0] & 1) throw t[1];
              return t[1];
            },
            trys: [],
            ops: []
          },
              f,
              y,
              t,
              g;
          return g = {
            next: verb(0),
            "throw": verb(1),
            "return": verb(2)
          }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
          }), g;

          function verb(n) {
            return function (v) {
              return step([n, v]);
            };
          }

          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");

            while (_) {
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];

                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                      value: op[1],
                      done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;

                  case 7:
                    op = _.ops.pop();

                    _.trys.pop();

                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }

                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }

                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }

                    if (t && _.label < t[2]) {
                      _.label = t[2];

                      _.ops.push(op);

                      break;
                    }

                    if (t[2]) _.ops.pop();

                    _.trys.pop();

                    continue;
                }

                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            }

            if (op[0] & 5) throw op[1];
            return {
              value: op[0] ? op[1] : void 0,
              done: true
            };
          }
        }

        var _createBinding = Object.create ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          Object.defineProperty(o, k2, {
            enumerable: true,
            get: function get() {
              return m[k];
            }
          });
        } : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        };

        function _exportStar(m, o) {
          for (var p in m) {
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) _createBinding(o, m, p);
          }
        }

        function _values(o) {
          var s = typeof Symbol === "function" && Symbol.iterator,
              m = s && o[s],
              i = 0;
          if (m) return m.call(o);
          if (o && typeof o.length === "number") return {
            next: function next() {
              if (o && i >= o.length) o = void 0;
              return {
                value: o && o[i++],
                done: !o
              };
            }
          };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }

        function _read(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m) return o;
          var i = m.call(o),
              r,
              ar = [],
              e;

          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
              ar.push(r.value);
            }
          } catch (error) {
            e = {
              error: error
            };
          } finally {
            try {
              if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
              if (e) throw e.error;
            }
          }

          return ar;
        }
        /** @deprecated */


        function _spread() {
          for (var ar = [], i = 0; i < arguments.length; i++) {
            ar = ar.concat(_read(arguments[i]));
          }

          return ar;
        }
        /** @deprecated */


        function _spreadArrays() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
            s += arguments[i].length;
          }

          for (var r = Array(s), k = 0, i = 0; i < il; i++) {
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
              r[k] = a[j];
            }
          }

          return r;
        }

        function _spreadArray(to, from, pack) {
          if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
          return to.concat(ar || Array.prototype.slice.call(from));
        }

        function _await(v) {
          return this instanceof _await ? (this.v = v, this) : new _await(v);
        }

        function _asyncGenerator(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []),
              i,
              q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
            return this;
          }, i;

          function verb(n) {
            if (g[n]) i[n] = function (v) {
              return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
          }

          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }

          function step(r) {
            r.value instanceof _await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }

          function fulfill(value) {
            resume("next", value);
          }

          function reject(value) {
            resume("throw", value);
          }

          function settle(f, v) {
            if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
          }
        }

        function _asyncDelegator(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function (e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function () {
            return this;
          }, i;

          function verb(n, f) {
            i[n] = o[n] ? function (v) {
              return (p = !p) ? {
                value: _await(o[n](v)),
                done: n === "return"
              } : f ? f(v) : v;
            } : f;
          }
        }

        function _asyncValues(o) {
          if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator],
              i;
          return m ? m.call(o) : (o = typeof _values === "function" ? _values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
            return this;
          }, i);

          function verb(n) {
            i[n] = o[n] && function (v) {
              return new Promise(function (resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }

          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
              resolve({
                value: v,
                done: d
              });
            }, reject);
          }
        }

        function _makeTemplateObject(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", {
              value: raw
            });
          } else {
            cooked.raw = raw;
          }

          return cooked;
        }

        ;

        var __setModuleDefault = Object.create ? function (o, v) {
          Object.defineProperty(o, "default", {
            enumerable: true,
            value: v
          });
        } : function (o, v) {
          o["default"] = v;
        };

        function _importStar(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) for (var k in mod) {
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) _createBinding(result, mod, k);
          }

          __setModuleDefault(result, mod);

          return result;
        }

        function _importDefault(mod) {
          return mod && mod.__esModule ? mod : {
            "default": mod
          };
        }

        function _classPrivateFieldGet(receiver, state, kind, f) {
          if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
        }

        function _classPrivateFieldSet(receiver, state, value, kind, f) {
          if (kind === "m") throw new TypeError("Private method is not writable");
          if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
        }
        /***/

      }
      /******/

    };
    /************************************************************************/

    /******/
    // The module cache

    /******/

    var __webpack_module_cache__ = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/
      // Check if module is in cache

      /******/
      var cachedModule = __webpack_module_cache__[moduleId];
      /******/

      if (cachedModule !== undefined) {
        /******/
        return cachedModule.exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = __webpack_module_cache__[moduleId] = {
        /******/
        // no module.id needed

        /******/
        // no module.loaded needed

        /******/
        exports: {}
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      /******/

      /******/
      // Return the exports of the module

      /******/


      return module.exports;
      /******/
    }
    /******/

    /************************************************************************/

    /******/

    /* webpack/runtime/define property getters */

    /******/


    !function () {
      /******/
      // define getter functions for harmony exports

      /******/
      __webpack_require__.d = function (exports, definition) {
        /******/
        for (var key in definition) {
          /******/
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            /******/
            Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key]
            });
            /******/
          }
          /******/

        }
        /******/

      };
      /******/

    }();
    /******/

    /******/

    /* webpack/runtime/hasOwnProperty shorthand */

    /******/

    !function () {
      /******/
      __webpack_require__.o = function (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      };
      /******/

    }();
    /******/

    /******/

    /* webpack/runtime/make namespace object */

    /******/

    !function () {
      /******/
      // define __esModule on exports

      /******/
      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

    }();
    /******/

    /************************************************************************/

    var __webpack_exports__ = {}; // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.

    !function () {
      /*!*******************************************************************************************************!*\
        !*** ./node_modules/@datana-smart/controls/fesm2015/datana-smart-controls-dtn-video-player-worker.js ***!
        \*******************************************************************************************************/
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _datana_smart_controls_dtn_video_player_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @datana-smart/controls/dtn-video-player-common */
      8984); /// <reference lib="webworker" />


      var logger;
      var drawService;
      addEventListener('message', function (event) {
        return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
          var data, options;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  data = event.data;
                  _context9.t0 = data.type;
                  _context9.next = _context9.t0 === 'init' ? 4 : _context9.t0 === 'canvasResize' ? 10 : 12;
                  break;

                case 4:
                  logger = new _datana_smart_controls_dtn_video_player_common__WEBPACK_IMPORTED_MODULE_1__.HttpDrawCanvasBaseLogger(data.payload.loggerOptions);
                  drawService = new _datana_smart_controls_dtn_video_player_common__WEBPACK_IMPORTED_MODULE_1__.DrawCanvasBaseService(logger);
                  options = data.payload.options;

                  data.payload.eventCallback = function (event) {
                    self.postMessage(event);
                  };

                  drawService.init(data.payload.canvas, options, data.payload.eventCallback);
                  return _context9.abrupt("break", 12);

                case 10:
                  drawService.canvasResize(data.payload.width, data.payload.height);
                  return _context9.abrupt("break", 12);

                case 12:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }));
      });
      /**
       * Generated bundle index. Do not edit.
       */
    }();
    /******/
  })();
})();
//# sourceMappingURL=482-es5.js.map