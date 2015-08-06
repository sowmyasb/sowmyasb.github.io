
function Employee() {
  this.id = 1;
  var ar = [];
  for (var i = 0; i < 100; i++) {
    ar.push(i);
  }
  this.ar = ar;
}


var rightCol = 10000;
var leftCol = 50;
var ar1;
var ar2;

function setUp() {
  ar1 = new Array(leftCol);
  ar2 = new Array(rightCol);
  for (var i = 0; i < leftCol; i++) {
    ar1[i] = new Employee();
  }
  for (var i = 0; i < rightCol; i++) {
    ar2[i] = new Employee();
  }
}

function blockedNestedLoop() {
  var sum = 0;
  var blockSize = 200;
  var bk = 0;
  var ceil = Math.ceil(rightCol / blockSize);
  for (; bk < ceil; bk++) {
    for (var i = 0; i < leftCol; i++) {
      for (var j = bk * blockSize;
          j < (bk + 1) * blockSize && j < rightCol; j++) {
        if (ar1[i].id == ar2[j].id) {
          sum += 1;
        }
      }
    }
  }
}


function nestedLoop() {
  var sum = 0;
  for (var i = 0; i < leftCol; i++) {
    for (var j = 0; j < rightCol; j++) {
      if (ar1[i].id == ar2[j].id) {
        sum++;
      }
    }
  }
}


function runMany(fn, times) {
  var start = window.performance.now();
  for (var i = 0; i < times; i++) {
    fn();
  }
  return (window.performance.now() - start);
}


function testNestedLoop() {
  return runMany(nestedLoop, 2000);
}


function testBlockedNestedLoop() {
  return runMany(blockedNestedLoop, 2000);
}
