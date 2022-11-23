const nftCardTemplate = document.querySelector("[data-nft-card-template]")
const nftCardContainer = document.querySelector("[data-nft-cards-container]")
const searchInput = document.querySelector("[data-search]")
const Form = document.querySelector("[form]")


let nfts = []
let liste = []

Form.addEventListener("submit", (e) =>{

    if(searchInput.value == ""){
        const Error = document.querySelector("[error]")
        Error.innerHTML = "champ requis"
        Error.style.color = 'red'
        e.preventDefault()
    }
})


searchInput.addEventListener("input", (e) =>{
    const value = e.target.value.toLowerCase()
    
    nfts.forEach(nft => {
        console.log(nft)
        const isvisible = nft.name.toLowerCase().includes(value) || nft.creator.toLowerCase().includes(value)
        nft.element.classList.toggle("hide", !isvisible)
        if(isvisible){
            liste = nft.url
        }
    })
})

//for (let j = 1; j <= 5; j++) {
    fetch('https://awesome-nft-app.herokuapp.com/?page=' /*+ j*/)
        .then(res => res.json())
        .then(data => {
            nfts = data.assets.map(nft => {
                const card = nftCardTemplate.content.cloneNode(true).children[0]
                const header = card.querySelector("[data-header]")
                const body = card.querySelector("[data-body]")
                header.textContent = nft.name
                body.textContent = nft.creator.username
                nftCardContainer.append(card)
                return{name: nft.name, creator: nft.creator.username, url: nft.image_url, element: card}
        });
    })
//}