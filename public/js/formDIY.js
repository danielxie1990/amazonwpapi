const addUrl = document.querySelector(".addUrl")
const btn_remove = document.querySelector(".btn-remove")
const input_container = document.querySelector(".input-container")
const keyword = document.querySelector(".keyword")
const inUrl = document.querySelector(".inUrl")
const btn_add = document.querySelector(".btn-add")

let kwNum = 0
function createUrl(currentContainer,kw) {
    let keyword = kw.replace(" ", "-")
    let fieldset= document.createElement("div")
    fieldset.className = "input-container--row mb-3 row"

    let leftCol = document.createElement("div")
    leftCol.className = "col-8"

    let centerCol = document.createElement("div")
    centerCol.className = "col-2"

    let rightCol = document.createElement("div")
    rightCol.className = "col-2"
    
    let urlInput = document.createElement("input")
    urlInput.type = "url"
    urlInput.name = "url"
    urlInput.placeholder = "Amazon Product Url"
    urlInput.className = "form-control mb-1"

    leftCol.appendChild(urlInput)

    let numInput = document.createElement("input")
    numInput.type = "number"
    numInput.name = "percentage"
    numInput.placeholder = "percentage"
    numInput.className = "form-control mb-1"

    centerCol.appendChild(numInput)

    let btnRemove = document.createElement("button")
    btnRemove.type = "button"
    btnRemove.innerText = "Remove"
    btnRemove.className = "btn-remove btn btn-danger"
    btnRemove.addEventListener('click', (e)=>{
        e.target.parentNode.parentNode.remove()
    })

    rightCol.appendChild(btnRemove)

    fieldset.appendChild(leftCol)
    fieldset.appendChild(centerCol)
    fieldset.appendChild(rightCol)
    

    currentContainer.appendChild(fieldset)
}
addUrl.addEventListener('click', (e)=>{
    let currentContainer = e.target.parentNode
    console.log("clicked")
    let kw = keyword.value
    if (kw !== "") {
        createUrl(currentContainer,kw)
    } else {
        alert("Keyword Can Not Be Empty!!!")
    }
})




