//VARIABLE DECLARATION/////////////////////////////////////////////////////////////////////////////////////////////
var questions =  [new Question("What is the name of the town in 'IT', the movie?", "Loogieville", "Denney", "Townsville", "Clownville", "Denney", "assets/images/happyit.jpg", "assets/images/angryit.png"),
				new Question("Who is the voice of Meg Griffin from Family Guy?", "Gal Gadot", "Reese Witherspoon", "Mila Kunis", "Angelina Jolie", "Mila Kunis", "assets/images/correctMeg.jpg", "assets/images/incorrectMeg.jpg"),
				new Question("How many Fast & Furious Movies have come out as of 2017?", "9", "8", "7", "None of the Above", "None of the Above", "assets/images/correctFast.jpg", "assets/images/incorrectFast.jpg"),
				new Question("What year did the first ever anything air on TV", "1999", "1928", "1945", "1776", "1928", "assets/images/correctTV.jpg", "assets/images/incorrectTV.jpg"),
				new Question("fix", "fix", "fix", "fix", "fix", "fix", "fix", "fix", "fix"),
				new Question("fix", "fix", "fix", "fix", "fix", "fix", "fix", "fix"),
				new Question("fix", "fix", "fix", "fix", "fix", "fix", "fix", "fix,"),
				new Question("fix", "fix", "fix", "fix", "fix", "fix", "fix", "fix")];
var index = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var currentQuestion;
var intervalId;
//MAIN FUNCTION////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	$("#begin").on("click", function(){
		currentQuestion = questions[index];
		displayQuestion();
		countDown($("#timeRemaining"), 30);
	});
	//DISPLAY THE QUESTION AT HAND
	//UPON CLICKING ON THE MULTIPLE CHOICES
	$(".choices").on("click", function(){
		console.log(index);
		//STOP THE TIMER 
		clearInterval(intervalId);
		$("#timeRemaining").empty();
		//GET THE INPUT ANSWER
		var chosenAnswer = $(this).text();
		$("#questionContent").css("visibility", "hidden");
		//IF CORRECT, CORRECTANSWERS INCREMENTS
		if (index <= questions.length){
			if (currentQuestion.correctAnswer(chosenAnswer)){
				$("#timeRemaining").html("<h1>NICE JOB!!!!!!</h1><br><img src='" + currentQuestion.getImage() + "' style='height: 200px; width: 300px;'>");
				correctAnswers++;
			}
			//IF WRONG ANSWER, WRONG ANSWER INCREMENTS
			else{
				$("#timeRemaining").html("<h1>SORRY, WRONG ANSWER!!!!!!</h1><br><h1>CORRECT ANSWER: " + currentQuestion.correct + "</h1><br><img src='" + currentQuestion.getImage() + "' style='height: 200px; width: 300px;'>");
				wrongAnswers++;
			}
			setTimeout(function(){
				$("#questionContent").css("visibility", "visible");
				$("#timeRemaining").empty();
				$("#timeRemaining").html("<h3 id='timeRemaining'></h3>");
				index++;
				currentQuestion = questions[index];
				displayQuestion();
				countDown($("#timeRemaining"), 30);
			}, 4000);
		}
		else{
			displayResults();
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
		$("#choice1").html("<h3>" + currentQuestion.option1 + "</h3>");
		$("#choice2").html("<h3>" + currentQuestion.option2 + "</h3>");
		$("#choice3").html("<h3>" + currentQuestion.option3 + "</h3>");
		$("#choice4").html("<h3>" + currentQuestion.option4 + "</h3>");
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
			console.log(index);
			currentQuestion = questions[index];
			displayQuestion(currentQuestion);
			countDown(target, set);
		}
	}, 1000);
};
function displayResults(){
	console.log(wrongAnswers);
	console.log(correctAnswers);

};
