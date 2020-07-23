const $form = document.querySelector('#form');
const $activityList = document.getElementById('activityList');

let activityArray = [];


//FUNCTIONS

// CREATE ITEM
const createItem = (activity) => {
    let item = {
        activity: activity,
        state: 'Pending'
    };

activityArray.push(item);
};

// SAVE DATA BASE
const saveDB = () => {
    localStorage.setItem('tasks', JSON.stringify(activityArray)); //save it in local storage, only text→JSON.stringify()
    readDB();
};

// READ DATA BASE FROM LOCAL STORAGE
const readDB = () => { // gonna take from the localStorage and use it to show tasks when DOM reloads
    $activityList.innerHTML = ''; //set $activityList to empty

    activityArray = JSON.parse(localStorage.getItem('tasks')); //Loading activityArray from localStorage (key: tasks)

    if(activityArray === null) { 
        activityArray = []; // it shows [] if the array is empty, otherwise its null and forEach wont work
    } else {
        activityArray.forEach(element => { 

            if (element.state === 'Done') {
                $activityList.innerHTML += `<div class="alert alert-success" role="alert"> 
            <span class="material-icons float-left mr-2">check_circle</span>
            <b>${element.activity}</b> - ${element.state} 
            <span class="float-right">
                <span class="material-icons" style="cursor:pointer">done</span>
                <span class="material-icons" style="cursor:pointer">delete</span>
            </span>
        </div>` 
            } else {
                $activityList.innerHTML += `<div class="alert alert-danger" role="alert"> 
            <span class="material-icons float-left mr-2">pending</span>
            <b>${element.activity}</b> - ${element.state} 
            <span class="float-right">
                <span class="material-icons" style="cursor:pointer">done</span>
                <span class="material-icons" style="cursor:pointer">delete</span>
            </span>
        </div>` 
            }
        }); // =+ because its a chain of divs
    }
}; 

// DELETE FUNCTION
const deleteDB = (activity) => { // 'activity' comes from the click on the trash bin
    let indexArray;
    activityArray.forEach((element, index) => { //element refers to the tasks inside the array
        
        if (element.activity === activity) {
            indexArray = index;
        }
    });
    activityArray.splice(indexArray, 1); // Remove the item with that indexArray(index)
    saveDB(); //call the save data base function→save in local storage and the read db.
};

// EDIT OR DONE FUNCTION
const editDB = (activity) => {
    let indexArray = activityArray.findIndex((element) => element.activity === activity); // 'activity' comes from the click on 'done'
    if (activityArray[indexArray].state === 'Pending') { //if state is pending→done. If u click it again it will be pending
        activityArray[indexArray].state = 'Done';
    } else {
        activityArray[indexArray].state = 'Pending';
    }
    saveDB();
};

        
//EVENTLISTENER

//SAVE BUTTON
$form.addEventListener('submit', (e) => { 
    e.preventDefault(); //to prevent site refresh
    
    let $activity = document.querySelector('#activity').value; //get the input text of every activity

    createItem($activity); //Calls createItem with vale of activity
    saveDB(); // calls to save in localStorage

    $form.reset(); //makes the form clean again afert a submit
});

// Load tasks from localStorage when open the web.
document.addEventListener('DOMContentLoaded', readDB); 

//CLICKS ON BUTTONS DONE AND TRASH BIN
$activityList.addEventListener('click', (e) => { 
    e.preventDefault();
    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let text = e.path[2].childNodes[3].innerHTML; //Show me text of which activity you have clicked on
        if (e.target.innerHTML === 'delete') { //'delete' depends on the button→HTML
            deleteDB(text);
        }
        if (e.target.innerHTML === 'done') {
            editDB(text);
        }
    }
});



