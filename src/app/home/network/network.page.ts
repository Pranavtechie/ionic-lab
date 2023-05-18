import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit, OnDestroy {

  networkListner: PluginListenerHandle;
  // status: ConnectionStatus;
  status: string;

  constructor(private ngZone: NgZone) { }

  async ngOnInit() {
    this.networkListner = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(() => {
        this.changeStatus(status);
      });
    });
    const status = await Network.getStatus();
    this.changeStatus(status);
    console.log('Network status:', this.status);
  }

  async changeStatus(status) {
    // this.status = status;
    this.status = status.connected ? 'Online' : 'Offline';
    await Toast.show({
      text: this.status
    });
  }

  ngOnDestroy(): void {
      if(this.networkListner) this.networkListner.remove();
  }

}
