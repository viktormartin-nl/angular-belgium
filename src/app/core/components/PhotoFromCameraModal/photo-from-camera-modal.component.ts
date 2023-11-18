import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'photo-from-camera-modal',
  templateUrl: 'photo-from-camera-modal.component.html',
  styleUrls: ['photo-from-camera-modal.component.scss'],
})

export class PhotoFromCameraModal {
  constructor(
    public dialogRef: MatDialogRef<PhotoFromCameraModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onDialogClose(result: any): void {
    this.dialogRef.close(result);
  }

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  public isCapturing: boolean = true;

  sysImage = '';

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    this.isCapturing = !this.isCapturing;
    console.log(this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  // Crop the captured Image

  croppedImage: any = "";

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  exitDialog(state: boolean) {
    if (state) {
      let result = {
        state: state,
        type: this.data.type,
        result: this.croppedImage
      };
      this.onDialogClose(result);
    } else {
      let result = {
        state: state,
        type: this.data.type,
        multiple: this.data.multiple
      };
      this.onDialogClose(result);
    }
  }
}
