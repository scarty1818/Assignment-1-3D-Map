 require([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "esri/widgets/Slider"
    ], (WebScene, SceneView, FeatureLayer, Slider) => {

      const webscene = new WebScene({
        portalItem: {
          id: "782185332d40456a9e1ea26be42749e5"
        }
      });

      const view = new SceneView({
        container: "viewDiv",
        map: webscene
      });

      const waterLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Water_bodies/FeatureServer",
        elevationInfo: {
          mode: "absolute-height",
          offset: 0,
        },
        renderer: {
          type: "simple",
          symbol: {
            type: "polygon-3d",
            symbolLayers: [{
              type: "water",
              waveDirection: 260,
              color: "#25427c",
              waveStrength: "moderate",
              waterbodySize: "medium"
            }]
          }
        }
      });

      webscene.add(waterLayer);

      view.ui.add("menu", "top-right");

      const slider = new Slider({
        container: "waveSlider",
        min: 0,
        max: 360,
        visibleElements: {
          labels: true,
        },
        precision: 0,
        values: [ 260 ]
      });

      slider.on("thumb-drag", (event) => {
        const value = parseInt(event.value);
        const renderer = waterLayer.renderer.clone();
        renderer.symbol.symbolLayers.getItemAt(0).waveDirection = value;
        waterLayer.renderer = renderer;
      });

      const waveStrengthRadio = document.getElementsByName("waveStrengthRadio");

      for (let i = 0; i < waveStrengthRadio.length; i++) {
        const element = waveStrengthRadio[i];
        element.addEventListener("change", (event) => {
          const renderer = waterLayer.renderer.clone();
          renderer.symbol.symbolLayers.getItemAt(0).waveStrength = event.target.value;
          waterLayer.renderer = renderer;
        });
      }

      function setWaterColor(color) {
        const renderer = waterLayer.renderer.clone();
        renderer.symbol.symbolLayers.getItemAt(0).color = color;
        waterLayer.renderer = renderer;
      }

      document.getElementById("navy").addEventListener("click", () => {
        setWaterColor("#25427c");
      });
      document.getElementById("green").addEventListener("click", () => {
        setWaterColor("#039962");
      });
      document.getElementById("turquoise").addEventListener("click", () => {
        setWaterColor("#a2f9f5");
      });
    });
