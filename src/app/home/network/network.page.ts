import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit, OnDestroy {
  networkListner: PluginListenerHandle | undefined;
  status : ConnectionStatus | undefined | string
  // status : string | undefined;

  constructor(private ngZone : NgZone) { }
  async ngOnInit() {
    this.networkListner = Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      // this.status = status;
      this.ngZone.run(()=>{
        // this.status = status;
        this.status=status.connected?'Online':'Offline';

      });
    });
      const status = await Network.getStatus();
      this.status=status.connected?'Online':'Offline';

  console.log('Network status:', this.status);
  }
  ngOnDestroy(): void {
    // if(this.networkListner) this.networkListner.remove();
  }
}
