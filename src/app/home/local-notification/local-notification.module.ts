import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalNotificationPageRoutingModule } from './local-notification-routing.module';

import { LocalNotificationPage } from './local-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalNotificationPageRoutingModule
  ],
  declarations: [LocalNotificationPage]
})
export class LocalNotificationPageModule {}
