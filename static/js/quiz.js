const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const username = sessionStorage.getItem("first");
const getId = document.getElementById('obj_id').innerHTML;

let currentQuestion = {};
let acceptionAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let Answers = [];
let questions = [
	{
		question: "What is your favourite color?",
		choice1: 'Red',
		choice2: 'Blue',
		choice3: 'Black',
		choice4: 'Pink'
	},
	{
		question: "What is your favourite drink?",
		choice1: 'Tea',
		choice2: 'Coffee',
		choice3: 'ColdDrink',
		choice4: 'NimbooPani'
	},
	{
		question: "What you like?",
		choice1: 'summer',
		choice2: 'winter',
		choice3: 'Rain',
		choice4: 'snow'
	}
]

const Max_question = 3;

start_game =()=>{
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions]
	getNewQuestion();
};


getNewQuestion = ()=>{
	if (availableQuestions.length==0||questionCounter>=Max_question) {
		Answers.push({UserName:username})
		Answers.push({objid:getId})
		var correct_answers = JSON.stringify(Answers);
		$.ajax({ 
			url: '/api',
			type: 'POST',
			cache: false, 
			contentType: "application/json; charset=utf-8",
			data: correct_answers,
			beforeSend:function(){
				document.body.className = "loading";
			},
			success: function(data,textStatus,xhr){
				document.body.className = "";
				const d = new Date();
				d.setTime(d.getTime() + (7*24*60*60*1000));
				let expires = "expires="+ d.toUTCString();
				document.cookie = "self_id="+getId+";" + expires + ";path=/";
				sessionStorage.setItem("IdSession",getId);
				window.location.assign('/link')
			}
			, error: function(jqXHR, textStatus, err){
				document.body.className = "";
				alert(textStatus+":"+err)
			}
		 })
	}
	questionCounter++;
	const questionindex = Math.floor(Math.random()*availableQuestions.length);
	currentQuestion =  availableQuestions[questionindex];
	question.innerText= currentQuestion.question;
	choices.forEach(choice =>{
		const number = choice.dataset['number'];
		choice.innerText= currentQuestion['choice'+number];
		});

	availableQuestions.splice(questionindex,1);
	acceptionAnswers = true;
}

choices.forEach(choice=>{
	choice.addEventListener('click',e=>{
		if(!acceptionAnswers)return;

		acceptionAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];
		Answers.push({questionName:currentQuestion.question,
			Answer:selectedAnswer
		});
		getNewQuestion();

	});
});
start_game();

