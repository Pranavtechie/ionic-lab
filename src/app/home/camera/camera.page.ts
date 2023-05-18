import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
// import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  selectImage: any;

  constructor() { }

  ngOnInit() {
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web') return true;
    return false;
  }

  async getPhoto() {
    const status = await Camera.requestPermissions();
    console.log('status: ', status);
    if(status.camera != 'granted' || status.photos != 'granted') return;
    const image = await Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      source: CameraSource.Prompt,
      width: 600,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    console.log('image: ', image);
    // this.selectImage = image.webPath;
    this.selectImage = image.path;

    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
    let shareRet = await Share.share({
      title: 'Image Sharing',
      // text: 'Share this Image',
      url: this.selectImage,
      // dialogTitle: 'Image Sharing',
    });
  }

}
