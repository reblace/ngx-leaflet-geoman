import { Component } from '@angular/core';

import { featureGroup, FeatureGroup, latLng, tileLayer } from 'leaflet';

@Component({
	selector: 'leafletGeomanCoreDemo',
	templateUrl: './core-demo.component.html',
	standalone: false
})
export class LeafletGeomanCoreDemoComponent {

	drawnItems: FeatureGroup = featureGroup();

	options = {
		layers: [
			tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 5,
		center: latLng({ lat: 46.879966, lng: -121.726909 })
	};

	geomanOptions: any = {
		position: 'topleft',
		drawMarker: true,
		drawPolyline: true,
		drawRectangle: true,
		drawPolygon: true,
		drawCircle: true,
		drawCircleMarker: true,
		editMode: true,
		dragMode: true,
		cutPolygon: true,
		removalMode: true,
		rotateMode: true
	};

	public onGeomanCreate(e: any) {
		console.log('Geoman Create Event!', e);
		this.drawnItems.addLayer(e.layer);
	}

	public onGeomanRemove(e: any) {
		console.log('Geoman Remove Event!', e);
	}

	public onGeomanEdit(e: any) {
		console.log('Geoman Edit Event!', e);
	}

	public onGeomanDrawStart(e: any) {
		console.log('Geoman Draw Start Event!', e);
	}

}
