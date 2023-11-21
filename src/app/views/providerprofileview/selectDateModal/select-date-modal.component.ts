import { MatDatepicker } from '@angular/material/datepicker';
import { Component, Inject, ViewChild } from '@angular/core';
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

  times: string[] = [
    '07:00 - 08:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 01:00',
    '01:00 - 02:00',
    '03:00 - 04:00',
    '04:00 - 05:00',
  ];
  selectedTime: number[] = [];

  changeTime(index: number) {
    const isSelected = this.selectedTime.includes(index);
    if (isSelected) {
      this.selectedTime = this.selectedTime.filter(i => i !== index);
    } else {
      this.selectedTime.push(index);
    }
  }

  removeTime(index: number) {
    this.selectedTime = this.selectedTime.filter(i => i !== index);
  }

}
