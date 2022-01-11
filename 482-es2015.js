/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 8984:
/*!********************************************************************************************************************!*\
  !*** ./node_modules/@datana-smart/controls/__ivy_ngcc__/fesm2015/datana-smart-controls-dtn-video-player-common.js ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransportService": function() { return /* binding */ BaseTransportService; },
/* harmony export */   "DEFAULT_PLAYER_OPTIONS": function() { return /* binding */ DEFAULT_PLAYER_OPTIONS; },
/* harmony export */   "DrawCanvasBaseService": function() { return /* binding */ DrawCanvasBaseService; },
/* harmony export */   "HttpDrawCanvasBaseLogger": function() { return /* binding */ HttpDrawCanvasBaseLogger; },
/* harmony export */   "HttpImgStreamTransportService": function() { return /* binding */ HttpImgStreamTransportService; },
/* harmony export */   "WebsocketTransportService": function() { return /* binding */ WebsocketTransportService; },
/* harmony export */   "transportFactory": function() { return /* binding */ transportFactory; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _datana_smart_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datana-smart/utils */ 5109);



class HttpDrawCanvasBaseLogger {
    constructor(options) {
        var _a, _b;
        this.options = Object.assign(Object.assign({}, options), { component: (_a = options === null || options === void 0 ? void 0 : options.component) !== null && _a !== void 0 ? _a : 'dtn-video-player' });
        if (!((_b = this.options) === null || _b === void 0 ? void 0 : _b.endpoint)) {
            console.warn('[dtn-video-player] No logging endpoint specified. No logs would be send');
        }
    }
    log(obj) {
        var _a;
        const message = `[dtn-video-player] ${obj.message}'`;
        if (this.options.debug) {
            if (obj.level === 'ERROR') {
                console.warn(message);
            }
            else {
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level: obj.level,
                message: `[Front] ${message}`,
                component: this.options.component,
                metricType: `${this.options.component}-${obj.metricType}`,
            }),
        });
    }
}

class BaseTransportService {
    constructor(logger, _options) {
        this.logger = logger;
        this._options = _options;
        this._meta = this._initialMeta();
    }
    get meta() {
        return Object.assign(Object.assign({}, this._meta), { connectionId: this._connectionId });
    }
    connect() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.resetMeta();
            this.meta.connectionId = Date.now().toString().slice(-8);
            this.logAtteptingConnect();
        });
    }
    disconnect() {
        this.resetMeta();
    }
    logAtteptingConnect() {
        this.logger.log({
            level: 'INFO',
            message: `Attepting to connect ${this.type} ${this.meta.connectionId}. url: ${this._options.endpoint}`,
            metricType: `${this.type}-attempting-to-connect`,
        });
    }
    logDisconnect() {
        this.logger.log({
            level: 'ERROR',
            message: `${this.type} ${this.meta.connectionId} disconnected. url:  ${this._options.endpoint}.
            Reconnect will be attempted in ${this._options.reconnectTimeout} ms`,
            metricType: `${this.type}-disconnected`,
        });
    }
    logRecieved(blob) {
        this.logger.log({
            level: 'INFO',
            message: `Recieved frame (size: ${blob === null || blob === void 0 ? void 0 : blob.size}) from websocket: ${this.meta.connectionId}`,
            metricType: 'frame-recieved',
        });
    }
    logConnected() {
        this.logger.log({
            level: 'INFO',
            message: `Connected to ${this.type} ${this.meta.connectionId}. url: ${this._options.endpoint}`,
            metricType: `${this.type}-connected`,
        });
    }
    _initialMeta() {
        return {
            stats: {
                frameId: 0,
                recievedFPS: 0,
                drawnFPS: 0,
                recieved: 0,
                errored: 0,
                skipped: 0,
                drawn: 0,
            },
        };
    }
    resetMeta() {
        this._meta = this._initialMeta();
    }
}

class HttpImgStreamTransportService extends BaseTransportService {
    constructor(logger, _options, _drawCallback) {
        super(logger, _options);
        this.logger = logger;
        this._drawCallback = _drawCallback;
        this._imageBuffer = [];
        this._isBuffering = false;
        this.type = 'http-img-stream';
    }
    connect() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield _super.connect.call(this);
            this._imageBuffer = [];
            this._abortController = new AbortController();
            const signal = this._abortController.signal;
            try {
                const req = fetch(this._options.endpoint, {
                    signal: signal,
                });
                const response = yield req;
                this.logConnected();
                const reader = response.body.getReader();
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const { value, done } = yield reader.read();
                    if (done)
                        break;
                    if (signal.aborted)
                        break;
                    this.readImg(value, (readyImgBuffer) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
                        const blob = new Blob([readyImgBuffer]);
                        this.logRecieved(blob);
                        yield this._drawCallback(blob, this.meta);
                    }));
                }
            }
            catch (e) {
                this._imageBuffer = [];
                this.logDisconnect();
                setTimeout(() => {
                    this.connect();
                }, this._options.reconnectTimeout);
            }
        });
    }
    disconnect() {
        var _a;
        super.disconnect();
        (_a = this._abortController) === null || _a === void 0 ? void 0 : _a.abort();
    }
    readImg(value, cb) {
        let i = 0;
        while (i < value.length) {
            if (i < value.length - 2) {
                // New image
                if (value[i] === 255 && value[i + 1] === 216) {
                    this._imageBuffer = [];
                    this._isBuffering = true;
                }
                // End image
                if (value[i] === 255 && value[i + 1] === 217) {
                    this._imageBuffer.push(value[i]);
                    this._imageBuffer.push(value[i + 1]);
                    const arr = new Uint8Array(this._imageBuffer);
                    cb(arr);
                    this._imageBuffer = [];
                    this._isBuffering = false;
                    i++;
                }
                else {
                    if (this._isBuffering) {
                        this._imageBuffer.push(value[i]);
                    }
                }
            }
            else {
                if (this._isBuffering) {
                    this._imageBuffer.push(value[i]);
                }
            }
            i++;
        }
        // Protect buffer
        if (this._imageBuffer.length > 4000000) {
            this._imageBuffer = [];
        }
    }
}

class WebsocketTransportService extends BaseTransportService {
    constructor(logger, _options, _drawCallback) {
        super(logger, _options);
        this.logger = logger;
        this._drawCallback = _drawCallback;
        this.type = 'websocket';
    }
    connect() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield _super.connect.call(this);
            const ws = new WebSocket(this._options.endpoint);
            this._currentWs = ws;
            ws.onopen = () => {
                this.logConnected();
                ws.onmessage = (data) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
                    this.logRecieved(data.data);
                    yield this._drawCallback(data.data, this.meta);
                });
            };
            ws.onclose = () => {
                // TODO: do not recconect on manual disconnect;
                this.logDisconnect();
                setTimeout(() => {
                    this.connect();
                }, this._options.reconnectTimeout);
            };
        });
    }
    disconnect() {
        super.disconnect();
        this._currentWs.close();
    }
}

const transportFactory = (logger, options, drawCallback) => {
    switch (options.transport) {
        case 'http-img-stream':
            return new HttpImgStreamTransportService(logger, options, drawCallback);
        case 'websocket':
        default:
            return new WebsocketTransportService(logger, options, drawCallback);
    }
};

class DrawCanvasBaseService {
    constructor(logger) {
        this.logger = logger;
        this._isDrawing = false;
    }
    get inited() {
        return !!this._canvas;
    }
    init(canvas, options, eventCallback) {
        if (!canvas) {
            throw new Error('[dtn-video-player] No canvas specified!');
        }
        this._canvas = canvas;
        this._context = canvas.getContext('2d', { alpha: false });
        this._options = options;
        this._transport = transportFactory(this.logger, options, this.tryDraw.bind(this));
        this._transport.connect();
        // notify UI if there is no frames recieved in 5 sec https://jira.datana.ru/browse/NKR-2429
        if (this._options.noFramesTimeout === false) {
            return;
        }
        else if (typeof this._options.noFramesTimeout === 'number' &&
            this._options.noFramesTimeout > 0) {
            this._timeoutTimer = new _datana_smart_utils__WEBPACK_IMPORTED_MODULE_1__.DtnTimeoutTimer();
            this._timeoutTimer.start(this._options.noFramesTimeout, (isRecieving) => {
                eventCallback({
                    type: 'frames_recieving_state_changed',
                    payload: isRecieving,
                });
            });
        }
    }
    canvasResize(width, height) {
        if (!this._canvas) {
            return;
        }
        this._canvas.width = width;
        this._canvas.height = height;
    }
    dispose() {
        var _a;
        this._fpsInterval && clearInterval(this._fpsInterval);
        (_a = this._timeoutTimer) === null || _a === void 0 ? void 0 : _a.stop();
        this._transport.disconnect();
    }
    tryDraw(source, transportMeta) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this._timeoutTimer.bounce();
            if (this._options.overlayStats) {
                this._fpsCounter(transportMeta.stats);
            }
            transportMeta.stats.frameId++;
            transportMeta.stats.recieved++;
            if (!this.inited) {
                console.warn('[dtn-video-player] Service must be inited before draw!');
                return;
            }
            if (this._isDrawing) {
                transportMeta.stats.skipped++;
                this.logger.log({
                    level: 'INFO',
                    message: `Skip frame ${transportMeta.stats.frameId || ''} draw (another in process) (size: ${source === null || source === void 0 ? void 0 : source.size}). Websocket: ${transportMeta.connectionId}`,
                    metricType: 'frame-skip',
                });
                return;
            }
            this._isDrawing = true;
            requestAnimationFrame(() => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
                var _a;
                try {
                    yield this._drawToCanvas(source, transportMeta);
                    transportMeta.stats.drawn++;
                    this.logger.log({
                        level: 'INFO',
                        message: `Drawn frame ${transportMeta.stats.frameId || ''} (size: ${(_a = source) === null || _a === void 0 ? void 0 : _a.size}). Websocket: ${transportMeta.connectionId}`,
                        metricType: 'frame-drawn',
                    });
                }
                catch (e) {
                    transportMeta.stats.errored++;
                    this.logger.log({
                        level: 'ERROR',
                        message: `Failed to draw frame ${transportMeta.stats.frameId || ''} (size: ${source === null || source === void 0 ? void 0 : source.size}). Websocket: ${transportMeta.connectionId} \n Error: ${e === null || e === void 0 ? void 0 : e.message}`,
                        metricType: 'frame-draw-error',
                    });
                    throw e;
                }
                finally {
                    this._isDrawing = false;
                }
            }));
        });
    }
    _drawToCanvas(source, transportMeta) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            if (typeof createImageBitmap !== 'undefined') {
                const img = yield createImageBitmap(source);
                this._scaleAndDrawImage(img, transportMeta.stats);
                //@ts-ignore
            }
            else if (typeof Image !== 'undefined') {
                const url = URL.createObjectURL(source);
                //@ts-ignore
                const img = new Image();
                img.onload = function () {
                    // @ts-ignore
                    this._scaleAndDrawImage(img, transportMeta.stats);
                }.bind(this);
                img.src = url;
                //@ts-ignore
            }
            else {
                throw new Error("No available drawing mechanism. Tried 'createImageBitmap' and 'Image'!");
            }
            /* eslint-enable @typescript-eslint/ban-ts-comment */
        });
    }
    /**
     *  Scale image to canvas size and draw image
     *
     * @private
     * @param {ImageBitmap} img
     * @memberof DrawCanvasService
     */
    _scaleAndDrawImage(img, stats) {
        const hRatio = this._canvas.width / img.width;
        const vRatio = this._canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        this._context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
        if (this._context.fillText && this._options.overlayStats) {
            this._context.fillStyle = 'red';
            let yPos = 20;
            this._context.fillText(stats.frameId.toString(), 10, yPos);
            yPos += 30;
            this._context.fillStyle = 'yellow';
            this._context.fillText(`Получено FPS: ${stats.recievedFPS}`, 10, yPos);
            yPos += 30;
            this._context.fillStyle = 'lime';
            this._context.fillText(`Отрисовано FPS: ${stats.drawnFPS}`, 10, yPos);
            yPos += 30;
            this._context.fillStyle = 'yellow';
            this._context.fillText(`Пропущено: ${stats.skipped}`, 10, yPos);
            yPos += 30;
            this._context.fillStyle = 'red';
            this._context.fillText(`Ошибок: ${stats.errored}`, 10, yPos);
        }
    }
    _fpsCounter(stats) {
        if (stats.frameId === 0) {
            this._fpsInterval && clearInterval(this._fpsInterval);
            this._fpsInterval = setInterval(() => {
                stats.recievedFPS = stats.recieved;
                stats.drawnFPS = stats.recieved;
                stats.recieved = 0;
                stats.drawn = 0;
            }, 1000);
        }
    }
}

const DEFAULT_PLAYER_OPTIONS = {
    transport: 'websocket',
    endpoint: '',
    reconnectTimeout: 1000,
    noFramesTimeout: 5000,
    aspectRatio: '4/3',
    overlayStats: false,
    locales: {
        framesNotRecieving: 'Конфликт входных данных',
    },
    scaleToViewport: true
};

/**
 * Generated bundle index. Do not edit.
 */





/***/ }),

/***/ 5109:
/*!**************************************************************************************!*\
  !*** ./node_modules/@datana-smart/utils/__ivy_ngcc__/fesm2015/datana-smart-utils.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DtnTimeoutTimer": function() { return /* binding */ DtnTimeoutTimer; }
/* harmony export */ });
/**
 *
 * notify UI if there is no data recieved in 5 sec
 * https://jira.datana.ru/browse/NKR-2429, https://jira.datana.ru/browse/NKR-2539
 *
 * @export
 * @class DtnTimeoutTimer
 */
class DtnTimeoutTimer {
    constructor() {
        this._dataRecieving = false;
    }
    start(timeout, changeStateCallback) {
        if (typeof timeout !== 'number' && timeout < 1000) {
            throw new Error('[DtnTimeoutTimer] Timeout must be number and not less then 1s');
        }
        if (this._interval) {
            throw new Error("[DtnTimeoutTimer] You can't start timer twice. Use another instanse of timer.");
        }
        this._interval = setInterval(() => {
            this._dataRecieving = !!this._lastRecieved && Date.now() - this._lastRecieved < timeout;
            // state changed
            if (this._prevDataRecieving !== this._dataRecieving) {
                this._prevDataRecieving = this._dataRecieving;
                changeStateCallback(this._prevDataRecieving);
            }
        }, 500);
    }
    bounce() {
        this._lastRecieved = Date.now();
    }
    stop() {
        clearInterval(this._interval);
    }
}

/**
 * Generated bundle index. Do not edit.
 */





/***/ }),

/***/ 3786:
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": function() { return /* binding */ __extends; },
/* harmony export */   "__assign": function() { return /* binding */ __assign; },
/* harmony export */   "__rest": function() { return /* binding */ __rest; },
/* harmony export */   "__decorate": function() { return /* binding */ __decorate; },
/* harmony export */   "__param": function() { return /* binding */ __param; },
/* harmony export */   "__metadata": function() { return /* binding */ __metadata; },
/* harmony export */   "__awaiter": function() { return /* binding */ __awaiter; },
/* harmony export */   "__generator": function() { return /* binding */ __generator; },
/* harmony export */   "__createBinding": function() { return /* binding */ __createBinding; },
/* harmony export */   "__exportStar": function() { return /* binding */ __exportStar; },
/* harmony export */   "__values": function() { return /* binding */ __values; },
/* harmony export */   "__read": function() { return /* binding */ __read; },
/* harmony export */   "__spread": function() { return /* binding */ __spread; },
/* harmony export */   "__spreadArrays": function() { return /* binding */ __spreadArrays; },
/* harmony export */   "__spreadArray": function() { return /* binding */ __spreadArray; },
/* harmony export */   "__await": function() { return /* binding */ __await; },
/* harmony export */   "__asyncGenerator": function() { return /* binding */ __asyncGenerator; },
/* harmony export */   "__asyncDelegator": function() { return /* binding */ __asyncDelegator; },
/* harmony export */   "__asyncValues": function() { return /* binding */ __asyncValues; },
/* harmony export */   "__makeTemplateObject": function() { return /* binding */ __makeTemplateObject; },
/* harmony export */   "__importStar": function() { return /* binding */ __importStar; },
/* harmony export */   "__importDefault": function() { return /* binding */ __importDefault; },
/* harmony export */   "__classPrivateFieldGet": function() { return /* binding */ __classPrivateFieldGet; },
/* harmony export */   "__classPrivateFieldSet": function() { return /* binding */ __classPrivateFieldSet; }
/* harmony export */ });
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@datana-smart/controls/fesm2015/datana-smart-controls-dtn-video-player-worker.js ***!
  \*******************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _datana_smart_controls_dtn_video_player_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datana-smart/controls/dtn-video-player-common */ 8984);



/// <reference lib="webworker" />
let logger;
let drawService;
addEventListener('message', (event) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(void 0, void 0, void 0, function* () {
    const data = event.data;
    switch (data.type) {
        case 'init':
            logger = new _datana_smart_controls_dtn_video_player_common__WEBPACK_IMPORTED_MODULE_1__.HttpDrawCanvasBaseLogger(data.payload.loggerOptions);
            drawService = new _datana_smart_controls_dtn_video_player_common__WEBPACK_IMPORTED_MODULE_1__.DrawCanvasBaseService(logger);
            const options = data.payload.options;
            data.payload.eventCallback = (event) => {
                self.postMessage(event);
            };
            drawService.init(data.payload.canvas, options, data.payload.eventCallback);
            break;
        case 'canvasResize':
            drawService.canvasResize(data.payload.width, data.payload.height);
            break;
    }
}));

/**
 * Generated bundle index. Do not edit.
 */

}();
/******/ })()
;
//# sourceMappingURL=482-es2015.js.map