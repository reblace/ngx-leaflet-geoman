import { NgModule } from '@angular/core';

import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { LeafletGeomanDirective } from './core/leaflet-geoman.directive';

@NgModule({
	imports: [
		LeafletModule,
		LeafletGeomanDirective
	],
	exports: [
		LeafletGeomanDirective
	]
})
export class LeafletGeomanModule {

}
