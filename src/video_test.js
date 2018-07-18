import * as tf from '@tensorflow/tfjs';


let age_model;
let camera;


var $ = require("jquery");
const faceapi = require("face-api.js");

let minConfidence = 0.7;
let modelLoaded = false;

faceapi.loadFaceDetectionModel('./models')
faceapi.loadFaceLandmarkModel('./models')
console.log('start')

async function onPlay(videoEl) {
    if(videoEl.paused || videoEl.ended)
        console.log(videoEl)

    const { width, height } = faceapi.getMediaDimensions(videoEl)
    /*
    const width= camera.innerWidth()
    const height = camera.innerHeight()
    */

    const canvas = $('#overlay').get(0)
    canvas.width = width
    canvas.height = height

    const input = await faceapi.toNetInput(videoEl)
    const locations = await faceapi.locateFaces(input, minConfidence)

    var faceImages = await faceapi.extractFaces(input.inputs[0], locations)

    // detect landmarks and get the aligned face image bounding boxes
    const alignedFaceBoxes = await Promise.all(faceImages.map(
        async (faceCanvas, i) => {
            const faceLandmarks = await faceapi.detectLandmarks(faceCanvas)
            return faceLandmarks.align(locations[i])
        }
    ))
    faceImages = await faceapi.extractFaces(input.inputs[0], alignedFaceBoxes)

    // do things to each face
    const gender_tag = $('#gender')
    const age_tag = $('#age')
    faceImages.forEach(async (faceCanvas, i) => {
            const faceEl = $('#face')
            const ctx = canvas.getContext('2d')
            ctx.drawImage(faceCanvas, 0, 0)

            //expected input_1 to have shape [null,64,64,3] but got array with shape [1,244,237,3]
            var img = tf.fromPixels(faceCanvas)
            const size = Math.min(img.shape[0], img.shape[1]);
            const centerHeight = img.shape[0] / 2;
            const beginHeight = centerHeight - (size / 2);
            const centerWidth = img.shape[1] / 2;
            const beginWidth = centerWidth - (size / 2);
            img = img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
            img = img.resizeBilinear([64, 64])
            img = img.expandDims(0);
            img = img.toFloat();
            //img = img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1)); //Do not use this line 

            const results = age_model.predict(img)

            const predicted_genders = results[0].dataSync()
            if (predicted_genders[0] > 0.5) {
                gender_tag.text("Female")
                //console.log("Female")
            } else {
                gender_tag.text("Male")
                //console.log("Male")
            }
            
            const ages = tf.range(0, 101, 1).reshape([101, 1])
            const predicted_ages = results[1].dot(ages).flatten().dataSync()
            age_tag.text(predicted_ages[0] - 10)
            //console.log("How old: ", predicted_ages[0] - 10)
    })

    faceapi.drawDetection('overlay', locations.map(det => det.forSize(width, height)))

    setTimeout(() => onPlay(videoEl))
}

async function run() {
    age_model = await tf.loadModel('age_models/model.json');
    camera = $('#webcam')

    var cam = $('#webcam').get(0)
    onPlay(cam);
}

run()
