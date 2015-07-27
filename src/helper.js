function lonLatToTexCoord(longitude, latitude) {
    var x = (longitude + 180) / 360;
    var y = (90 - latitude) / 180;

    return { x: x, y: y };
}

function lonLatToWorldCoord(longitude, latitude) {
    var earthRadius = 0.500001;

    var lon = longitude * Math.PI / 180;
    var lat = latitude * Math.PI / 180;

    var x = earthRadius * Math.cos(lat) * Math.cos(lon);
    var y = earthRadius * Math.sin(lat);
    var z = -earthRadius * Math.cos(lat) * Math.sin(lon);

    return { x: x, y: y, z: z };
}

module.exports = {
    lonLatToTexCoord: lonLatToTexCoord,
    lonLatToWorldCoord: lonLatToWorldCoord
};