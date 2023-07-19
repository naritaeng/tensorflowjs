const tf = require("@tensorflow/tfjs");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");
const fs = require("fs");
const app = express();
const port = 3000;

const _path = path.join(__dirname, "/");
app.use("/", express.static(_path));

/* 저장을 위한 디스크 스토리지 엔진 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, _path); // 경로를 같은 폴더로 지정
  },
  filename: function (req, file, cb) {
    const fix = Buffer.from(file.originalname, "latin1").toString("utf-8");
    cb(null, fix);
    //cb(null, file.fieldname + '-' + Date.now())
  },
});

const upload = multer({ storage: storage }); // 멀터의 옵션을 디스크스토리지 엔진 탑제

app.post("/up", upload.single("ufile"), (req, res) => {
  console.log(req.file);
  res.send(
    `<script>alert('파일 업로드 완료!');location.replace('index.html')</script>`
  );
});

app.listen(port, () => {
  console.log(port + "에서 서버 동작 중");
});

/* 원시데이터 */
const trainData = {
  sizeMB: [
    0.08, 9.0, 0.001, 0.1, 8.0, 5.0, 0.1, 6.0, 0.05, 0.5, 0.002, 2.0, 0.005,
    10.0, 0.01, 7.0, 6.0, 5.0, 1.0, 1.0,
  ],
  timeSec: [
    0.135, 0.739, 0.067, 0.126, 0.646, 0.435, 0.069, 0.497, 0.068, 0.116, 0.07,
    0.289, 0.076, 0.744, 0.083, 0.56, 0.48, 0.399, 0.153, 0.149,
  ],
};
const testData = {
  sizeMB: [
    5.0, 0.2, 0.001, 9.0, 0.002, 0.02, 0.008, 4.0, 0.001, 1.0, 0.005, 0.08, 0.8,
    0.2, 0.05, 7.0, 0.005, 0.002, 8.0, 0.008,
  ],
  timeSec: [
    0.425, 0.098, 0.052, 0.686, 0.066, 0.078, 0.07, 0.375, 0.058, 0.136, 0.052,
    0.063, 0.183, 0.087, 0.066, 0.558, 0.066, 0.068, 0.61, 0.057,
  ],
};

/* 데이터를 텐서로 변환 */
const shapeV = [20, 1];

const trainTensors = {
  sizeMB: tf.tensor2d(trainData.sizeMB, shapeV),
  timeSec: tf.tensor2d(trainData.timeSec, shapeV),
};

const testTensors = {
  sizeMB: tf.tensor2d(testData.sizeMB, shapeV),
  timeSec: tf.tensor2d(testData.timeSec, shapeV),
};

/* 모델생성 */
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
model.compile({ optimizer: "sgd", loss: "meanAbsoluteError" }); // 경사하강법

/* 모델훈련 */
model
  .fit(trainTensors.sizeMB, trainTensors.timeSec, {
    epochs: 200,
    callbacks: {
      onEpochEnd: (e, l) => {
        console.log("epoch:", e, l);
      },
    },
  })
  .then(() => {
    /* 모델평가 */
    model.evaluate(testTensors.sizeMB, testTensors.timeSec).print();
  })
  .then(() => {
    /* 예측 */
    model.predict(tf.tensor2d([[req.file]])).print(1);
  });
