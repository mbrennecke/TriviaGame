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

	var answers = [["Abbot Morris", "Dom Perignon*", "Pope Pius", "Don Amici"],
	["Lake Geneva", "Lake Victoria", "Lake Huron", "Lake Superior*"],
	["Mars", "Texas", "The Moon*", "Tatoine"],
	["A ferrier", "A farrier*", "An ironmonger", "A terrier"],
	["An Apple", "A Cardigan", "A Mackintosh*", "A Haggis"],
	["A sword*", "A computer", "A coat", "An umbrella"],
	["Sweater", "String*", "Green", "Mock"],
	["Dictionary*", "Thesaurus", "Tyrannasaurus", "Day planner"],
	["Pluto", "Jupiter", "Mercury", "Uranus*"],
	["Louis Armstrong", "Marie Curie", "Louis Pasteur*", "Albert Einstein"]];

	var qCounter = 0;
	var correctAnswer;
	
	function reset() {
		qCounter = 0;
		correctAnswer = "";
	}
	
	function answerChecker(check) {
		var correct;
		if (check.indexOf("*") >0){
			var arr = check.split("");
			correct = arr.pop();
			return correct;
		} else {return;}
	}
	
	function answerFix(answer, index) {
		var fix = answers[answer][index];
		fix = fix.slice(0,-1);
		answers[answer][index] = fix;
		console.log(answers[answer][index]);
	}
	
	function questionGen() {
		$(".question").text(questions[qCounter]);
		for (var a=0; a<4; a++) {
			answerCheck = answerChecker(answers[qCounter][a]);
			if (answerCheck == "*") {
				answerFix(qCounter, a);
				correctAnswer = a+1;
			}
			var answer = '#answer' + (a + 1);
			$(answer).text(answers[qCounter][a]);
		}
	}

	questionGen();
	
});