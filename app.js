const express = require("express")
const path = require('path')
const main = require("./DB/Connection")
const mongoose = require('mongoose');
const { v4:uuidv4 } = require("uuid");
const app = express();
const port = process.env.PORT||80;
const bodyParser = require('body-parser')


main().catch(console.error);

const answer_model =new mongoose.Schema({
	Data:Array,
	objid:String,
	score:[]
});
const Model = mongoose.model('answers',answer_model);

app.use(bodyParser.json())
app.use('/static',express.static('static'))

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
	res.status(200).render('index.pug'); 
});

app.get('/quiz',(req,res)=>{
	let id = uuidv4()
	res.status(200).render('quiz.pug',{obj_id:id});
});

app.post('/api',(req,res)=>{
	let allData = req.body;
	let obj_id = allData.pop()
	let newModel = new Model({
		Data:allData,
		objid:obj_id.objid
	});
	newModel.save(function(err){
		if(err){
			console.log('Database Error')
			return res.status(404).send('internal server error')
		}else{
			console.log('data saved')
			return res.status(200).send('done')
		}
	}) 
	res.status(200)
}); 

app.get('/link',(req,res)=>{
	let objid = req.query.id;
	res.status(200).render('share_link.pug',{obj_id:objid});
});

app.use(express.json({limit:'1mb'}));

app.get('/api/users', function(req, res) {
	let obj_id = req.query.id;
	if(typeof obj_id=='undefined'){ 
		res.status(500).send('URL Error')
	}else{
		Model.find({
			objid:obj_id
		},(err,result)=>{
			if (err) {
				return res.status(500).send('Internal Server Error\nStatus code 500')
			}
			else{
				let allData = JSON.stringify(result);
				return res.status(200).render('answer_index.pug',{ans:allData,iD:obj_id})
			}
		})
	}
});

app.get('/api/quiz',(req,res)=>{
	let obj_id = req.query.id;
	res.status(200).render('answer.pug',{iD:obj_id});
})

app.post('/api/score',(req,res)=>{
	let data = req.body;
	let obj_id = data.pop();
	Model.findOneAndUpdate({
		objid:obj_id.objid
	},{
		$push:{
			score:data
		}
	},{returnOriginal:false},(err,result)=>{
		if (err) {
			return res.status(500).send('Internal Server Error\nStatus code 500')
		}
		else{
			return res.status(200).send('done')
		}
	})

})

app.get('/score',(req,res)=>{
	let obj_id = req.query.id;
	if(typeof obj_id=='undefined'){ 
		res.status(500).send('URL Error')
	}else{
		Model.find({
			objid:obj_id
		},(err,result)=>{
			if (err) {
				return res.status(500).send('Internal Server Error\nStatus code 500')
			}
			else{
				if(typeof result=='undefined'){
					return res.status(500).send('Internal Server Error\nStatus code 500');
				}
				let score = result[0].score;
				let scoreData = JSON.stringify(score);
				return res.status(200).render('scorepage.pug',{scores:scoreData})
			}
		})
	}
})

app.all('*',(req,res,next)=>{
	res.type('text/plain')
	res.status(404).send(`Can't find ${req.originalUrl} on the server!\nStatus code 404`)
});

app.listen(port,()=>{
	console.log(`Server is running at http://127.0.0.1`); 
});
 