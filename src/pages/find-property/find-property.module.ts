import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPropertyPage } from './find-property';

@NgModule({
  declarations: [
    FindPropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPropertyPage),
  ],
})
export class FindPropertyPageModule {}
