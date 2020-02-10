import React from "react"
exports.make_img = function(verb,word){

  const js = `

  const img_src = {
    see: "./assets/images/see_result.png",
    buy: "./assets/images/buy_result.png",
    go: "./assets/images/go_result.png",
    get: "",
  };

  let canvas = document.getElementById("canvas");
  canvas.height = 500;
  canvas.width = 700;
  let ctx = canvas.getContext("2d");

  let verb_img = new Image();
  verb_img.src = img_src[${verb}];
  verb_img.onload = () => ctx.drawImage(verb_img, 10, 30, verb_img.width, verb_img.height);

  let word_img = new Image;
  word_img.src = ${word};
  const w = 300;
  const h = word_img.height * 300 / word_img.width;
  word_img.onload = () => ctx.drawImage(word_img, 390, 30, w, h);

  const result = canvas.toDataURL();
  window.write(result);
  `
  this.setState({js: js})
  console.log(this.state.js)
}
