import * as tf from '@tensorflow/tfjs'

let model;

async function run() {
    model = await tf.loadModel("/keras_experiment/tfjs_model/model.json")

    var r = model.predict(tf.tensor2d([[5.0, 5.0]]))
    r.print()
    r = r.dataSync()
    console.log(r[0])

    const ages = tf.range(0, 101, 1).reshape([101, 1])
    console.log(ages.dataSync())
}

run()
