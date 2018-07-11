mkdir tfjs_model
rm tfjs_model/* -fr
tensorflowjs_converter --input_format keras keras_model.h5 tfjs_model
