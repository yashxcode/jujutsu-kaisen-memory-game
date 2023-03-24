const section = document.querySelector("section")
const playerLivesCount = document.querySelector("span")
let playerLives = 10

playerLivesCount.textContent = playerLives

const getData = () => [
    { imgSrc: "./images/inumaki.jpg", name: "inumaki" },
    { imgSrc: "./images/itadori.jpg", name: "itadori" },
    { imgSrc: "./images/maki.jpg", name: "maki" },
    { imgSrc: "./images/megumi.jpg", name: "megumi" },
    { imgSrc: "./images/nobara.jpg", name: "nobara" },
    { imgSrc: "./images/panda.jpg", name: "panda" },
    { imgSrc: "./images/satoru.jpg", name: "satoru" },
    { imgSrc: "./images/yuta.jpg", name: "yuta" },
    { imgSrc: "./images/inumaki.jpg", name: "inumaki" },
    { imgSrc: "./images/itadori.jpg", name: "itadori" },
    { imgSrc: "./images/maki.jpg", name: "maki" },
    { imgSrc: "./images/megumi.jpg", name: "megumi" },
    { imgSrc: "./images/nobara.jpg", name: "nobara" },
    { imgSrc: "./images/panda.jpg", name: "panda" },
    { imgSrc: "./images/satoru.jpg", name: "satoru" },
    { imgSrc: "./images/yuta.jpg", name: "yuta" }
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}

// Generating the HTML

const cardGenerator = () => {
    const cardData = randomize()
    cardData.forEach((item, index) => {
        const card = document.createElement("div")
        const face = document.createElement("img")
        const back = document.createElement("div")
        card.classList = "card"
        face.classList = "face"
        back.classList = "back"

        face.src = item.imgSrc
        card.setAttribute("name", item.name)

        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard")
            checkCards(e)
        })
    })
}

const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add("flipped")
    const flippedCards = document.querySelectorAll(".flipped")
    const toggleCard = document.querySelectorAll(".toggleCard")

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("match")
            flippedCards.forEach(card => {
                card.classList.remove("flipped")
                card.style.pointerEvents = "none";
            })
        } else {
            console.log("unmatched")
            flippedCards.forEach(card => {
                card.classList.remove("flipped")
                setTimeout(() => card.classList.remove("toggleCard"), 1000)
            })
            playerLives--
            playerLivesCount.textContent = playerLives
            if (playerLives === 0) {
                restart("Try again, Gambare Gambare!")
            }
        }
    }
    if (toggleCard.length === 16) {
        restart("C'mon man, that's too EZ!")
    }
}

const restart = (text) => {
    let cardData = randomize()
    let faces = document.querySelectorAll(".face")
    let cards = document.querySelectorAll(".card")
    section.style.pointerEvents = "none"
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard")
        setTimeout(() => {
            cards[index].style.pointerEvents = "all"
            faces[index].src = item.imgSrc
            cards[index].setAttribute('name', item.name)
            section.style.pointerEvents = "all"
        }, 1000)
    })
    playerLives = 10
    playerLives.textContent = playerLives
    setTimeout(() => window.alert(text), 100)
}

cardGenerator()