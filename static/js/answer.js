const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const name1 = sessionStorage.getItem("uname");
const Id = sessionStorage.getItem("oId");

let currentQuestion = {};
let acceptionAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let Answers = [];
let correct_answers;

const Qdata = sessionStorage.getItem('allData')
let answers = JSON.parse(Qdata)
var username = answers[0].Data.pop();
for(let i=0;i<answers[0].Data.length;i++){
	Answers.push(answers[0].Data[i]);
}
var Name = username.UserName;

let questions = [
	{
		question: `What is your favourite color?`,
		question1: `What is ${Name}'s favourite color?`,
		choice1: 'Red', 
		choice2: 'Blue',
		choice3: 'Black',
		choice4: 'Pink' 
	},
	{
		question: `What is your favourite drink?`,
		question1: `What is ${Name}'s favourite drink?`,
		choice1: 'Tea',
		choice2: 'Coffee',
		choice3: 'ColdDrink',
		choice4: 'NimbooPani'
	},
	{
		question: `What you like?`,
		question1: `What ${Name} like?`,
		choice1: 'summer',
		choice2: 'winter',
		choice3: 'Rain',
		choice4: 'snow'
	}
]

const Max_question = questions.length;

start_game =()=>{
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions]
	getNewQuestion();
};

getNewQuestion = ()=>{
	if (availableQuestions.length==0||questionCounter>=Max_question) {
		let Score = [];
		Score.push({userName:name1,score:score});
		Score.push({objid:Id});
		var stringifyScore = JSON.stringify(Score);
		$.ajax({
			url: '/api/score',
			type: 'POST',
			cache: false, 
			contentType: "application/json; charset=utf-8",
			data: stringifyScore,
			beforeSend:function(){
				document.body.className = "loading";
			},
			success: function(data,textStatus,xhr){
				document.body.className = "";
				const d = new Date();
				d.setTime(d.getTime() + (7*24*60*60*1000));
				let expires = "expires="+ d.toUTCString();
				document.cookie = "friend_id="+Id+";" + expires + ";path=/api/users";
				let assignLink = '/score?id='+Id;
				window.location.assign(assignLink);
			}
			, error: function(jqXHR, textStatus, err){
				document.body.className = "";
				alert(textStatus+":"+err);
			}
		})
	}
	questionCounter++;
	const questionindex = Math.floor(Math.random()*availableQuestions.length);
	currentQuestion =  availableQuestions[questionindex];
	question.innerText= currentQuestion.question1;
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

		acceptionAnswers = true;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];
		for (var i = 0; i < Max_question; i++) {
			if(Answers[i].questionName == currentQuestion.question)
			{
				
				const classtoapply = selectedAnswer == Answers[i].Answer ?"correct":"incorrect";
				if(classtoapply=='correct'){
					score++;
				}
				selectedChoice.parentElement.classList.add(classtoapply);
				setTimeout(()=>{
					selectedChoice.parentElement.classList.remove(classtoapply);
					getNewQuestion();
				},500);
			}
		}
	});
});
start_game();

var label = document.getElementById('simplelabel')
label.innerHTML = `Give answer to ${Name}'s quiz to see how well you know your friend`