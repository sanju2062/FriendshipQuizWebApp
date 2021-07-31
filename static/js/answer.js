const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const name1 = sessionStorage.getItem("uname");
const Id = document.getElementById('iD').innerHTML;
const Qdata = sessionStorage.getItem('allData')

let currentQuestion = {};
let acceptionAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let Answers = [];
let correct_answers;

if(typeof(Storage)!='undefined'){
	if(name1=='undefined'||name1==null||Qdata=='undefined'||Qdata=='[]'){
		window.location.assign('/api/users?id='+Id)
	}
}else{
	alert('Browser not support this website');
}

let answers = JSON.parse(Qdata)
var username = answers[0].Data.pop();
for(let i=0;i<answers[0].Data.length;i++){
	Answers.push(answers[0].Data[i]);
}
var Name = username.UserName;

let questions = [
	{
		question: "What is your favourite color?",
		question1: `What is ${Name}'s favourite color?`,
		choice1: 'Red',
		choice2: 'Blue',
		choice3: 'Black',
		choice4: 'Pink'
	},
	{
		question: "Which app do you use most often?",
		question1: `Which app do ${Name} use most often?`,
		choice1: 'WhatsApp',
		choice2: 'Facebook',
		choice3: 'YouTube',
		choice4: 'Instagram'
	},
	{
		question: "What you like?",
		question1: `What ${Name} like?`,
		choice1: 'Summer',
		choice2: 'Winter',
		choice3: 'Autumn',
		choice4: 'Spring'
	},
	{
		question:" Which do you spend more money for?",
		question1:`Which do ${Name} spend more money for?`,
		choice1: 'Shopping',
		choice2: 'Food',
		choice3: 'Jewelry',
		choice4: 'Travel'
	},
	{
		question:"With whom do you like to spend your time?",
		question1:`With whom do ${Name} like to spend your time?`,
		choice1: 'Alone',
		choice2: 'Family',
		choice3: 'Friends',
		choice4: 'Love'
	},
	{
		question:"What is your favourite taste?",
		question1:`What is ${Name}'s favourite taste?`,
		choice1: 'Salty',
		choice2: 'Sour',
		choice3: 'Sweet',
		choice4: 'Spicy'
	},
	{
		question:"What is your favourite movie genre?",
		question1:`What is ${Name}'s favourite movie genre?`,
		choice1: 'Comedy',
		choice2: 'Horror',
		choice3: 'Romantic',
		choice4: 'Sci-Fiction'
	},
	{
		question:"You can't live without ...?",
		question1:`${Name} can't live without ...?`,
		choice1: 'Food',
		choice2: 'Love',
		choice3: 'Mobile',
		choice4: 'Money'
	},
	{
		question:"What age do you wish you could permanetly be?",
		question1:`What age do ${Name} wish that they could permanetly be?`,
		choice1: 'Childhood',
		choice2: 'Early Adulthood',
		choice3: 'Maturehood',
		choice4: 'Teenager'
	},
	{
		question:"What is your favourite fast food?",
		question1:`What is ${Name}'s favourite fast food?`,
		choice1: 'Momos',
		choice2: 'Burger',
		choice3: 'Noodles',
		choice4: 'Tikki'
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