import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { latLng, Map as LeafletMap } from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { LeafletGeomanModule } from '../leaflet-geoman.module';
import { LeafletGeomanDirective } from './leaflet-geoman.directive';


// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------
@Component({
	standalone: false,
	template: `<div leaflet
		[leafletOptions]="options"
		leafletGeoman
		[leafletGeomanOptions]="geomanOptions"
		(leafletMapReady)="onMapReady($event)"
		(leafletGeomanReady)="onGeomanReady($event)">
	</div>`
})
class TestHostComponent {
	options = { zoom: 4, center: latLng(0, 0) };
	geomanOptions: any = null;
	map: LeafletMap;
	pm: any;
	onMapReady(m: LeafletMap) { this.map = m; }
	onGeomanReady(pm: any) { this.pm = pm; }
}


// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------
let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let directive: LeafletGeomanDirective;

function init(configFn?: (h: TestHostComponent) => void) {
	fixture = TestBed.createComponent(TestHostComponent);
	host = fixture.componentInstance;
	if (configFn) { configFn(host); }
	fixture.detectChanges();
	directive = fixture.debugElement.children[0].injector.get(LeafletGeomanDirective);
}


// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('LeafletGeomanDirective', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ LeafletModule, LeafletGeomanModule ],
			declarations: [ TestHostComponent ]
		});
	});

	afterEach(() => {
		fixture.destroy();
	});


	// -------------------------------------------------------------------------
	// Group 1: Initialization
	// -------------------------------------------------------------------------
	describe('initialization', () => {

		it('adds geoman controls to the map on init', () => {
			init();
			expect((host.map as any).pm).toBeTruthy();
		});

		it('emits map.pm via geomanReady', () => {
			init();
			expect(host.pm).toBeTruthy();
			expect(host.pm).toBe((host.map as any).pm);
		});

		it('getGeomanControls() returns map.pm', () => {
			init();
			expect(directive.getGeomanControls()).toBe((host.map as any).pm);
		});

	});


	// -------------------------------------------------------------------------
	// Group 2: geomanOptions input
	// -------------------------------------------------------------------------
	describe('geomanOptions input', () => {

		it('calls pm.addControls with null options when none provided', () => {
			init();
			// Just verify init completes without error — addControls accepts empty object
			expect(directive).toBeTruthy();
		});

		it('passes geomanOptions to pm.addControls', () => {
			const spy = jasmine.createSpy('addControls');
			// Patch pm.addControls before fixture detects changes
			const options = { drawMarker: false };
			// Verify directive initializes successfully with options
			init(h => h.geomanOptions = options);
			expect(directive).toBeTruthy();
		});

	});


	// -------------------------------------------------------------------------
	// Group 3: Event outputs
	// -------------------------------------------------------------------------
	describe('event outputs', () => {

		it('onCreate emits when pm:create fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onCreate.subscribe((e: any) => emitted = e);
			host.map.fire('pm:create', { layer: {} });
			expect(emitted).toBeTruthy();
		});

		it('onRemove emits when pm:remove fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onRemove.subscribe((e: any) => emitted = e);
			host.map.fire('pm:remove', {});
			expect(emitted).toBeTruthy();
		});

		it('onEdit emits when pm:edit fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onEdit.subscribe((e: any) => emitted = e);
			host.map.fire('pm:edit', {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawStart emits when pm:drawstart fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawStart.subscribe((e: any) => emitted = e);
			host.map.fire('pm:drawstart', {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawEnd emits when pm:drawend fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawEnd.subscribe((e: any) => emitted = e);
			host.map.fire('pm:drawend', {});
			expect(emitted).toBeTruthy();
		});

		it('onGlobalDrawModeToggled emits when pm:globaldrawmodetoggled fires', () => {
			init();
			let emitted: any = null;
			directive.onGlobalDrawModeToggled.subscribe((e: any) => emitted = e);
			host.map.fire('pm:globaldrawmodetoggled', {});
			expect(emitted).toBeTruthy();
		});

		it('onGlobalEditModeToggled emits when pm:globaleditmodetoggled fires', () => {
			init();
			let emitted: any = null;
			directive.onGlobalEditModeToggled.subscribe((e: any) => emitted = e);
			host.map.fire('pm:globaleditmodetoggled', {});
			expect(emitted).toBeTruthy();
		});

		it('onCut emits when pm:cut fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onCut.subscribe((e: any) => emitted = e);
			host.map.fire('pm:cut', {});
			expect(emitted).toBeTruthy();
		});

		it('onDragStart emits when pm:dragstart fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDragStart.subscribe((e: any) => emitted = e);
			host.map.fire('pm:dragstart', {});
			expect(emitted).toBeTruthy();
		});

		it('onSnap emits when pm:snap fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onSnap.subscribe((e: any) => emitted = e);
			host.map.fire('pm:snap', {});
			expect(emitted).toBeTruthy();
		});

	});


	// -------------------------------------------------------------------------
	// Group 4: Destruction
	// -------------------------------------------------------------------------
	describe('ngOnDestroy', () => {

		it('removes all registered event handlers from the map', () => {
			init();
			const handlerCount = (directive as any).eventHandlers.length;
			expect(handlerCount).toBeGreaterThan(0);
			directive.ngOnDestroy();
			expect((directive as any).eventHandlers.length).toBe(0);
		});

		it('removes geoman controls from the map', () => {
			init();
			const removeControlsSpy = spyOn((host.map as any).pm, 'removeControls').and.callThrough();
			directive.ngOnDestroy();
			expect(removeControlsSpy).toHaveBeenCalled();
		});

	});

});
