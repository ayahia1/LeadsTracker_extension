
const myBtn = document.getElementById('btn'); //button element
const myInput = document.getElementById('txt'); //input element
const ulEl = document.getElementById('ul-el'); //unordered-list element
const delBtn = document.getElementById('del-btn'); //delete button
const tabBtn = document.getElementById('save-tab'); //Save button


let myleads = []; //uses to store all saved leads
let existing = new Map();

if (localStorage.getItem('MyLeads')){
    const already_existing = JSON.parse(localStorage.getItem('MyLeads'));
    for (let i = 0; i < already_existing.length; i++){
        myleads.push(already_existing[i]);
        existing.set(already_existing[i], true);
    }
    renderLeads(myleads);
}

function renderLeads(arr) {
    listItems = ``;
    for (let i = 0; i < arr.length; i++){
        listItems += ` <li> 
                        <a href = ${arr[i]} target = "__blank"> 
                            ${arr[i]} 
                        </a> 
                      </li> 
                    `
    }
    ulEl.innerHTML = listItems;
}

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

        if (!existing.get(tabs[0].url)) {
            myleads.push(tabs[0].url)
            localStorage.setItem('MyLeads', JSON.stringify(myleads))
            existing.set(tabs[0].url, true)
            renderLeads(myleads)
        }
        else {
            alert('Item already exists');
        }
    })
})


delBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myleads = [];
    ulEl.innerHTML = "";
    existing.clear();
})

myBtn.addEventListener('click', () => {
    currentInput = myInput.value;
    if (existing.get(currentInput) == true){
        alert('Item already exists');
    }
    else if (currentInput.length) {

        myleads.push(currentInput);
        myleads_str = JSON.stringify(myleads);
        localStorage.setItem('MyLeads', myleads_str);

        existing.set(currentInput, true);
        renderLeads(myleads);
    }
    myInput.value = ""
});

