const tf = require("@tensorflow/tfjs");

const model = tf.sequential(); // 1. 순차적 API 모델
model.add(tf.layers.dense({ units: 8, inputShape: 2, activation: "tanh" })); // 2. 레이어 생성 및 추가, inputShape : 인풋 모양(입력받는 수), units : 다음 엣지로 전달될 갯수
model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

model.compile({ loss: "binaryCrossentropy", optimizer: "adam" }); // 3. 로스함수와 옵티마이저, 경험적 선택

const xs = tf.tensor2d(
  // 4. 데이터를 텐서로 전환
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  [4, 2]
);
const ys = tf.tensor2d([0, 0, 0, 1], [4, 1]);

const fitParm = {
  batchSize: 32, // (number) Number of samples per gradient update. If unspecified, it will default to
  epochs: 3000,
  callbacks: {
    onEpochEnd: (epoch, logs) => {
      console.log("epoch", epoch, logs, "RMSE=>", Math.sqrt(logs.loss));
    },
  },
};

model.fit(xs, ys, fitParm).then(() => {
  // 5. 모델을 핏하기
  model.predict(tf.tensor2d([[0, 1]], [1, 2])).print(); // 6. 예측하기
});

// 문제1. sequential API를 활용하여 AND회로의 진리표를 이해하고
// 순차적API모델에 레이어와 활성화 함수를 이용하여 만들어진 모델을
// 3000회 fit하고, 1과 0일때의 결과를 predict(예측)하고 출력해라.
