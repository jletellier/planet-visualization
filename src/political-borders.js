var helper = require('./helper');

function getFeaturesByContinent(features, continentName) {
    var selected = [];

    for (var i = 0; i < features.length; i++) {
        if (continentName === features[i].properties.continent) {
            selected.push(features[i]);
        }
    }

    return selected;
}

function drawFeature(ctx, feature, fill, stroke) {
    var geometry = feature.geometry;
    var geometryCoord = geometry.coordinates;

    if (geometry.type === 'MultiPolygon') {
        for (var i = 0; i < geometryCoord.length; i++) {
            drawCanvas2DPath(ctx, geometryCoord[i], fill, stroke);
        }
    }
    else {
        drawCanvas2DPath(ctx, geometryCoord, fill, stroke);
    }
}

function drawFeatures(ctx, features, fill, stroke) {
    for (var i = 0; i < features.length; i++) {
        drawFeature(ctx, features[i], fill, stroke);
    }
}

function drawCanvas2DPath(ctx, geometryCoord, fill, stroke) {
    createCanvas2DPath(ctx, geometryCoord);

    if (fill === undefined || fill === null || fill) ctx.fill();
    if (stroke === undefined || stroke === null || stroke) ctx.stroke();
}

function createCanvas2DPath(ctx, geometryCoord) {
    ctx.beginPath();

    for (var iOuter = 0; iOuter < geometryCoord.length; iOuter++) {
        for (var iInner = 0; iInner < geometryCoord[iOuter].length; iInner++) {
            var lon = geometryCoord[iOuter][iInner][0];
            var lat = geometryCoord[iOuter][iInner][1];

            var texCoord = helper.lonLatToTexCoord(lon, lat);
            var x = texCoord.x * ctx.canvas.width;
            var y = texCoord.y * ctx.canvas.height;

            if (!iOuter && !iInner) {
                ctx.moveTo(x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
        }
    }

    ctx.closePath();
}

module.exports = {
    getFeaturesByContinent: getFeaturesByContinent,
    drawFeature: drawFeature,
    drawFeatures: drawFeatures
};