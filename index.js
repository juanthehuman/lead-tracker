let myLeads = []

// Convert myLeads string to array
// myLeads = JSON.parse(myLeads)

// // Push a new value to the array
// myLeads.push("https://www.legendarylead.com")

// // Convert it back to string
// myLeads = JSON.stringify(myLeads)

// Confirm if the type of myLeads variable is string
// if (typeof myLeads === "string") {
//     console.log("Confirmed! It is now a string!")
// } else {
//     console.log("Something went wrong along the algorithm")
// }

const saveBtn = document.querySelector("#save-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

// Get value(leads) from the localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// check if leadsfromStorage is true
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // push to myLeads array
        myLeads.push(tabs[0].url)
        myLeads = JSON.stringify(myLeads)
        localStorage.setItem("myLeads", myLeads)
        myLeads = JSON.parse(myLeads)
        render(myLeads)
    })
})

// Refactor the function change its name and passing one argument.
function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {

        //listItems += '<li><a target="_blank" href="' + myLeads[i] + '">' + myLeads[i] + '<a/></li>'
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
                </a>
            </li>
        `

        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"

        // different method
        // create element
        // const li = document.createElement("li")
        // set li's text content
        // li.textContent = myLeads[i]
        // append li to ul
        // ulEl.append(li)
    }

    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// log to the console the the value fetched from the variable
console.log(leadsFromLocalStorage)

saveBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""

    // Convert myLeads object to string
    myLeads = JSON.stringify(myLeads)
    // Save myLeads to localStorage
    localStorage.setItem("myLeads", myLeads)
    // Convert back myLeads string to object
    myLeads = JSON.parse(myLeads)

    render(myLeads)

    // log to the console the saved myLeads
    // console.log(localStorage.getItem("myLeads"))
})

// Save a key-value pair in localStorage
// localStorage.setItem("myLeads", "https://www.examplelead.com")

// get the value from localStorage and log it to the console.
// console.log(localStorage.getItem("myLeads"))

// clear the localStorage
// localStorage.clear()