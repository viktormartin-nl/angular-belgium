import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'select-date-modal',
  templateUrl: 'select-date-modal.component.html',
  styleUrls: ['select-date-modal.component.scss'],
})

export class SelectDateModal {
  constructor(
    public dialogRef: MatDialogRef<SelectDateModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onDialogClose(result: any): void {
    this.dialogRef.close('result');
  }

}
