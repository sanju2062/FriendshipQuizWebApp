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
		question: "Which app do you use most often?",
		choice1: 'WhatsApp',
		choice2: 'Facebook',
		choice3: 'YouTube',
		choice4: 'Instagram'
	},
	{
		question: "What you like?",
		choice1: 'Summer',
		choice2: 'Winter',
		choice3: 'Autumn',
		choice4: 'Spring'
	},
	{
		question:" Which do you spend more money for?",
		choice1: 'Shopping',
		choice2: 'Food',
		choice3: 'Jewelry',
		choice4: 'Travel'
	},
	{
		question:"With whom do you like to spend your time?",
		choice1: 'Alone',
		choice2: 'Family',
		choice3: 'Friends',
		choice4: 'Love'
	},
	{
		question:"What is your favourite taste?",
		choice1: 'Salty',
		choice2: 'Sour',
		choice3: 'Sweet',
		choice4: 'Spicy'
	},
	{
		question:"What is your favourite movie genre?",
		choice1: 'Comedy',
		choice2: 'Horror',
		choice3: 'Romantic',
		choice4: 'Sci-Fiction'
	},
	{
		question:"You can't live without ...?",
		choice1: 'Food',
		choice2: 'Love',
		choice3: 'Mobile',
		choice4: 'Money'
	},
	{
		question:"What age do you wish you could permanetly be?",
		choice1: 'Childhood',
		choice2: 'Early Adulthood',
		choice3: 'Maturehood',
		choice4: 'Teenager'
	},
	{
		question:"What is your favourite fast food?",
		choice1: 'Momos',
		choice2: 'Burger',
		choice3: 'Noodles',
		choice4: 'Tikki'
	}
]

const Max_question = 10;

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
