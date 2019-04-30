import { NgModule } from '@angular/core';
import { MomentPipe } from './momentjs/moment.pipe';
import { NewPipe } from './lowercase/lowercase';
import { CapitalizePipe } from './capitalize/capitalize';

export const pipes = [
	MomentPipe,
	NewPipe
  ];

@NgModule({
	declarations: [pipes,
    CapitalizePipe],
	imports: [],
	exports: [pipes,
    CapitalizePipe]
})
export class PipesModule {}