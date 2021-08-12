function leave(){
    if(running){
        console.log("Enter to leave meet");
        if(setMembers > parseInt(document.querySelector('.uGOf1d').innerHTML)){
            localStorage.removeItem('running');
            document.querySelector('.ftJPW').click()
            clearInterval(leave_meet);
        }
    }
}
var setMembers = parseInt(localStorage.getItem('setMembers'));
var running = localStorage.getItem('running');
var leave_meet = setInterval(leave,5000);
