mapboxgl.accessToken = 'pk.eyJ1IjoibmltZmE0NDAwIiwiYSI6ImNrdWcybzQyZTFqaHQyeG10dWo5MzQ5a2kifQ.SGFaxu_8iazsffda8R2DAA';
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/light-v10",
    center: [-87.661557, 41.893748],
    zoom: 10.7
});
map.addControl(new mapboxgl.NavigationControl());