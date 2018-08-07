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
	
	var correctAnswer = ["answer2", "answer4", "answer3", "answer2", "answer3", "answer1", "answer3", "answer1", "answer4", "answer3"];

	var qCounter = 0;
	var countdown = 31;
	var intervalId;
	var right = 0;
	var wrong = 0;
	
	function gameReset() {
		qCounter = 0;
		questionGen();
	}
	
	function run() {
      clearInterval(intervalId);
      intervalId = setInterval(counter, 1000);
    }
	
	function counter(){
		countdown--;
		$("#timer").text(countdown);
		if(countdown == 0) {
			clearInterval(intervalId);
			$(".question").text("Sorry, you ran out of time. The correct answer is:");
			setFontColorCorrect();
			qCounter++;
			wrong++;
			if (qCounter < answers.length){
				questionCorrectDisplay();
			} else {
				$(".question").text("");
				$(".endGame").html("<h3>Game Over</h3><p>Correct:"+right+"</p><p>Wrong:"+wrong+"</p>");
			}
		}
		
		
	}
	
	function setFontColorCorrect() {
		var set = "#"+correctAnswer[qCounter];
		$(set).css("color", "#c70039");
	}
	
	function setFontColorReset() {
		$(".answer").css("color", "#212529");	
	}
	
	function questionCorrectDisplay() {
		var delay2 = setTimeout(function() {
          questionGen();
		  setFontColorReset();
        }, 2000);
		countdown = 30;
	}
	
	function questionGen() {
		$(".question").text(questions[qCounter]);
		for (var a=0; a<4; a++) {
			var answer = '#answer' + (a + 1);
			$(answer).text(answers[qCounter][a]);
			setFontColorReset();
		}
		run();
	}
	
	$(".answer").on("click", function () {
		var set = "#"+correctAnswer[qCounter];
		if (event.target.id == correctAnswer[qCounter]){
			clearInterval(intervalId);
			$(".question").text("That is correct!");
			setFontColorCorrect();
			qCounter++;
			right++;
		} else {
			clearInterval(intervalId);
			$(".question").text("Sorry, the correct answer is:");
			setFontColorCorrect();
			qCounter++;
			wrong++;
		}
		questionCorrectDisplay();
	});
	
	

	gameReset();
	
});