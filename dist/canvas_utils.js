define(["exports"], function (exports) {
  "use strict";

  var CanvasUtils = (function () {
    var CanvasUtils = function CanvasUtils() {};

    CanvasUtils.drawCircle = function (ctx, x, y, radius, color) {
      if (color === undefined) color = "white";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    };

    CanvasUtils.drawCircleOutline = function (ctx, x, y, radius, strokeWidth, color) {
      if (color === undefined) color = "black";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
    };

    CanvasUtils.drawText = function (ctx, x, y, text, font, color, align) {
      if (font === undefined) font = "lighter 25px helvetica neue";
      if (color === undefined) color = "black";
      if (align === undefined) align = "center";
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.lineWidth = 0.2;
      ctx.textAlign = align;
      ctx.fillText(text, x, y + 8); // Adjust for font height
    };

    CanvasUtils.drawLine = function (ctx, coordFrom, coordTo, lineWidth, directed, stroke, color) {
      if (stroke === undefined) stroke = true;
      if (color === undefined) color = "black";
      var midPoint = [coordFrom[0] + (coordTo[0] - coordFrom[0]) / 2, coordFrom[1] + (coordTo[1] - coordFrom[1]) / 2];

      ctx.beginPath();
      ctx.moveTo(coordFrom[0], coordFrom[1]);
      ctx.lineCap = "round";
      ctx.lineTo(coordTo[0], coordTo[1]);
      // ctx.quadraticCurveTo(coordFrom[0], coordFrom[1], midPoint[0], midPoint[1]);
      // ctx.quadraticCurveTo(midPoint[0], midPoint[1], coordTo[0], coordTo[1]);
      // Need to add code that draws an arrow when directed = True
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      if (stroke) {
        ctx.stroke();
      } else {
        ctx.closePath();
      }
      // ctx.stroke();
      // console.log("stroke")
    };

    return CanvasUtils;
  })();

  exports.CanvasUtils = CanvasUtils;
});