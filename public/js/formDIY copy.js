const addUrl = document.querySelector(".addUrl")
const btn_remove = document.querySelector(".btn-remove")
const input_container = document.querySelector(".input-container")
const keyword = document.querySelector(".keyword")
const inUrl = document.querySelector(".inUrl")
const btn_add = document.querySelector(".btn-add")

let kwNum = 2
function createUrl(currentContainer,kw) {
    let keyword = kw.replace(" ", "_")
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
    urlInput.name = keyword + "_url"
    urlInput.placeholder = "Amazon Product Url"
    urlInput.className = "form-control mb-1"

    leftCol.appendChild(urlInput)

    let numInput = document.createElement("input")
    numInput.type = "number"
    numInput.name = keyword + "_percentage"
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



function creatKeyword() {
    let newRow= document.createElement("div")
    newRow.className = "input-container--row"

    let kwInput = document.createElement("input")
    kwInput.type = "text"
    kwInput.name = "keyword" + kwNum
    kwInput.className = "keyword" + kwNum + " " + "form-control mb-1"
    kwInput.placeholder = `#${kwNum} Keyword`

    let inUrl = document.createElement("p")
    inUrl.className = "inUrl"


    let btnGroup = document.createElement("div")
    btnGroup.className = "btn-group"


    let newAddUrlBtn = document.createElement("button")
    newAddUrlBtn.type = "button"
    newAddUrlBtn.className = "addUrl btn btn-primary"
    newAddUrlBtn.innerText = "Add URL"
    newAddUrlBtn.addEventListener('click', (e)=>{
        console.log(`.keyword${kwNum-1}`)
        let kw = document.querySelector(`.keyword${kwNum-1}`).value
        let currentContainer = e.target.parentNode.parentNode
        if (kw !== "") {
            createUrl(currentContainer,kw)
        } else {
            alert("Keyword Can Not Be Empty!!!")
        }
    })

    let deletKw = document.createElement("button")
    deletKw.type = "button"
    deletKw.className = "removeKW btn btn-danger"
    deletKw.innerText = "Delete Keyword"
    deletKw.addEventListener('click', (e)=>{
        
        e.target.parentNode.parentNode.remove()
        kwNum--
    })

    btnGroup.appendChild(newAddUrlBtn)
    btnGroup.appendChild(deletKw)


    newRow.appendChild(kwInput)
    newRow.appendChild(btnGroup)
    input_container.appendChild(newRow)

    kwNum++


}

btn_add.addEventListener('click', ()=>{
    creatKeyword()
})


