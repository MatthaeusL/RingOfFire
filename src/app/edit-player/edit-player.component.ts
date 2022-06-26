import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictrues = ['ava1.png', 'ava2.png', 'ava3.png', 'ava4.png', 'ava5.png', 'ava6.png', 'ava7.png']

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(){
    this.dialogRef.close();
  }


}
