module.exports = function ParseLocation(latitude, longitude) {
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    return location;
}