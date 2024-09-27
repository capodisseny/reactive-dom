
function renderObject(obj){


    if(typeof obj != "object") return document.createTextNode(obj)

    if(obj.type == "text") {
         return   document.createTextNode(obj.textContent.filter(v=>typeof v == "string").join(""))
    }

    const element = document.createElement(obj.type)


    if(!obj.children) return element
    obj.children.forEach(child => {
        child = renderObject(child)
        element.appendChild(child)
    });

    return element

}

