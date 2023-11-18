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
  ) { }

  onDialogClose(result: any): void {
    this.dialogRef.close(result);
  }

  openFolderDialog() {
    let result = {
      goTo: 'folder',
      type: this.data.type,
      multiple: this.data.multiple
    }
    this.onDialogClose(result);
  }

  openCameraDialog() {
    let result = {
      goTo: 'camera',
      type: this.data.type,
      multiple: this.data.multiple
    }
    this.onDialogClose(result);
  }
}
