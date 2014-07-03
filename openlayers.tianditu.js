
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions
        );
    },

    trigger: function(e) {
        var lonlat = map.getLonLatFromPixel(e.xy);
        alert("You clicked near " + lonlat.lat + " N, " +
                                  + lonlat.lon + " E");
    }

});

map = new OpenLayers.Map({
    div: 'map',
    projection: "EPSG:4326",
    numZoomLevels: 10 ,
    panMethod: null ,
    center:new OpenLayers.LonLat(120.29,31.59)
});

var normal = new OpenLayers.Layer.WMTS({
    name: "天地图-普通",
    url: "http://t0.tianditu.com/vec_c/wmts",
    format: "tiles",
    layer: "vec",
    style: "default",
    matrixSet: "c",
    isBaseLayer: true,
});

var normal_annotation = new OpenLayers.Layer.WMTS({
    name: "天地图-普通注记",
    url: "http://t1.tianditu.com/cva_c/wmts",
    format: "tiles",
    layer: "cva",
    style: "default",
    transparent: true,
    matrixSet: "c",
    isBaseLayer: false,
});

var satellite = new OpenLayers.Layer.WMTS({
    name: "天地图-影像",
    url: "http://t7.tianditu.com/img_c/wmts",
    format: "tiles",
    layer: "img",
    style: "default",
    matrixSet: "c",
    isBaseLayer: true,
});

var satellite_annotation = new OpenLayers.Layer.WMTS({
    name: "天地图-影像注记",
    url: "http://t0.tianditu.com/cia_c/wmts",
    format: "tiles",
    layer: "cia",
    style: "default",
    matrixSet: "c",
    isBaseLayer: false,
});

var terrain = new OpenLayers.Layer.WMTS({
    name: "天地图-地形",
    url: "http://t0.tianditu.com/ter_c/wmts",
    format: "tiles",
    layer: "ter",
    style: "default",
    matrixSet: "c",
    isBaseLayer: true,
});

var terrain_annotation = new OpenLayers.Layer.WMTS({
    name: "天地图-地形注记",
    url: "http://t0.tianditu.com/cta_c/wmts",
    format: "tiles",
    layer: "cta",
    style: "default",
    matrixSet: "c",
    isBaseLayer: false,
});

map.addControl(new OpenLayers.Control.Navigation());
// map.addControl(new OpenLayers.Control.LayerSwitcher({'div':OpenLayers.Util.getElement('layerswitcher')}));
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.addLayers([normal,normal_annotation,satellite,satellite_annotation,terrain,terrain_annotation]);
var click = new OpenLayers.Control.Click();
map.addControl(click);
map.zoomToMaxExtent();

click.activate();
