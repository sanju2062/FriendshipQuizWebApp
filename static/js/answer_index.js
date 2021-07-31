const Id = document.getElementById('getId').innerHTML;

function submit_name(){
	const name = document.getElementById("name");
	if (name.value=='') {
		alert('fill name');
		return 
	}
	sessionStorage.setItem("uname", name.value);
	return window.location.assign("/api/quiz?id="+Id)
}

const data = document.getElementById('getData').innerHTML;


sessionStorage.setItem('allData',data);
sessionStorage.setItem('oId',Id);

var parsedData = JSON.parse(data);
var username = parsedData[0].Data.pop();
var Name = username.UserName;
var scores = parsedData[0].score;

var table = document.getElementById("scoreTable");
var rowCount = table.rows.length;

scores.forEach(element => {
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= element.userName;
    row.insertCell(1).innerHTML= element.score;
    rowCount++;
});

document.getElementById('para').innerHTML = `${Name} send you Quiz,give answers and check score`;

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    var idsArray = [];
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
			idsArray.push(decodeURIComponent(cookiePair[1]))			
			// Decode the cookie value and return
            // return decodeURIComponent(cookiePair[1]);
        }
		if(i==cookieArr.length-1){
			return idsArray;
		}
    }
    
    // Return null if not found
    return null;
}

function checkCookie() {
    // Get cookie using our custom function
    var ids = getCookie("friend_id");

	
    
    if(ids != null) {
		ids.forEach(element => {
			if(Id==element){
				window.location.assign('/score?id='+Id)
			}
		});
    }
}
checkCookie()
