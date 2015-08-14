var helper = require('./helper');
var Simpleheat = require('../lib/simpleheat/simpleheat.js');

function drawHeatmapData(ctx, data, radius, blur, singlePointWeight) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var tmpCtx = helper.createContext2D(width, height);
    var simpleheat = new Simpleheat(tmpCtx.canvas);

    var heatData = [];
    var texCoord;
    for (var i = 0; i < data.length; i++) {
        texCoord = helper.lonLatToTexCoord(data[i][0], data[i][1]);
        heatData.push([ texCoord.x * width, texCoord.y * height, singlePointWeight ]);
    }

    simpleheat.data(heatData);
    simpleheat.radius(radius, blur);
    simpleheat.draw();

    ctx.drawImage(simpleheat._canvas, 0, 0);
}

module.exports = {
    drawHeatmapData: drawHeatmapData
};