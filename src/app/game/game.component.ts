import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit { 
  game: Game = new Game;
  gameId!: string;
  gameOver = false;



  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.gameId = params['id']

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.game.playerImg = game.playerImg;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;

        });
    })
  }

  newGame() {
    this.game = new Game();
   

  }
  pickCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }else if (!this.game.pickCardAnimation && this.game.players.length) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();
      
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 1000);

    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImg.push('ava1.png');
        this.updateGame();
      }
    });
    
  }
  updateGame(){
    this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson());
  }
  editPlayer(playerId: number){
    console.log('edit player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImg.splice(playerId, 1);
        } else{
          this.game.playerImg[playerId] = change; 
        }
        this.updateGame(); 
      }
    });
    
    
  }
}
