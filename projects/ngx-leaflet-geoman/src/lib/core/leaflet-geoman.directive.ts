import { Directive, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

import '@geoman-io/leaflet-geoman-free';
import { Map as LeafletMap, PM } from 'leaflet';

import { LeafletDirective, LeafletDirectiveWrapper, LeafletUtil } from '@bluehalo/ngx-leaflet';

@Directive({
	selector: '[leafletGeoman]',
	exportAs: 'leafletGeoman',
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
	@Output('leafletGeomanDrawStart') onDrawStart = new EventEmitter<Parameters<PM.DrawStartEventHandler>[0]>();
	@Output('leafletGeomanDrawEnd') onDrawEnd = new EventEmitter<Parameters<PM.DrawEndEventHandler>[0]>();

	// Layer CRUD
	@Output('leafletGeomanCreate') onCreate = new EventEmitter<Parameters<PM.CreateEventHandler>[0]>();
	@Output('leafletGeomanRemove') onRemove = new EventEmitter<Parameters<PM.RemoveEventHandler>[0]>();
	@Output('leafletGeomanEdit') onEdit = new EventEmitter<Parameters<PM.EditEventHandler>[0]>();
	@Output('leafletGeomanUpdate') onUpdate = new EventEmitter<Parameters<PM.UpdateEventHandler>[0]>();
	@Output('leafletGeomanChange') onChange = new EventEmitter<Parameters<PM.ChangeEventHandler>[0]>();

	// Vertex editing
	@Output('leafletGeomanVertexAdded') onVertexAdded = new EventEmitter<Parameters<PM.VertexAddedEventHandler>[0]>();
	@Output('leafletGeomanVertexRemoved') onVertexRemoved = new EventEmitter<Parameters<PM.VertexRemovedEventHandler>[0]>();
	@Output('leafletGeomanMarkerDragStart') onMarkerDragStart = new EventEmitter<Parameters<PM.MarkerDragStartEventHandler>[0]>();
	@Output('leafletGeomanMarkerDrag') onMarkerDrag = new EventEmitter<Parameters<PM.MarkerDragEventHandler>[0]>();
	@Output('leafletGeomanMarkerDragEnd') onMarkerDragEnd = new EventEmitter<Parameters<PM.MarkerDragEndEventHandler>[0]>();

	// Drag mode
	@Output('leafletGeomanDragStart') onDragStart = new EventEmitter<Parameters<PM.DragStartEventHandler>[0]>();
	@Output('leafletGeomanDragEnd') onDragEnd = new EventEmitter<Parameters<PM.DragEndEventHandler>[0]>();

	// Rotate mode
	@Output('leafletGeomanRotateEnable') onRotateEnable = new EventEmitter<Parameters<PM.RotateEnableEventHandler>[0]>();
	@Output('leafletGeomanRotateDisable') onRotateDisable = new EventEmitter<Parameters<PM.RotateDisableEventHandler>[0]>();
	@Output('leafletGeomanRotateStart') onRotateStart = new EventEmitter<Parameters<PM.RotateStartEventHandler>[0]>();
	@Output('leafletGeomanRotate') onRotate = new EventEmitter<Parameters<PM.RotateEventHandler>[0]>();
	@Output('leafletGeomanRotateEnd') onRotateEnd = new EventEmitter<Parameters<PM.RotateEndEventHandler>[0]>();

	// Cut mode
	@Output('leafletGeomanCut') onCut = new EventEmitter<Parameters<PM.CutEventHandler>[0]>();

	// Snap
	@Output('leafletGeomanSnap') onSnap = new EventEmitter<Parameters<PM.SnapEventHandler>[0]>();
	@Output('leafletGeomanUnsnap') onUnsnap = new EventEmitter<Parameters<PM.SnapEventHandler>[0]>();

	// Global mode toggles
	@Output('leafletGeomanGlobalDrawModeToggled') onGlobalDrawModeToggled = new EventEmitter<Parameters<PM.GlobalDrawModeToggledEventHandler>[0]>();
	@Output('leafletGeomanGlobalEditModeToggled') onGlobalEditModeToggled = new EventEmitter<Parameters<PM.GlobalEditModeToggledEventHandler>[0]>();
	@Output('leafletGeomanGlobalRemovalModeToggled') onGlobalRemovalModeToggled = new EventEmitter<Parameters<PM.GlobalRemovalModeToggledEventHandler>[0]>();
	@Output('leafletGeomanGlobalDragModeToggled') onGlobalDragModeToggled = new EventEmitter<Parameters<PM.GlobalDragModeToggledEventHandler>[0]>();
	@Output('leafletGeomanGlobalCutModeToggled') onGlobalCutModeToggled = new EventEmitter<Parameters<PM.GlobalCutModeToggledEventHandler>[0]>();
	@Output('leafletGeomanGlobalRotateModeToggled') onGlobalRotateModeToggled = new EventEmitter<Parameters<PM.GlobalRotateModeToggledEventHandler>[0]>();

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
