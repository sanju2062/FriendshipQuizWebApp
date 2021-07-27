const id = sessionStorage.getItem("IdSession");
let idcookie = document.getElementById('getId').innerHTML;
var link_box = document.querySelector(".box");
if(idcookie!=''){
    link_box.innerHTML = "https://realfriendshipquiz.herokuapp.com/api/users?id="+idcookie;
}
else{
    link_box.innerHTML = "https://realfriendshipquiz.herokuapp.com/api/users?id="+id;
}

var copyLink = document.getElementById('copy_link_img');
copyLink.addEventListener('click',e=>{
    document.getElementById('link_box').select();
    document.execCommand('copy');
    alert('Link copied')
});

var shareLink = document.getElementById('share_link_img');
shareLink.addEventListener('click',e=>{
    window.open(
        "whatsapp://send?text=" + link_box.innerHTML,
        // open in a new window.
        '_blank' 
    );
});