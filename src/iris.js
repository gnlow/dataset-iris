'use strict';

import dataset from "./iris.json.js"
import cvSetsK7 from "./cvSetsK7.json.js"
import cvSetsK5 from "./cvSetsK5.json.js"

function getDataset() {
  return dataset.slice();
}

function getNumbers() {
  return dataset.map((d) => d.slice(0, 4));
}

function getClasses() {
  return dataset.map((d) => d[4]);
}

function getDistinctClasses() {
  return ['setosa', 'versicolor', 'virginica'];
}

function getCrossValidationSets(k, options) {
  const { idx = 0, by = 'folds' } = options;
  var res;
  k === 7 ? (res = cvSetsK7[idx]) : [];
  k === 5 ? (res = cvSetsK5[idx]) : [];
  if (k !== 7 && k !== 5) {
    throw new Error(`k must be 7 or 5`);
  }

  switch (by) {
    case 'folds':
      {
        res = res.map((x) => x.map((y) => y - 1));
      }
      break;
    case 'trainTest': {
      res = res.map((x) => x.map((y) => y - 1));
      let folds = [];
      for (let cv of res) {
        let testCv = [];
        for (let j = 0; j < 150; j++) {
          if (!cv.includes(j)) {
            testCv.push(j);
          }
        }
        folds.push({ testIndex: testCv, trainIndex: cv });
      }
      res = folds;
      break;
    }
    default: {
      throw new Error(`unknown "by" option: ${by}`);
    }
  }
  return res;
}

export {
  getDataset,
  getNumbers,
  getClasses,
  getDistinctClasses,
  getCrossValidationSets,
};
