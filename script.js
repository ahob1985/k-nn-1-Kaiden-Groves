// Author:

// Global UI Variables
let canvasDiv;

let canvas;

let textDiv;

let textP;

let textP2;

let buttonDiv;

let upButton;

let downButton;

let leftButton;

let rightButton;
//let canvasDiv;

// Global ML variables
let featureExtractor;

let imgFeatures;

let knnClassifier;

let video;

let isModelReady;

let ups;

let downs;

let lefts;

let rights;
//let featureExtractor;

function setup() {
  textP2 = createP("[Training data here.]");

  textP2.parent(textDiv);
}

function draw() {
  if(isModelReady) {

    translate(width, 0);

    scale(-1, 1);

    image(video, 0, 0);

    imgFeatures = featureExtractor.infer(canvas);

    if(knnClassifier.getNumLabels() > 0) {

      knnClassifier.classify(imgFeatures, gotResults);

    }

  }
}

function buildButtons() {
  upButton = createButton("Up");

  upButton.parent(buttonDiv);

  upButton.mousePressed(function () {

  ups++;

  textP2.html("Ups: " + ups + " - Downs: " + downs + " - Lefts: " + lefts +

  " - Rights: " + rights);

  knnClassifier.addExample(imgFeatures, "Up");

  });
}

function videoReady() {
  featureExtractor = ml5.featureExtractor("MobileNet", featureExtractorLoaded);
}

function featureExtractorLoaded() {
  knnClassifier = ml5.KNNClassifier();
  textP.html("Begin posing and adding data!");

  buttonDiv.style("display", "block");  
}

function gotResults(error, results) {
  textP.html("Label: " + results.label);
}
