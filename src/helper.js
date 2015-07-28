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
    createContext2D: createContext2D
};