window.onbeforeunload = function(event) {
    localStorage.clear();
 };
var url = window.location.hostname;
console.log(url);
if(url.includes('meet')){
    if(document.getElementsByClassName('uGOf1d').length>0){
        meet =true;
    }else{
        meet = false;
    }
}
if(document.getElementsByClassName('uGOf1d').length>0){
    chrome.runtime.sendMessage({
        meet: meet,
        incallmember: document.querySelector('.uGOf1d').innerHTML,
        running: localStorage.getItem('running'),
        goalset: localStorage.getItem('goalset'),
        setMembers: localStorage.getItem('setMembers')
    });
}else{
    chrome.runtime.sendMessage({
        meet:meet
    });
}