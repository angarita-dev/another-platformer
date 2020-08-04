import Phaser from 'phaser'; import Scene from '../classes/sceneUtils'; 
// External api connect logic
import Api from '../classes/api';

export default class Scoreboard extends Scene {
  init(data) {
    this.currentScore = data.currentScore;
  }
  constructor() {
    super('scoreboard');
  }

  addLabel() {
    const stylingConfig = { 
      fontFamily: 'Alagard',
      fontSize: '28px',
      color: '#fff'
    };

    this.label = this.add.text(20, 480, 'Tell me your name: ', stylingConfig).setOrigin(0);
  }

  removeScores() {
    this.scoreboardText.destroy(true);
  }

  reDisplayScores() {
    this.removeScores();
    this.addScores();
  }

  addLoadingDataText() {
    const stylingOptions = {
      color: '#eee',
      fontFamily: 'Alagard',
      fontSize: '28px',
    }

    this.loadingDataText = this.add.text(20, 200, 'Loading scoreboard ...', stylingOptions);
  }

  removeLoadingDataText() {
    this.loadingDataText.destroy();
  }

  addScores() {
    const stylingOptions = {
      color: '#eee',
      fontFamily: 'Alagard',
      fontSize: '28px',
    }

    let startCoord = 40;
    const addText = (text, offAxis = 50) => {
      return this.add.text(20, startCoord += offAxis, text, stylingOptions).setOrigin(0);
    }

    const scoreColumn = [];
    const spaceColumn = [];
    const nameColumn = [];
    this.scoreboardText = this.add.group();

    const scoreboardLength = 3;

    this.addLoadingDataText();

    Api.getData().then( results => {
      const scoreCollection = results.map( data => data.score);
      const dataCollection = results;

      const getScorePlace = (runScore) => {
        let position;
        scoreCollection.forEach((score, index) => {
          if (runScore >= score && !position) position = index + 1;
        });
        if (!position) position = scoreCollection.length + 1;
        return position;
      };

      dataCollection.forEach( (data, index, array) => {
          const place = index + 1;
          const name = data.user.length >= 18 ? 
            `${data.user.slice(0, 17)}...` :
            data.user;
          const score = data.score;

        if (place <= scoreboardLength) { // Only display first X scores
          nameColumn.push(addText(`${place}. ${name}`));
          scoreColumn.push(addText(score, 0));

          scoreColumn.forEach( score => score.x = 400 );
        } else if (place === array.length) {
          // Adds spacer dots
          spaceColumn.push(addText('.', 20));
          spaceColumn.push(addText('.', 15));
          spaceColumn.push(addText('.', 15));

          spaceColumn.forEach( dot => dot.x = 200);

          nameColumn.push(addText(`${place}. ${name}`));
          scoreColumn.push(addText(score, 0));

          scoreColumn.forEach( score => score.x = 400 );
        }
      });

      const scorePlace = getScorePlace(this.currentScore);
      nameColumn.push(addText(`Your current score is on position ${scorePlace}`, 80));

      this.displayedScores = true;
      this.removeLoadingDataText();

      const textElements = nameColumn.concat(spaceColumn).concat(scoreColumn).concat(spaceColumn);
      this.scoreboardText.addMultiple(textElements);
    });
  }

  addSavingScoreText() {
    const stylingOptions = {
      color: '#eee',
      fontFamily: 'Alagard',
      fontSize: '28px',
    }

    this.savingScoreText = this.add.text(20, 480, 'Saving score ...', stylingOptions);
  }

  removeSavingScoreText() {
    this.savingScoreText.destroy();
  }

  addErrorSavingScoreText() {
    this.savingScoreText.text = 'There has been an error saving the score :c';
  }

  submitInfo() {
    const name = this.textInput.text;

    this.addSavingScoreText();

    this.submitText.destroy();
    this.textInput.destroy();
    this.label.destroy();

    this.removeScores();
    Api.saveScore(name, this.currentScore).then( result => {
      this.reDisplayScores();
      if (result) {
        this.removeSavingScoreText();
      } else {
        this.addErrorSavingScoreText();
      }
    });
  }

  addSubmitText() {
    const stylingConfig = { 
      fontFamily: 'Alagard',
      fontSize: '28px',
      color: '#fff'
    };

    this.submitText = this.add.text(0, 480, 'Submit', stylingConfig).setOrigin(0);

    const calcX = this.textInput.x + this.textInput.width + this.submitText.width;
    this.submitText.x = calcX

    this.submitText.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { this.submitInfo() });

    this.submitText.disableInteractive();
  }

  addNameInput() {
    const stylingConfig = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#fff',
    };

    const calcX = this.label.x + this.label.width;
    this.textInput = this.add.rexInputText(calcX, 480, 250, 30, stylingConfig).setOrigin(0);
    this.textInput.on('textchange', (inputText, e) => { 
      if(inputText.text.length === 0 || !inputText.text.trim()) {
        this.submitText.disableInteractive();
      } else {
        this.submitText.setInteractive();
      }
    });
  }

  addSubmit() {
    const stylingOptions = {
      color: '#eee',
      fontFamily: 'Alagard',
      fontSize: '28px',
    }

    if (this.currentScore > 0) {
      this.addLabel();
      this.addNameInput();
      this.addSubmitText();
    } else {
      this.add.text(20, 480, 'Come on you can do better than 0 points ...', stylingOptions);
    }
  }

  create() {
    this.addScores();
    this.addSubmit();
  }
}
