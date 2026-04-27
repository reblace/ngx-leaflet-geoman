# Cookbook

## Basic draw, edit, and delete

```typescript
@Component({
  template: `
    <div leaflet
         leafletGeoman
         [leafletOptions]="mapOptions"
         [leafletGeomanOptions]="geomanOptions"
         (leafletGeomanCreate)="onLayerCreated($event)"
         (leafletGeomanRemove)="onLayerRemoved($event)">
      <div [leafletLayer]="drawnItems"></div>
    </div>
  `
})
export class MapComponent {
  drawnItems = featureGroup();

  mapOptions = {
    layers: [ tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }) ],
    zoom: 5,
    center: latLng(46.88, -121.73)
  };

  geomanOptions = {
    position: 'topleft',
    drawPolygon: true,
    drawMarker: true,
    editMode: true,
    removalMode: true
  };

  onLayerCreated(e: any) {
    this.drawnItems.addLayer(e.layer);
  }

  onLayerRemoved(e: any) {
    console.log('Layer removed:', e.layer);
  }
}
```


## Marker icon setup

If you are using Angular CLI or Webpack, Leaflet's default marker icon URLs break at build time. The recommended fix is to pass an explicit icon via `leafletGeomanGlobalOptions`:

```typescript
import { icon } from 'leaflet';

geomanGlobalOptions = {
  markerStyle: {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    })
  }
};
```

```html
<div leaflet
     leafletGeoman
     [leafletOptions]="mapOptions"
     [leafletGeomanGlobalOptions]="geomanGlobalOptions">
</div>
```

You will also need to copy the Leaflet marker images into your build output. In `angular.json`:

```json
"assets": [
  {
    "glob": "*.png",
    "input": "node_modules/leaflet/dist/images/",
    "output": "assets/leaflet/"
  }
]
```

Alternatively, you can set Leaflet's default icon globally using `Icon.Default.mergeOptions()`. This affects all Leaflet markers in the app, not just those created by geoman:

```typescript
import { Icon } from 'leaflet';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: 'assets/leaflet/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});
```

For more background see the [Marker Setup](https://github.com/bluehalo/ngx-leaflet/blob/master/docs/cookbook.md#marker-setup) guide in the @bluehalo/ngx-leaflet cookbook.


## Accessing map.pm directly via the ready event

```typescript
import { PM } from 'leaflet';

pm: PM.PMMap;

onGeomanReady(pm: PM.PMMap) {
  this.pm = pm;
  // e.g. programmatically start drawing a polygon
  pm.enableDraw('Polygon');
}
```

```html
<div leaflet
     leafletGeoman
     [leafletOptions]="mapOptions"
     (leafletGeomanReady)="onGeomanReady($event)">
</div>
```


## Accessing map.pm directly via the directive reference

```html
<div leaflet
     leafletGeoman
     #geomanDir="leafletGeoman"
     [leafletOptions]="mapOptions">
</div>
```

```typescript
@ViewChild('geomanDir') geomanDir: LeafletGeomanDirective;

startDrawing() {
  this.geomanDir.getGeomanControls().enableDraw('Polygon');
}
```

## Listening to mode toggle events

```html
<div leaflet
     leafletGeoman
     [leafletOptions]="mapOptions"
     (leafletGeomanGlobalDrawModeToggled)="onDrawModeToggled($event)"
     (leafletGeomanGlobalEditModeToggled)="onEditModeToggled($event)">
</div>
```

```typescript
onDrawModeToggled(e: any) {
  console.log('Draw mode is now:', e.enabled);
}

onEditModeToggled(e: any) {
  console.log('Edit mode is now:', e.enabled);
}
```


## Snapping

Snapping is enabled by default in leaflet-geoman. To disable:

```typescript
geomanOptions = {
  snappable: false
};
```

To listen for snap events:

```html
<div leaflet
     leafletGeoman
     [leafletGeomanOptions]="geomanOptions"
     (leafletGeomanSnap)="onSnap($event)"
     (leafletGeomanUnsnap)="onUnsnap($event)">
</div>
```
