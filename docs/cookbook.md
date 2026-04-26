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


## Accessing map.pm directly via the ready event

```typescript
pm: any;

onGeomanReady(pm: any) {
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

> **Note:** `exportAs: 'leafletGeoman'` needs to be added to the directive decorator to use template references. See the directive source.


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
