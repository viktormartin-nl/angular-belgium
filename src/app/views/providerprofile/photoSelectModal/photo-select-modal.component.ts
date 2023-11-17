import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'photo-select-modal',
  templateUrl: 'photo-select-modal.component.html',
  styleUrls: ['photo-select-modal.component.scss'],
})

export class PhotoSelectModal {
  constructor(
    public dialogRef: MatDialogRef<PhotoSelectModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onDialogClose(result: any): void {
    this.dialogRef.close(result);
  }

  openFolderDialog ()  {
    this.onDialogClose('folder');
  }

  openCameraDialog ()  {
    this.onDialogClose('camera');
  }
}
