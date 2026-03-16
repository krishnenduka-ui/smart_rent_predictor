import * as tf from "@tensorflow/tfjs";

let model;

export const trainModel = async (properties) => {

  const xs = properties.map(p => [
    p.sqft,
    p.bedrooms,
    p.bathrooms,
    p.amenities.length,
    p.neighbourhoods.length,
    p.rating
  ]);

  const ys = properties.map(p => p.price);

  const xTensor = tf.tensor2d(xs);
  const yTensor = tf.tensor2d(ys, [ys.length, 1]);

  model = tf.sequential();

  model.add(tf.layers.dense({
    units: 16,
    inputShape: [6],
    activation: "relu"
  }));

  model.add(tf.layers.dense({
    units: 8,
    activation: "relu"
  }));

  model.add(tf.layers.dense({
    units: 1
  }));

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: "meanSquaredError"
  });

  await model.fit(xTensor, yTensor, {
    epochs: 200
  });

};

export const predictRent = (data) => {

  const input = tf.tensor2d([[
    data.sqft,
    data.bedrooms,
    data.bathrooms,
    data.amenities,
    data.neighbourhoods,
    data.rating
  ]]);

  const prediction = model.predict(input);

  return prediction.dataSync()[0];
};