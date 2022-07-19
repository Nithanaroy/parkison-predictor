/**
 * User can upload a video file and get the results
 * This is no longer in use though and is not maintained
 */

async function updateVideo(event) {
    // Clear reference to any previous uploaded video.
    URL.revokeObjectURL(camera.video.currentSrc);
    const file = event.target.files[0];
    camera.source.src = URL.createObjectURL(file);

    // Wait for video to be loaded.
    camera.video.load();
    await new Promise((resolve) => {
        camera.video.onloadeddata = () => {
            resolve(video);
        };
    });

    const videoWidth = camera.video.videoWidth;
    const videoHeight = camera.video.videoHeight;
    // Must set below two lines, otherwise video element doesn't show.
    camera.video.width = videoWidth;
    camera.video.height = videoHeight;
    // camera.canvas.width = videoWidth;
    // camera.canvas.height = videoHeight;

    result.innerHTML = 'Video is loaded.';
}

class Context {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('output');
        this.source = document.getElementById('currentVID');
        // this.ctx = this.canvas.getContext('2d');
        const stream = this.canvas.captureStream();
        const options = { mimeType: 'video/webm; codecs=vp9' };
        this.mediaRecorder = new MediaRecorder(stream, options);
        // this.mediaRecorder.ondataavailable = this.handleDataAvailable;
    }

    start() {
        this.mediaRecorder.start();
    }

    stop() {
        this.mediaRecorder.stop();
    }
}

async function runFrame() {
    if (video.paused) {
        // video has finished.
        camera.mediaRecorder.stop();
        // camera.clearCtx();
        // camera.video.style.visibility = 'visible';
        return;
    }
    // await renderResult();
    await hands.send({ image: camera.video });
    rafId = requestAnimationFrame(runFrame);
}

async function run() {

    camera.video.style.visibility = 'hidden';
    video.pause();
    video.currentTime = 0;
    video.play();
    camera.mediaRecorder.start();

    await new Promise((resolve) => {
        camera.video.onseeked = () => {
            resolve(video);
        };
    });

    await runFrame();
}

function extractTestLandmarks(multiHandWorldLandmarks) {
    const results = {}
    for (const handLandmark of multiHandWorldLandmarks) {
        results["thumb"] = [handLandmark[4]['x'], handLandmark[4]['y']]
        results["index"] = [handLandmark[8]['x'], handLandmark[8]['y']]
    }
    return results;
}

function init() {
    hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });
    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    hands.onResults(results => {
        result.innerHTML = JSON.stringify(extractTestLandmarks(results.multiHandWorldLandmarks), null, 2)
    });

    camera = new Context();

    const runButton = document.getElementById('submit');
    runButton.onclick = run;

    const uploadButton = document.getElementById('videofile');
    uploadButton.onchange = updateVideo;
}