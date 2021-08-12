//for check wheather meet is ongoing or not
chrome.tabs.executeScript(null, {
    file: 'check_meet.js'
});

//receive msg from check_meet.js file
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.meet) {
        if (request.running) {
            document.querySelector('.meet').classList.add('hide');
            document.querySelector('.running').classList.remove('hide');
            if(request.goalset){
                console.log("SetMembers: ", request.setMembers);
                document.getElementById('exitnumber').innerHTML = request.setMembers;
            }
            
        } else {
            console.log("Member in meeting is :-", request.incallmember);
            document.getElementById('noOfParticipant').innerHTML = request.incallmember;
            document.getElementById('requiredParticipantToExit').value = Math.round(request.incallmember / 4);
            

            document.getElementById('confirm').addEventListener('click', () => {
                const setMembers = document.getElementById('requiredParticipantToExit').value;

                // console.log("SetMembers: ", setMembers);
                chrome.tabs.executeScript(null, {
                    code: 'localStorage.setItem("running",true);'
                })
                chrome.tabs.executeScript(null, {
                    code: 'localStorage.setItem("goalset",true);'
                })
                chrome.tabs.executeScript(null, {
                    code: `localStorage.setItem("setMembers",${setMembers});`
                })
                chrome.tabs.executeScript(null, {
                    file: "leave.js"
                })
            });
        }
    } else {
        document.querySelector('.meet').classList.add('hide');
        console.log("Meeting Has Not Started");
    }
   
});

document.querySelector('.cancelButton').addEventListener('click', () => {
    chrome.tabs.executeScript(null, {
        code: 'localStorage.removeItem("running");'
    });
    window.close();
});