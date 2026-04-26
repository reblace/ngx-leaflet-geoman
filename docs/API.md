# API Reference

## LeafletGeomanModule

Import this module (alongside `LeafletModule`) to make the `[leafletGeoman]` directive available.

```typescript
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletGeomanModule } from '@bluehalo/ngx-leaflet-geoman';
```


## LeafletGeomanDirective

**Selector:** `[leafletGeoman]`

Place this attribute on the same element as `[leaflet]`.


### Inputs

| Input | Type | Description |
|-------|------|-------------|
| `leafletGeomanOptions` | `PM.ToolbarOptions` | Options passed to `map.pm.addControls()`. Controls which toolbar buttons are shown and their position. |
| `leafletGeomanGlobalOptions` | `PM.GlobalOptions` | Options passed to `map.pm.setGlobalOptions()`. Configures global drawing and editing behaviour, including `markerStyle` for marker icon setup. |


### Outputs

#### Ready

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanReady` | `PM.PMMap` | Emits the `map.pm` instance when the plugin is initialized. |

#### Draw lifecycle

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanDrawStart` | `LeafletEvent` | Drawing mode started (`pm:drawstart`). |
| `leafletGeomanDrawEnd` | `LeafletEvent` | Drawing mode ended (`pm:drawend`). |

#### Layer CRUD

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanCreate` | `LeafletEvent` | A layer was drawn and created (`pm:create`). |
| `leafletGeomanRemove` | `LeafletEvent` | A layer was removed (`pm:remove`). |
| `leafletGeomanEdit` | `LeafletEvent` | A layer was edited (`pm:edit`). |
| `leafletGeomanUpdate` | `LeafletEvent` | A layer was updated (`pm:update`). |
| `leafletGeomanChange` | `LeafletEvent` | A layer changed (`pm:change`). |

#### Vertex editing

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanVertexAdded` | `LeafletEvent` | A vertex was added (`pm:vertexadded`). |
| `leafletGeomanVertexRemoved` | `LeafletEvent` | A vertex was removed (`pm:vertexremoved`). |
| `leafletGeomanMarkerDragStart` | `LeafletEvent` | A vertex marker drag started (`pm:markerdragstart`). |
| `leafletGeomanMarkerDrag` | `LeafletEvent` | A vertex marker is being dragged (`pm:markerdrag`). |
| `leafletGeomanMarkerDragEnd` | `LeafletEvent` | A vertex marker drag ended (`pm:markerdragend`). |

#### Drag mode

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanDragStart` | `LeafletEvent` | Layer drag started (`pm:dragstart`). |
| `leafletGeomanDragEnd` | `LeafletEvent` | Layer drag ended (`pm:dragend`). |

#### Rotate mode

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanRotateEnable` | `LeafletEvent` | Rotate mode enabled on a layer (`pm:rotateenable`). |
| `leafletGeomanRotateDisable` | `LeafletEvent` | Rotate mode disabled on a layer (`pm:rotatedisable`). |
| `leafletGeomanRotateStart` | `LeafletEvent` | Rotation started (`pm:rotatestart`). |
| `leafletGeomanRotate` | `LeafletEvent` | Layer is rotating (`pm:rotate`). |
| `leafletGeomanRotateEnd` | `LeafletEvent` | Rotation ended (`pm:rotateend`). |

#### Cut mode

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanCut` | `LeafletEvent` | A layer was cut (`pm:cut`). |

#### Snap

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanSnap` | `LeafletEvent` | Snapped to a layer (`pm:snap`). |
| `leafletGeomanUnsnap` | `LeafletEvent` | Unsnapped from a layer (`pm:unsnap`). |

#### Global mode toggles

| Output | Payload | Description |
|--------|---------|-------------|
| `leafletGeomanGlobalDrawModeToggled` | `LeafletEvent` | Global draw mode toggled (`pm:globaldrawmodetoggled`). |
| `leafletGeomanGlobalEditModeToggled` | `LeafletEvent` | Global edit mode toggled (`pm:globaleditmodetoggled`). |
| `leafletGeomanGlobalRemovalModeToggled` | `LeafletEvent` | Global removal mode toggled (`pm:globalremovalmodetoggled`). |
| `leafletGeomanGlobalDragModeToggled` | `LeafletEvent` | Global drag mode toggled (`pm:globaldragmodetoggled`). |
| `leafletGeomanGlobalCutModeToggled` | `LeafletEvent` | Global cut mode toggled (`pm:globalcutmodetoggled`). |
| `leafletGeomanGlobalRotateModeToggled` | `LeafletEvent` | Global rotate mode toggled (`pm:globalrotatemodetoggled`). |


### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getGeomanControls()` | `PM.PMMap` | Returns the underlying `map.pm` instance for direct API access. |
