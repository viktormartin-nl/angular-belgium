import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'photo-from-folder-modal',
  templateUrl: 'photo-from-folder-modal.component.html',
  styleUrls: ['photo-from-folder-modal.component.scss'],
})

export class PhotoFromFolderModal {
  constructor(
    public dialogRef: MatDialogRef<PhotoFromFolderModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
