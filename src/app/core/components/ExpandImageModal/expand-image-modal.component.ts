import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'photo-from-folder-modal',
  templateUrl: 'expand-image-modal.component.html',
  styleUrls: ['expand-image-modal.component.scss'],
})

export class ExpandImageModal {
  constructor(
    public dialogRef: MatDialogRef<ExpandImageModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  onDialogClose(result: any): void {
    console.log(this.data.image);
    this.dialogRef.close(result);
  }

  cancel() {
    console.log(this.data.image);
  }
}
