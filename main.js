  function RandomEquationGame(options = {})
  {
    this.curruntPlayer = 0;
    this.equationString = "";
    this.message = document.querySelector((options.messageSelector || '#message'));
    this.equation = document.querySelector((options.equationsSelector || '#equations'));
    this.scoreResult = 0;
    this.result = 0;
    this.equationData = [];
    this.userData = [];
    this.evlButtonEle = document.querySelector("#evlBtn");
    this.skipButtonEle = document.querySelector("#skipBtn");
    this.quitButtonEle = document.querySelector("#quitBtn");
    this.resetButtonEle = document.querySelector("#resetBtn");
    this.message = document.querySelector("#message");
    this.equationsEle = document.querySelector("#equations");
    this.score = document.querySelector("#score");
    this.userInput = document.querySelector("#ansInput");
    this.name = document.querySelector('#username');

    //Start of the game
    if(this.generateRandomEquation) this.beginGame();

    //Button onclick events for the SKIP, Evaluate,Reset,Skip
    if(this.evaluateResult) this.evlButtonEle.onclick = this.evaluateResult.bind(this);
    if(this.skip) skipBtn.onclick=this.skip.bind(this);
    if(this.reset) resetBtn.onclick=this.reset.bind(this);
    if(this.quit) quitBtn.onclick=this.quit.bind(this);
  }


  //localStorage.setItem('Player',JSON.stringify(obj));
  //beginFunction which will store the Name of the player and start the game.
  RandomEquationGame.prototype.beginGame=function(){
    if(this.name === ""){
      this.name="current user";
    }
    else{
      this.name=this.name;
    }
    //localStorage.setItem('name', this.name);

    this.generateRandomEquation();

  }

  RandomEquationGame.prototype.storeValue = function() {
    const obj =  {
      "Username" : this.name.value,
      "Score" : this.scoreResult,
      "Equation": this.equationData,
      "UserAnswer": this.userData,
    };

    localStorage.setItem("UserData",JSON.stringify(obj));
  };
  //Function which will create the randomEquation.
  RandomEquationGame.prototype.generateRandomEquation = function() {
    //console.log("generate equation call");
    var x = this.randomNumber(1,100);
    var y = this.randomNumber(1,100);
    var operator = this.randomNumber(0, 3);
    //console.log("x & y", x, y);

    switch (operator)
    {
      case 0:
            this.equationString = x + " * " + y + " =";
            this.result = this.mutliplication(x,y);
            console.log(this.result);
            break;
      case 1:
            this.equationString = x + " / " + y + " =";
            this.result = this.division(x,y);
            console.log(this.result);
            break;
      case 2:
            this.equationString = x + " - " + y + " =";
            this.result = this.subrtact(x,y);
            console.log(this.result);
            break;
      case 3:
            this.equationString = x + " + " + y + " =";
            this.result = this.addition(x,y);
            console.log(this.result);
            break;
    }
    this.equationsEle.textContent = this.equationString;
    //localStorage.setItem('equation', this.equationString);

  };
  RandomEquationGame.prototype.randomNumber = function(min,max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * ( max - min + 1 )) + min;
  };

  RandomEquationGame.prototype.addition = function(x,y) {
   let result =  x + y;
    return result;
  };

  RandomEquationGame.prototype.subrtact = function(x,y) {
    let result =  x - y;
    return result;
  };

  RandomEquationGame.prototype.mutliplication = function(x,y) {
  let result = x * y;
    return result;
  };

  RandomEquationGame.prototype.division = function(x,y){
  if(y==0)
  {
    let result = 0;
      return result;
  }
  else {
    let result = Math.round(((x / y) *100)/100);
  return result;
  }


  };
  RandomEquationGame.prototype.evaluateResult = function() {
    // console.log(this);
    // console.log(Number(this.userInput.value), this.result);
    if(Number(this.userInput.value) === this.result)
    {
      this.win();
      this.generateRandomEquation();
      this.userData.push(this.userInput.value);
      //localStorage.setItem('score',this.scoreResult);
      this.userInput.value=0;

      this.storeValue();

    }
    else {
      this.lose();
      this.generateRandomEquation();
      this.userData.push(this.userInput.value);
      //localStorage.setItem('score',this.scoreResult);
      this.userInput.value=0;

      this.storeValue();
    }
  };
  RandomEquationGame.prototype.win = function() {
  //  console.log("Win call");
    this.scoreResult += 100;
    this.score.textContent = this.scoreResult;
    this.message.textContent = `Your moment in the sun!!!!  Let's play one more..Try this new one`;
    this.equationData.push(this.equationString);
    return this.message;
    return this.scoreResult;

  };
  RandomEquationGame.prototype.lose = function() {
    //console.log("Lose call");
    this.scoreResult -= 100;
    this.score.textContent = this.scoreResult;
    message.textContent = `\n Let's play again...Good Luck:)`;
    this.equationData.push(this.equationString);
    return this.scoreResult;
  };
  RandomEquationGame.prototype.skip=function(){
    this.message.textContent = "";
    this.generateRandomEquation();
  }

  RandomEquationGame.prototype.reset=function(){
    this.generateRandomEquation();
    localStorage.removeItem('score');
    this.score.textContent=0;
    this.message.textContent = "";
    this.userInput.value=0;
    this.name.value = '';
  }

  RandomEquationGame.prototype.quit=function(){

    this.score.textContent=0;
    this.message.textContent ="";
    this.userInput.value = 0;
    this.equationsEle.textContent = "";
    this.name.value='';
    localStorage.clear();

  }
  document.querySelector("#btn-generate").onclick = function (){
    new RandomEquationGame();
  }
