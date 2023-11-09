import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  ) {}

  onDialogClose(result: any): void {
    this.dialogRef.close(result);
  }

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();

  sysImage = '';

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  exitDialog ( state : boolean ) {
    if ( state ) {
      this.onDialogClose(this.sysImage);
    } else {
      this.onDialogClose('');
    }
  }
}
