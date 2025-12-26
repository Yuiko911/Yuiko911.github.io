const imagetemplate = document.getElementsByTagName('template')[0]
const mainarea = document.getElementsByTagName('main')[0]

const BASE_IMAGE_LINK = "./images/i/"

function loadImages() {
    fetch('./images/i/metadata.json')
        .then(r => r.json())
        .then(img => {
            img.forEach(e => addImage(e))
        })
        .catch(e => console.log("error fetch images : ", e))
}

function addImage({image, source, tags}) {
    let newimage = document.importNode(imagetemplate.content, true)

    newimage.querySelector("img").src = BASE_IMAGE_LINK + image
    newimage.querySelector("h1").innerText += source
    newimage.querySelector(".image-tags").innerText = tags;
    
    mainarea.appendChild(newimage)
}

loadImages()