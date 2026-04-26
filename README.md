# @bluehalo/ngx-leaflet-geoman

> Angular components for [Leaflet Geoman](https://geoman.io) — draw, edit, drag, rotate, cut, and snap geometries.

[![NPM version](https://img.shields.io/npm/v/%40bluehalo%2Fngx-leaflet-geoman)](https://www.npmjs.com/package/@bluehalo/ngx-leaflet-geoman)
[![CI](https://github.com/bluehalo/ngx-leaflet-geoman/actions/workflows/ci.yml/badge.svg)](https://github.com/bluehalo/ngx-leaflet-geoman/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bluehalo/ngx-leaflet-geoman/branch/master/graph/badge.svg)](https://codecov.io/gh/bluehalo/ngx-leaflet-geoman)

## Table of Contents

- [Install](#install)
- [Configure](#configure)
- [API](#api)
- [Cookbook](#cookbook)
- [Contribute](#contribute)
- [License](#license)


## Install

```shell
npm install leaflet @bluehalo/ngx-leaflet @geoman-io/leaflet-geoman-free @bluehalo/ngx-leaflet-geoman
```

Include the Leaflet and Leaflet Geoman CSS in your `angular.json` styles array:

```json
"styles": [
  "node_modules/leaflet/dist/leaflet.css",
  "node_modules/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
]
```


## Configure

Import `LeafletGeomanModule` alongside `LeafletModule`:

```typescript
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletGeomanModule } from '@bluehalo/ngx-leaflet-geoman';

@NgModule({
  imports: [
    LeafletModule,
    LeafletGeomanModule
  ]
})
export class AppModule { }
```

Add the `leafletGeoman` directive to your map element:

```html
<div leaflet
     leafletGeoman
     [leafletOptions]="mapOptions"
     [leafletGeomanOptions]="geomanOptions"
     (leafletGeomanCreate)="onLayerCreated($event)"
     (leafletGeomanEdit)="onLayerEdited($event)">
</div>
```


## API

See [docs/API.md](docs/API.md) for the full reference.


## Cookbook

See [docs/cookbook.md](docs/cookbook.md) for common usage patterns.


## Contribute

PRs and issues welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) if one exists, or open an issue to discuss changes first.


## License

[MIT](LICENSE)
