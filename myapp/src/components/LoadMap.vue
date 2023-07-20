<template></template>

<script>
import L from 'leaflet';
import '../../public/leaflet-providers-added-onemap.js';

export default {
    mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      // 在这里编写你的 Leaflet 地图初始化代码
      var baseMaps = {
        Default: L.tileLayer.provider('OneMap.Default'),
        Original: L.tileLayer.provider('OneMap.Original'),
        Night: L.tileLayer.provider('OneMap.Night'),
        Grey: L.tileLayer.provider('OneMap.Grey'),
      };
      var map = L.map('mapdiv').setView([1.3521, 103.8198], 13);
      L.tileLayer.provider('OneMap.Grey').addTo(map);
      L.control.layers(baseMaps).addTo(map);
    },
  },
};
</script>

<style></style>