import { Directive, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

import '@geoman-io/leaflet-geoman-free';
import { LeafletEvent, Map as LeafletMap, PM } from 'leaflet';

import { LeafletDirective, LeafletDirectiveWrapper, LeafletUtil } from '@bluehalo/ngx-leaflet';

@Directive({
	selector: '[leafletGeoman]',
})
export class LeafletGeomanDirective
	implements OnInit, OnDestroy {

	leafletDirective: LeafletDirectiveWrapper;

	private map: LeafletMap;
	private readonly eventHandlers: Array<{ event: string; handler: (e: any) => void }> = [];

	@Input('leafletGeomanOptions') geomanOptions: PM.ToolbarOptions = null;
	@Input('leafletGeomanGlobalOptions') geomanGlobalOptions: PM.GlobalOptions = null;

	// Ready event — emits the map.pm object when the plugin is initialized
	@Output('leafletGeomanReady') geomanReady = new EventEmitter<PM.PMMap>();

	// Draw lifecycle
	@Output('leafletGeomanDrawStart') onDrawStart = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanDrawEnd') onDrawEnd = new EventEmitter<LeafletEvent>();

	// Layer CRUD
	@Output('leafletGeomanCreate') onCreate = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanRemove') onRemove = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanEdit') onEdit = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanUpdate') onUpdate = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanChange') onChange = new EventEmitter<LeafletEvent>();

	// Vertex editing
	@Output('leafletGeomanVertexAdded') onVertexAdded = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanVertexRemoved') onVertexRemoved = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanMarkerDragStart') onMarkerDragStart = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanMarkerDrag') onMarkerDrag = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanMarkerDragEnd') onMarkerDragEnd = new EventEmitter<LeafletEvent>();

	// Drag mode
	@Output('leafletGeomanDragStart') onDragStart = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanDragEnd') onDragEnd = new EventEmitter<LeafletEvent>();

	// Rotate mode
	@Output('leafletGeomanRotateEnable') onRotateEnable = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanRotateDisable') onRotateDisable = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanRotateStart') onRotateStart = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanRotate') onRotate = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanRotateEnd') onRotateEnd = new EventEmitter<LeafletEvent>();

	// Cut mode
	@Output('leafletGeomanCut') onCut = new EventEmitter<LeafletEvent>();

	// Snap
	@Output('leafletGeomanSnap') onSnap = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanUnsnap') onUnsnap = new EventEmitter<LeafletEvent>();

	// Global mode toggles
	@Output('leafletGeomanGlobalDrawModeToggled') onGlobalDrawModeToggled = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanGlobalEditModeToggled') onGlobalEditModeToggled = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanGlobalRemovalModeToggled') onGlobalRemovalModeToggled = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanGlobalDragModeToggled') onGlobalDragModeToggled = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanGlobalCutModeToggled') onGlobalCutModeToggled = new EventEmitter<LeafletEvent>();
	@Output('leafletGeomanGlobalRotateModeToggled') onGlobalRotateModeToggled = new EventEmitter<LeafletEvent>();

	constructor(leafletDirective: LeafletDirective, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
		this.leafletDirective.init();

		this.map = this.leafletDirective.getMap();

		if (null != this.geomanGlobalOptions) {
			this.map.pm.setGlobalOptions(this.geomanGlobalOptions);
		}

		this.map.pm.addControls(this.geomanOptions ?? {});

		// Draw lifecycle
		this.addEventHandler('pm:drawstart', (e) => LeafletUtil.handleEvent(this.zone, this.onDrawStart, e));
		this.addEventHandler('pm:drawend', (e) => LeafletUtil.handleEvent(this.zone, this.onDrawEnd, e));

		// Layer CRUD
		this.addEventHandler('pm:create', (e) => LeafletUtil.handleEvent(this.zone, this.onCreate, e));
		this.addEventHandler('pm:remove', (e) => LeafletUtil.handleEvent(this.zone, this.onRemove, e));
		this.addEventHandler('pm:edit', (e) => LeafletUtil.handleEvent(this.zone, this.onEdit, e));
		this.addEventHandler('pm:update', (e) => LeafletUtil.handleEvent(this.zone, this.onUpdate, e));
		this.addEventHandler('pm:change', (e) => LeafletUtil.handleEvent(this.zone, this.onChange, e));

		// Vertex editing
		this.addEventHandler('pm:vertexadded', (e) => LeafletUtil.handleEvent(this.zone, this.onVertexAdded, e));
		this.addEventHandler('pm:vertexremoved', (e) => LeafletUtil.handleEvent(this.zone, this.onVertexRemoved, e));
		this.addEventHandler('pm:markerdragstart', (e) => LeafletUtil.handleEvent(this.zone, this.onMarkerDragStart, e));
		this.addEventHandler('pm:markerdrag', (e) => LeafletUtil.handleEvent(this.zone, this.onMarkerDrag, e));
		this.addEventHandler('pm:markerdragend', (e) => LeafletUtil.handleEvent(this.zone, this.onMarkerDragEnd, e));

		// Drag mode
		this.addEventHandler('pm:dragstart', (e) => LeafletUtil.handleEvent(this.zone, this.onDragStart, e));
		this.addEventHandler('pm:dragend', (e) => LeafletUtil.handleEvent(this.zone, this.onDragEnd, e));

		// Rotate mode
		this.addEventHandler('pm:rotateenable', (e) => LeafletUtil.handleEvent(this.zone, this.onRotateEnable, e));
		this.addEventHandler('pm:rotatedisable', (e) => LeafletUtil.handleEvent(this.zone, this.onRotateDisable, e));
		this.addEventHandler('pm:rotatestart', (e) => LeafletUtil.handleEvent(this.zone, this.onRotateStart, e));
		this.addEventHandler('pm:rotate', (e) => LeafletUtil.handleEvent(this.zone, this.onRotate, e));
		this.addEventHandler('pm:rotateend', (e) => LeafletUtil.handleEvent(this.zone, this.onRotateEnd, e));

		// Cut mode
		this.addEventHandler('pm:cut', (e) => LeafletUtil.handleEvent(this.zone, this.onCut, e));

		// Snap
		this.addEventHandler('pm:snap', (e) => LeafletUtil.handleEvent(this.zone, this.onSnap, e));
		this.addEventHandler('pm:unsnap', (e) => LeafletUtil.handleEvent(this.zone, this.onUnsnap, e));

		// Global mode toggles
		this.addEventHandler('pm:globaldrawmodetoggled', (e) => LeafletUtil.handleEvent(this.zone, this.onGlobalDrawModeToggled, e));
		this.addEventHandler('pm:globaleditmodetoggled', (e) => LeafletUtil.handleEvent(this.zone, this.onGlobalEditModeToggled, e));
		this.addEventHandler('pm:globalremovalmodetoggled', (e) => LeafletUtil.handleEvent(this.zone, this.onGlobalRemovalModeToggled, e));
		this.addEventHandler('pm:globaldragmodetoggled', (e) => LeafletUtil.handleEvent(this.zone, this.onGlobalDragModeToggled, e));
		this.addEventHandler('pm:globalcutmodetoggled', (e) => LeafletUtil.handleEvent(this.zone, this.onGlobalCutModeToggled, e));
		this.addEventHandler('pm:globalrotatemodetoggled', (e) => LeafletUtil.handleEvent(this.zone, this.onGlobalRotateModeToggled, e));

		this.geomanReady.emit(this.map.pm);
	}

	ngOnDestroy() {
		this.eventHandlers.forEach(({ event, handler }) => this.map.off(event, handler));
		this.eventHandlers.length = 0;
		this.map.pm.removeControls();
	}

	private addEventHandler(event: string, handler: (e: any) => void) {
		this.map.on(event, handler);
		this.eventHandlers.push({ event, handler });
	}

	public getGeomanControls(): PM.PMMap {
		return this.map.pm;
	}

}
