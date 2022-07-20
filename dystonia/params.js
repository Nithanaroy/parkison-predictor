const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_RADIUS = 4;

const VIDEO_SIZE = {
    '640 X 480': { width: 640, height: 480 },
    '640 X 360': { width: 640, height: 360 },
    '360 X 270': { width: 360, height: 270 }
};

const BLAZEPOSE_CONFIG = {
    maxPoses: 1,
    type: 'full',
    scoreThreshold: 0.65,
    render3D: true
};
const POSENET_CONFIG = {
    maxPoses: 1,
    scoreThreshold: 0.5
};
const MOVENET_CONFIG = {
    maxPoses: 1,
    type: 'lightning',
    scoreThreshold: 0.3,
    customModel: '',
    enableTracking: false
};

const STATE = {
    "camera": { "targetFPS": 60, "sizeOption": "640 X 480" }, 
    "backend": "tfjs-webgl", 
    "flags": { "WEBGL_VERSION": 2, "WEBGL_CPU_FORWARD": true, "WEBGL_PACK": true, "WEBGL_FORCE_F16_TEXTURES": false, "WEBGL_RENDER_FLOAT32_CAPABLE": true, "WEBGL_FLUSH_THRESHOLD": -1 }, 
    "modelConfig": { ...MOVENET_CONFIG }, 
    "model": "MoveNet"
}

/**
 * This map descripes tunable flags and theior corresponding types.
 *
 * The flags (keys) in the map satisfy the following two conditions:
 * - Is tunable. For example, `IS_BROWSER` and `IS_CHROME` is not tunable,
 * because they are fixed when running the scripts.
 * - Does not depend on other flags when registering in `ENV.registerFlag()`.
 * This rule aims to make the list streamlined, and, since there are
 * dependencies between flags, only modifying an independent flag without
 * modifying its dependents may cause inconsistency.
 * (`WEBGL_RENDER_FLOAT32_CAPABLE` is an exception, because only exposing
 * `WEBGL_FORCE_F16_TEXTURES` may confuse users.)
 */
const TUNABLE_FLAG_VALUE_RANGE_MAP = {
    WEBGL_VERSION: [1, 2],
    WASM_HAS_SIMD_SUPPORT: [true, false],
    WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
    WEBGL_CPU_FORWARD: [true, false],
    WEBGL_PACK: [true, false],
    WEBGL_FORCE_F16_TEXTURES: [true, false],
    WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
    WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    CHECK_COMPUTATION_FOR_ERRORS: [true, false],
};

const BACKEND_FLAGS_MAP = {
    ['tfjs-wasm']: ['WASM_HAS_SIMD_SUPPORT', 'WASM_HAS_MULTITHREAD_SUPPORT'],
    ['tfjs-webgl']: [
        'WEBGL_VERSION', 'WEBGL_CPU_FORWARD', 'WEBGL_PACK',
        'WEBGL_FORCE_F16_TEXTURES', 'WEBGL_RENDER_FLOAT32_CAPABLE',
        'WEBGL_FLUSH_THRESHOLD'
    ],
    ['mediapipe-gpu']: []
};

const MODEL_BACKEND_MAP = {
    [poseDetection.SupportedModels.PoseNet]: ['tfjs-webgl'],
    [poseDetection.SupportedModels.MoveNet]: ['tfjs-webgl', 'tfjs-wasm'],
    [poseDetection.SupportedModels.BlazePose]: ['mediapipe-gpu', 'tfjs-webgl']
}

const TUNABLE_FLAG_NAME_MAP = {
    PROD: 'production mode',
    WEBGL_VERSION: 'webgl version',
    WASM_HAS_SIMD_SUPPORT: 'wasm SIMD',
    WASM_HAS_MULTITHREAD_SUPPORT: 'wasm multithread',
    WEBGL_CPU_FORWARD: 'cpu forward',
    WEBGL_PACK: 'webgl pack',
    WEBGL_FORCE_F16_TEXTURES: 'enforce float16',
    WEBGL_RENDER_FLOAT32_CAPABLE: 'enable float32',
    WEBGL_FLUSH_THRESHOLD: 'GL flush wait time(ms)'
};

const params = {
    DEFAULT_LINE_WIDTH, DEFAULT_RADIUS, VIDEO_SIZE, STATE, BLAZEPOSE_CONFIG, POSENET_CONFIG, MOVENET_CONFIG, TUNABLE_FLAG_VALUE_RANGE_MAP, BACKEND_FLAGS_MAP, MODEL_BACKEND_MAP, TUNABLE_FLAG_NAME_MAP
}