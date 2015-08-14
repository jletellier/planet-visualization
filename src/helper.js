'use strict';

function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

function lonLatToTexCoord(longitude, latitude) {
    var x = (longitude + 180) / 360;
    var y = (90 - latitude) / 180;

    return { x: x, y: y };
}

function texCoordToLonLat(x, y) {
    var longitude = (x * 360) - 180;
    var latitude = ((y * 180) - 90) * -1;

    return { lat: latitude, lon: longitude };
}

function lonLatToWorldCoord(longitude, latitude, earthRadius) {
    earthRadius = earthRadius || 0.500001;

    var lon = degr2rad(longitude);
    var lat = degr2rad(latitude);

    var x = earthRadius * Math.cos(lat) * Math.cos(lon);
    var y = earthRadius * Math.sin(lat);
    var z = -earthRadius * Math.cos(lat) * Math.sin(lon);

    return { x: x, y: y, z: z };
}

function worldCoordToLonLat(worldCoord, earthRadius) {
    earthRadius = earthRadius || 0.500001;

    var posX = worldCoord.x / earthRadius;
    var posY = worldCoord.y / earthRadius;
    var posZ = worldCoord.z / -earthRadius;

    var lon = Math.atan2(posZ, posX);
    var hyp = Math.sqrt(posX * posX + posZ * posZ);
    var lat = Math.atan2(posY, hyp);

    return [ rad2degr(lon), rad2degr(lat) ];
}

function getLonLatCenter(coordinates) {
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < coordinates.length; i++) {
        var worldCoord = lonLatToWorldCoord(coordinates[i][0], coordinates[i][1], 1);

        sumX += worldCoord.x;
        sumY += worldCoord.y;
        sumZ += worldCoord.z;
    }

    var avgX = sumX / coordinates.length;
    var avgY = sumY / coordinates.length;
    var avgZ = sumZ / coordinates.length;

    var lonLat = worldCoordToLonLat({ x: avgX, y: avgY, z: avgZ });

    return lonLat;
}

function createContext2D(width, height, insertDom) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    if (insertDom) {
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.margin = '0';
        canvas.style.padding = '0';
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';

        document.body.appendChild(canvas);
    }

    var ctx = canvas.getContext('2d');
    return ctx;
}

module.exports = {
    lonLatToTexCoord: lonLatToTexCoord,
    lonLatToWorldCoord: lonLatToWorldCoord,
    worldCoordToLonLat: worldCoordToLonLat,
    getLonLatCenter: getLonLatCenter,
    createContext2D: createContext2D
};