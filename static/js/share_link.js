const id = sessionStorage.getItem("IdSession");
let idcookie = document.getElementById('getId').innerHTML;
if(idcookie!=''){
    var link_box = document.querySelector(".box");
    link_box.innerHTML = "http://localhost/api/users?id="+idcookie;
}
else{
    var link_box = document.querySelector(".box");
    link_box.innerHTML = "http://localhost/api/users?id="+id;
}

var copyLink = document.getElementById('copy_link_img');
copyLink.addEventListener('click',e=>{
    window.getSelection().selectAllChildren(link_box);
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