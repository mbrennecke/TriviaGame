$(document).ready(function() {

	var questions = ["Who was the legendary Benedictine monk who invented champagne?",
	"Name the largest freshwater lake in the world?",
	"Where would you find the Sea of Tranquility?",
	"What is someone who shoes horses called?",
	"What item of clothing was named after its Scottish inventor?",
	"What kind of weapon is a falchion?",
	"Which word goes before vest, beans and quartet?",
	"What is another word for lexicon?",
	"What is the seventh planet from the sun?",
	"Who invented the rabies vaccination?"];	
	
	var answers = [["Abbot Morris", "Dom Perignon", "Pope Pius", "Don Amici"],
	["Lake Geneva", "Lake Victoria", "Lake Huron", "Lake Superior"],
	["Mars", "Texas", "The Moon", "Tatoine"],
	["A ferrier", "A farrier", "An ironmonger", "A terrier"],
	["An Apple", "A Cardigan", "A Mackintosh", "A Haggis"],
	["A sword", "A computer", "A coat", "An umbrella"],
	["Sweater", "String", "Green", "Mock"],
	["Dictionary", "Thesaurus", "Tyrannasaurus", "Day planner"],
	["Pluto", "Jupiter", "Mercury", "Uranus"],
	["Louis Armstrong", "Marie Curie", "Louis Pasteur", "Albert Einstein"]];

//Hard coded correct answers, because for the parameters of the assignment it was
//the best easiest method
	
	var correctAnswer = ["answer2", "answer4", "answer3", "answer2", "answer3", "answer1", "answer3", "answer1", "answer4", "answer3"];

	var qCounter = 0;
	var countdown = 31;
	var intervalId;
	var right = 0;
	var wrong = 0;

//function for game start, creates the button to begin game
	
	function gameStart(){
		$(".endGame").html('<br><br><button type="button" class="btn btn-primary btn-lg btn-block">Play?</button>');
		}
	
//function to initialize all settings for game start or replay
	
	function gameReset() {
		qCounter = 0;
		right = 0;
		wrong = 0;
		questionGen();
	}

//Starts the clock countdown for questions
	
	function run() {
      clearInterval(intervalId);
      intervalId = setInterval(counter, 1000);
    }
	
//manual counter to progress game	
	
	function counter(){
		countdown--;
		//countdown clock
		$("#timer").text(countdown);
		if(countdown == 0) {
			clearInterval(intervalId);
			//if clock reaches zero, lose condition for question
			$(".question").text("Sorry, you ran out of time. The correct answer is:");
			setFontColorCorrect();
			qCounter++;
			wrong++;
			if (qCounter < answers.length){
				questionCorrectDisplay();
			} else {
				
			}
		}	
	}
	
//Function to set the answers area after button press
	
	function setAnswersList() {
		$(".endGame").html('<ul><li id="answer1" class="answer "></li><li id="answer2" class="answer "></li><li id="answer3" class="answer "></li><li id="answer4" class="answer "></li></ul>')
	}

//Function to set color of correct answer
	
	function setFontColorCorrect() {
		var set = "#"+correctAnswer[qCounter];
		$(set).css("color", "#c70039");
	}
	
//Function to reset color of answer divs after display of correct answer
//Last correct answer div was remaining colored without this 
	
	function setFontColorReset() {
		$(".answer").css("color", "#212529");
	}

//Function to display the correct answer for 2 seconds after guess or timer event
	
	function questionCorrectDisplay() {
		var delay2 = setTimeout(function() {
          questionGen();
		  setFontColorReset();
		  
        }, 2000);
		countdown = 31;
	}

//Function to create the visible question
	
	function questionGen() {
		if (qCounter < questions.length){
		$(".question").text(questions[qCounter]);
			for (var a=0; a<4; a++) {
				var answer = '#answer' + (a + 1);
				$(answer).text(answers[qCounter][a]);
				setFontColorReset();
			}
			$("#questionNum").text(qCounter+1);
		
		run();
		$(".answer").css("pointer-events", "auto");
	//End of questions reached, replay button presented with right and wrong guesses 
	//shown
		} else {$(".question").text("");
				$(".endGame").html('<h3>Game Over</h3><h3>Correct:'+right+'<//h3><h3>Wrong:'+wrong+'</h3><button type="button" class="btn btn-primary btn-lg btn-block">Play Again?</button>');}
	}

//Event listner for answer selection
	
	$(document).on("click", ".answer", function () {
		var set = "#"+correctAnswer[qCounter];
		//correct answer chosen
		if (event.target.id == correctAnswer[qCounter]){
			clearInterval(intervalId);
			$(".question").text("That is correct!");
			//it was possible to click spam and progress the questions from this view
			//this turns of clicks for the time the correct answer shown
			$(".answer").css("pointer-events", "none");
			setFontColorCorrect();
			qCounter++;
			right++;
		} else {
			clearInterval(intervalId);
			$(".question").text("Sorry, the correct answer is:");
			//Same again, to stop click spam of answers
			$(".answer").css("pointer-events", "none");
			setFontColorCorrect();
			qCounter++;
			wrong++;
		}
		//Call to function to show correct answer in list
		questionCorrectDisplay();
	});

//Listener event for start game or restart game
	
	$(document).on('click', '.btn', function () {
		setAnswersList();
		questionCorrectDisplay();
		gameReset();
	});

//Starts the game on page load
	gameStart();
	
});