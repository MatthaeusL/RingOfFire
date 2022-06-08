import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation:boolean = false;
  game: Game = new Game;
  currentCard: any; 



  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
    console.log(this.game);
    
  }
  pickCard(){
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      
      console.log(this.currentCard);
      console.table(this.game.playedCard)
      
      this.pickCardAnimation = true;
      
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
  
      }, 1000);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
     
      this.game.players.push(result);

      
    });
  }
}
