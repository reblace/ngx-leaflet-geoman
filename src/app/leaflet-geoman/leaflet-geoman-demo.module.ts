import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { LeafletGeomanModule } from '../../../projects/ngx-leaflet-geoman/src/lib/leaflet-geoman.module';

import { LeafletGeomanDemoComponent } from './leaflet-geoman-demo.component';
import { LeafletGeomanCoreDemoComponent } from './core/core-demo.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LeafletModule,
		LeafletGeomanModule
	],
	declarations: [
		LeafletGeomanDemoComponent,
		LeafletGeomanCoreDemoComponent
	],
	exports: [
		LeafletGeomanDemoComponent
	],
	bootstrap: [ LeafletGeomanDemoComponent ],
	providers: [ ]
})
export class LeafletGeomanDemoModule { }
