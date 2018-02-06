//VARIABLE DECLARATION/////////////////////////////////////////////////////////////////////////////////////////////
var questions =  [new Question("What company bought Whole Foods and lowered prices?", "Alphabet", "Amazon", "Disney", "Sony", "Amazon", "assets/images/happyit.jpg", "assets/images/angryit.png"),
				new Question("Which application was banned from being used in the Amazon Echo?", "Facebook", "PokemonGo", "Snapchat", "Youtube", "Youtube", "assets/images/correctMeg.jpg", "assets/images/incorrectMeg.jpg"),
				new Question("This city has tested a flying taxi as of september 2017", "Dubai", "Detroit", "New York", "Palo Alto", "Dubai", "assets/images/correctFast.jpg", "assets/images/incorrectFast.jpg"),
				new Question("What famous person aided in the creation of the first JPEG?", "Hugh Hefner", "Bill Murray", "Snoop Dogg", "Beyonce", "Hugh Hefner", "assets/images/correctTV.jpg", "assets/images/incorrectTV.jpg"),
				new Question("2017 brought a newfound, lost, submerged continent by the name of", "Atlantis", "Zoolandia", "Zealandia", "Africania", "Zealandia", "assets/images/geography.jpg", "assets/images/geography.jpg"),
				new Question("Who founded Neuralink?", "Warren Buffet", "Elon Musk", "Donald Trump", "Marshall Mathers", "Elon Musk", "assets/images/brain.jpg", "assets/images/brain.jpg"),
				new Question("Microsoft 365 finally added this", "Slack", "LinkedIn", "GitHub", "StackOverflow", "LinkedIn", "assets/images/microsoft.jpg", "assets/images/microsoft.jpg"),
				new Question("On a serious Note: A newfound symptom of early Alzheimers detection is", "Loss of eyesight", "Loss of nailbeds", "Loss of olfaction", "Loss of hair", "Loss of olfaction", "assets/images/alzheimers.jpg", "assets/images/alzheimers.jpg")];
/** Keep track of the questions number */
var questionIndex = 0;
/** How many answers the user gets correct */
var correctAnswers = 0;
/** How many answers the user gets wrong */
var wrongAnswers = 0;
/** The question at hand */
var currentQuestion;
/** Boolean to see the game should continue or not */
var cont = true;

var intervalId;
//MAIN FUNCTION////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	$("#begin").on("click", function(){
		/**Set the timer to 30 seconds */
		startTimer($("#timeRemaining"), 30);
		/** Define the current question based on the gameplay number */
		currentQuestion = questions[questionIndex];
		/** Display the question along with its multiple choices */
		displayQuestion();
	});
	//DISPLAY THE QUESTION AT HAND
	//UPON CLICKING ON THE MULTIPLE CHOICES
	$(".choices").on("click", function(){
		/** Stop the clock using the intervalId */
		stopTimer(intervalId);
		//GET THE INPUT ANSWER
		chosenAnswer = $(this).text();
		/** Hide the content of the questions */
		$("#questionContent").css("visibility", "hidden");
		//IF CORRECT, CORRECTANSWERS INCREMENTS
		if (questionIndex < questions.length){
			/** If the user chooses the correct choice */
			if (currentQuestion.correctAnswer(chosenAnswer)){ 
				/** Let the user know the question is right */
				$("#timeRemaining").html("<h1>NICE JOB!!!!!!</h1><br><img src='" + currentQuestion.getImage() + "' style='height: 200px; width: 300px;'>");
				/** Increment the amount of correct answers */
				correctAnswers++;
				/** Hide the choices */
				$(".choices").css("visibility", "hidden");
			}
			//IF WRONG ANSWER, WRONG ANSWER INCREMENTS
			else{
				/** Let user know question is wrong */
				$("#timeRemaining").html("<h1>SORRY, WRONG ANSWER!!!!!!</h1><br><h1>CORRECT ANSWER: " + currentQuestion.correct + "</h1><br><img src='" + currentQuestion.getImage() + "' style='height: 200px; width: 300px;'>");
				/** Increment the number of wrong answers */
				wrongAnswers++;
				/** Hide choices */
				$(".choices").css("visibility", "hidden");
			}
			console.log(questionIndex);
			/** Make sure the game is still within the range of questions */
			if (questionIndex < questions.length -1){
				/** Move on to next question */
				moveToNextQuestion();
			}
			/** If the last question has been handled */
			else {
				console.log("That's right");
				displayResults();
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
	/** Display the current question */
	$("#actualQuestion").html("<h3>" + currentQuestion.question + "</h3>");

	/** Display the choices available for the question */
	$("#choice1").text(currentQuestion.option1);
	$("#choice2").text(currentQuestion.option2);
	$("#choice3").text(currentQuestion.option3);
	$("#choice4").text(currentQuestion.option4);

	/** Make the choices visible */
	$(".choices").css("visibility", "visible");
};
//SET THE CLOCK TICKING 
function startTimer(target, seconds){
	/** Define the amount of seconds that the timer will count down */
	var set = seconds;
	/** This will set the interval */
	intervalId = setInterval(function(){
		/** While there's still time left */
		if (seconds >= 0){
			/** Display how much time remains */
			$(target).text("Time Remaining: " + seconds + " seconds");
			/** Decrement the time left */
			seconds--;
		}
		/** When the time reaches zero seconds */
		else{
			/** Clear the interval */
			clearInterval(intervalId);
			/** Let the user know he/she is out of time */
			console.log("Out Of Time");
			/** Increment the questionIndex */
			questionIndex++;
			/** Move on to the next question */
			currentQuestion = questions[questionIndex];
			/** Display the new question */
			displayQuestion();
		}
	}, 1000);
};
function stopTimer(intervalId){
	//STOP THE TIMER 
	clearInterval(intervalId);
	/** Make the time invisible */
	$("#timeRemaining").empty();
};

function moveToNextQuestion(){
	/** Wait 3 seconds while displaying message associated with the answer */
	setTimeout(prepareNextQuestion, 3000);
};


function prepareNextQuestion(){
	/** Show the question content */
	$("#questionContent").css("visibility", "visible");
	/** Stop displaying the time */
	$("#timeRemaining").empty();
	/** Recreate the time */
	$("#timeRemaining").html("<h3 id='timeRemaining'></h3>");
	/** Increment the index */
	questionIndex++;
	/** Create the new question */
	currentQuestion = questions[questionIndex];
	/** Display the new question */
	displayQuestion();
	/** Restart the timer */
	startTimer($("#timeRemaining"), 30);
	/** Make the choices visible */
	$(".choices").css("visibility", "visible");
};
function displayResults(){
	$(".timeDiv").empty();
	$(".timeDiv").html(`<h1>THE GAME IS NOW OVER</h1>
						<br>
						<h2>YOUR RESULTS:</h2>
						<br>
						<h3>CORRECT ANSWERS: ${correctAnswers}</h3>
						<br>
						<h3>WRONG ANSWERS: ${wrongAnswers}`
					);
};
