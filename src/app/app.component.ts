import { Component } from '@angular/core';
import { LeafletGeomanDemoModule } from './leaflet-geoman/leaflet-geoman-demo.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ LeafletGeomanDemoModule ],
	templateUrl: './app.component.html',
})
export class AppComponent {
	// Empty component
}
