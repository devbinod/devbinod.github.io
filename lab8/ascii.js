"use strict";


let counter = 0;
let timerInterval;
let delayMs = 250;
let frames;
let frameArr;

$(document).ready(function () {

    
  $("#btn_stop_animation").prop("disabled", true);

  $("#btn_start_animation").click(function () {
    startAnimation();
  });

  $("#size").change(function () {
    if ($("#btn_start_animation").prop("disabled")) {
      startAnimation();
    }
  });

  $("#animationType").change(function () {
    if ($("#btn_start_animation").prop("disabled")) {
      startAnimation();
    }
  });

  $('#turboSpeed').change(function() {
        startAnimation();
  })
});

function startAnimation() {
  let animationType = $("#animationType").val();
  frames = ANIMATIONS[animationType];
  frameArr = frames.split("=====\n");
  playAnimation();
  changeSize();
  $("#btn_start_animation").prop("disabled", true);
  $("#btn_stop_animation").prop("disabled", false);
}

function changeSize() {
  const size = $("#size").val();
  $("#textArea").css("fontSize", size);
}


function playAnimation() {
  clearInterval(timerInterval);
  var isTurbo = $("#turboSpeed").prop("checked");

  if (isTurbo) {
    delayMs = 50;
  } else {
    delayMs = 250;
  }
  timerInterval = setInterval(animateDiagram, delayMs);
}

function animateDiagram() {
  if (counter >= frameArr.length) {
    counter = 0;
  } else {
    $("#textArea").val(frameArr[counter]);
    counter++;
  }
}
