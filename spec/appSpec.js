describe('Pig Game', () => {
  describe('random', () => {
    it('should between 1 and 6 for random number ', () => {
        // const resultSet = new Set();
        const newRandom = random();
        array = [1, 2, 3, 4, 5, 6];
        expect(array).toContain(newRandom);
        // for (let i = 0; i < 100000; i++) {
        //   resultSet.add(random1);
        // }
        // expect(array).toContain([...resultSet].sort()[0]);
        //expect([...resultSet].sort()).toEqual(array);
      });
    });

  describe('togglePlayer', () => {
    it('should be player 0 and 1 togglePlayer function ', () => {
      array =[0, 1];
      expect(array).toContain(currentPlayer);
    });
  });

  describe('Roll Dice', () => {
    it('should increases the players current score when click Roll Dice button ', () => {
      resetGame();
      const rollButton = document.querySelector('.btn-roll');
      const player0Current = document.getElementById('current-0');
      const dice1 = document.querySelector('.dice1');
      const dice2 = document.querySelector('.dice2');
      const player0Panel = document.querySelector('.player-0-panel');
      const player1Pane1 = document.querySelector('.player-1-panel');
      currentRoundScore = 0;
      rollButton.click(); 
      if(dice1.src != "images/dice-1.png" && dice2.src != "images/dice-1.png"){
      expect(parseInt(player0Current.textContent)).toBe(currentRoundScore);
      // expect(parseInt(player0Current.textContent)).toBeGreaterThan(currentRoundScore);
    }
    else{
      expect(player0Panel.classList.toggle).toBe('active');
      expect(player1Pane1.classList.toggle).toBe('active');
      togglePlayer();
    }
    });
  });

  describe('game first starts', () => {
    it('should be 0 for players current scores when the game first starts', () => {
      resetGame();
      const player0Current = document.getElementById('current-0');
      const player1Current = document.getElementById('current-1');
      expect(parseInt(player0Current.textContent)).toBe(0);
      expect(parseInt(player1Current.textContent)).toBe(0);
    });
    
    it('should be 0 for players current scores when the game first starts', () => {
      resetGame();
      const player0Score = document.getElementById('score-0');
      const player1Score = document.getElementById('score-1');
      expect(parseInt(player0Score.textContent)).toBe(0);
      expect(parseInt(player1Score.textContent)).toBe(0);
    });
  });

  describe('New Game', () => {
    it('should be 0 for currentRoundScore, Player0Total and Player1Total', () => {
      newGameButton.click();  
      const player0Score = document.getElementById('score-0');
      const player1Score = document.getElementById('score-1');
      expect(parseInt(currentRoundScore)).toBe(0);
      expect(parseInt(player0Score.textContent)).toBe(0);
      expect(parseInt(player1Score.textContent)).toBe(0);
    });



  });
})
