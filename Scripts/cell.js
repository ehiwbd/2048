let score = 0;

export class Cell{
  constructor(gridElement,x,y){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gridElement.append(cell);
    this.x = x;
    this.y = y;
  }

  linkTile(tile) {
    tile.setXY(this.x, this.y);  // Устанавливаем координаты для плитки
    this.linkedTile = tile;
  }
  

  unlinkTile(){
    this.linkedTile = null;
  }

  isEmpty(){
    return !this.linkedTile;
  }

  linkTileForMerge(tile){
    tile.setXY(this.x, this.y);
    this.linkedTileForMerge = tile;
  }
    

  unlinkTileForMerge(){
    this.linkedTileForMerge = null;
  }

  hasTileForMerge(){
    return !!this.linkedTileForMerge;
  }

  canAccept(newTile){
    return this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile.value === newTile.value);
  }

  mergeTiles(){
    this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
    this.scoreCount();
    this.linkedTileForMerge.removeFromDOM();
    this.unlinkTileForMerge();
  }


  scoreCount(){
    score += this.linkedTile.value + this.linkedTileForMerge.value;
    this.updateScoreDisplay();
  }

  updateScoreDisplay(){
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Score: ${score}`;
    updateScoreBackground(score);
  }
  
}

function updateScoreBackground(score) {
  const scoreContainer = document.querySelector('.score_container');
  const bgLightness = 150 - Math.log2(score) * 9;  
  scoreContainer.style.backgroundColor = `hsl(25, 60%, ${bgLightness}%)`;
  console.log(score);
  if(score >= 2048){
    alert("You win!!!");
    window.location.reload();
  }
}


// if(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
//   await newTile.waitForAnimationEnd();
//   alert("Try again");
//   return;
// }
