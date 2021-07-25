const scoreData = document.getElementById('getScoreData').innerHTML;

const parsedScore = JSON.parse(scoreData);
var table = document.getElementById("scoreTable");
var rowCount = table.rows.length;


parsedScore.forEach(element => {
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= element.userName;
    row.insertCell(1).innerHTML= element.score;
    rowCount++;
});



