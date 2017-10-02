//VARIABLE DECLARATION/////////////////////////////////////////////////////////////////////////////////////////////
var questions =  [new Question("What company bought Whole Foods and lowered prices?", "Alphabet", "Amazon", "Disney", "Sony", "Amazon", "assets/images/happyit.jpg", "assets/images/angryit.png"),
				new Question("Which application was banned from being used in the Amazon Echo?", "Facebook", "PokemonGo", "Snapchat", "Youtube", "Youtube", "assets/images/correctMeg.jpg", "assets/images/incorrectMeg.jpg"),
				new Question("This city has tested a flying taxi as of september 2017", "Dubai", "Detroit", "New York", "Palo Alto", "Dubai", "assets/images/correctFast.jpg", "assets/images/incorrectFast.jpg"),
				new Question("What famous person aided in the creation of the first JPEG?", "Hugh Hefner", "Bill Murray", "Snoop Dogg", "Beyonce", "Hugh Hefner", "assets/images/correctTV.jpg", "assets/images/incorrectTV.jpg"),
				new Question("2017 brought a newfound, lost, submerged continent by the name of", "Atlantis", "Zoolandia", "Zealandia", "Africania", "Zealandia", "assets/images/geography.jpg", "assets/images/geography.jpg"),
				new Question("Who founded Neuralink?", "Warren Buffet", "Elon Musk", "Donald Trump", "Marshall Mathers", "Elon Musk", "assets/images/brain.jpg", "assets/images/brain.jpg"),
				new Question("Microsoft 365 finally added this", "Slack", "LinkedIn", "GitHub", "StackOverflow", "LinkedIn", "assets/images/microsoft.jpg", "assets/images/microsoft.jpg"),
				new Question("On a serious Note: A newfound symptom of early Alzheimers detection is", "Loss of eyesight", "Loss of nailbeds", "Loss of olfaction", "Loss of hair", "Loss of olfaction", "assets/images/alzheimers.jpg", "assets/images/alzheimers.jpg")];
var index = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var currentQuestion;
var intervalId;
var cont = true;
//MAIN FUNCTION////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	$("#begin").on("click", function(){
		currentQuestion = questions[index];
		displayQuestion();
		countDown($("#timeRemaining"), 30);
		$(".choices").css("visibility", "visible");
	});
	//DISPLAY THE QUESTION AT HAND
	//UPON CLICKING ON THE MULTIPLE CHOICES
	$(".choices").on("click", function(){
		console.log(index);
		//STOP THE TIMER 
		clearInterval(intervalId);
		$("#timeRemaining").empty();
		//GET THE INPUT ANSWER
		chosenAnswer = $(this).text();
		$("#questionContent").css("visibility", "hidden");
		//IF CORRECT, CORRECTANSWERS INCREMENTS
		if (index < questions.length){
			if (currentQuestion.correctAnswer(chosenAnswer)){
				$("#timeRemaining").html("<h1>NICE JOB!!!!!!</h1><br><img src='" + currentQuestion.getImage() + "' style='height: 200px; width: 300px;'>");
				correctAnswers++;
				$(".choices").css("visibility", "hidden");
			}
			//IF WRONG ANSWER, WRONG ANSWER INCREMENTS
			else{
				$("#timeRemaining").html("<h1>SORRY, WRONG ANSWER!!!!!!</h1><br><h1>CORRECT ANSWER: " + currentQuestion.correct + "</h1><br><img src='" + currentQuestion.getImage() + "' style='height: 200px; width: 300px;'>");
				wrongAnswers++;
				$(".choices").css("visibility", "hidden");
			}
			if (index === questions.length - 1){
				cont = false;
				setTimeout(function(){
					displayResults();
				}, 1000);
			}
			else{
				setTimeout(function(){
					$("#questionContent").css("visibility", "visible");
					$("#timeRemaining").empty();
					$("#timeRemaining").html("<h3 id='timeRemaining'></h3>");
					index++;
					currentQuestion = questions[index];
					displayQuestion();
					countDown($("#timeRemaining"), 30);
					$(".choices").css("visibility", "visible");
				}, 1000);
			}
		}	
	});
});
//FUNCTIONS TO CALL////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE QUESTION OBJECT
function Question(question, option1, option2, option3, option4, correct, correctImage, incorrectImage){
	this.question = question;
	this.option1 = option1;
	this.option2 = option2;
	this.option3 = option3;
	this.option4 = option4;
	this.correct = correct;
	this.correctImage = correctImage;
	this.incorrectImage = incorrectImage;
	var right = false;
	//CHECK IF INPUT IS CORRECTANSWER
	this.correctAnswer = function(chosen){
		if (chosen === correct){
			right = true;
		}
		return chosen === correct;
	};
	//RETREIVE THE IMAGE ASSOCIATED WITH THE ANSWER
	this.getImage = function(){
		if (right){
			return this.correctImage;
		}
		else{
			return this.incorrectImage;
		}
	};
};
//SHOW THE CURRENTQUESTION AND OPTIONS
function displayQuestion(){
		$("#actualQuestion").html("<h3>" + currentQuestion.question + "</h3>");
		$("#choice1").text(currentQuestion.option1);
		$("#choice2").text(currentQuestion.option2);
		$("#choice3").text(currentQuestion.option3);
		$("#choice4").text(currentQuestion.option4);
	};
//SET THE CLOCK TICKING 
function countDown(target, seconds){
	var set = seconds;
	intervalId = setInterval(function(){
		if (seconds >= 0){
			$(target).text("Time Remaining: " + seconds + " seconds")
			seconds--;
		}
		else{
			clearInterval(intervalId);
			console.log("Out Of Time");
			index++;
			currentQuestion = questions[index];
			displayQuestion(currentQuestion);
			countDown(target, set);
		}
	}, 1000);
};
function displayResults(){
	$("#actualQuestion").html("<h1>THE GAME IS NOW OVER</h1>");

};
