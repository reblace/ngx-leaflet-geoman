import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'leafletGeomanDemo',
	templateUrl: './leaflet-geoman-demo.component.html',
	standalone: false
})
export class LeafletGeomanDemoComponent implements OnInit {
	showDemo = false;

	ngOnInit() {
		setTimeout(() => {
			this.showDemo = true;
		}, 1000);
	}
}
