import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'photo-from-folder-modal',
  templateUrl: 'photo-from-folder-modal.component.html',
  styleUrls: ['photo-from-folder-modal.component.scss'],
})

export class PhotoFromFolderModal {
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PhotoFromFolderModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public isCaptured: boolean = false;

  onDialogClose(result: any): void {
    this.dialogRef.close(result);
  }

  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isCaptured = true;
  }
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

  exitDialog ( state : boolean ) {
    if ( state ) {
      this.onDialogClose(this.croppedImage);
    } else {
      this.onDialogClose('');
    }
  }
}
