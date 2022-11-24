let dataNFT = [];
const inputSearch = document.getElementById('inputSearch')
const buttonSearch = document.getElementById('buttonSearch')


function createCard(NFT) {
    const card = document.createElement('div')
    card.classList.add('card')

        const cardTop = document.createElement('div')
        cardTop.classList.add('card-top')
        
            const cardImage = document.createElement('img')
            cardImage.classList.add('card-image')
            cardImage.src = NFT.image_url
            
            const cardButtons = document.createElement('div')
            cardButtons.classList.add('card-buttons')
            
                const buttonFav = document.createElement('button')
                buttonFav.classList.add('card-fav')
                //buttonFav.innerHTML = "<i class='bx bx-star'></i>"
                let favicon = document.createElement('i')
                favicon.classList.add('bx','bx-star')
                if(hasFav(NFT.id)){
                    favicon.classList.add('fav-color')
                }
                favicon.id = "favori" + NFT.id
                buttonFav.appendChild(favicon)
                buttonFav.addEventListener('click', () =>{
                    console.log(localStorage.favoris)
                    document.getElementById("favori"+ NFT.id).classList.toggle('fav-color')
                    /*recuperer la liste des id favori, verifier qu'ils sont dedant, ajouter et supprimer en fonction de la présence*/
                    let favori = getFav()
                    if(hasFav(NFT.id)){
                        deleteFavorite(NFT.id)
                    }
                    else{
                        setFav(NFT.id)
                    }
                })
                
                const buttonPanier = document.createElement('button')
                buttonPanier.classList.add('card-panier')
                //buttonPanier.innerHTML = "<i class='bx bx-cart'></i>"
                let paniericon = document.createElement('i')
                paniericon.classList.add('bx', 'bx-cart')
                if(hasPanier(NFT.id)){
                    paniericon.classList.add('fav-color')
                }
                paniericon.id = "panier" + NFT.id
                buttonPanier.appendChild(paniericon)
                buttonPanier.addEventListener('click', () =>{
                    document.getElementById("panier"+ NFT.id).classList.toggle('fav-color')
                    /*recuperer la liste des id favori, verifier qu'ils sont dedant, ajouter et supprimer en fonction de la présence*/
                    let panier = getPanier()
                    if(hasPanier(NFT.id)){
                        deletePanier(NFT.id)
                    }
                    else{
                        setPanier(NFT.id)
                    }
                })
            
        const cardInfos = document.createElement('div')
        cardInfos.classList.add('card-infos')
        
            const cardName = document.createElement('p')
            cardName.classList.add('card-name')
            cardName.innerHTML = NFT.name;
            
            const cardCreator = document.createElement('p')
            cardCreator.classList.add('card-creator')
            cardCreator.innerHTML = "<i class='bx bxs-user' style='color:#FF7F50'></i> <span>Créateur: </span>" + NFT.creator.username;

            const cardSales = document.createElement('p')
            cardSales.classList.add('card-sales')
            cardSales.innerHTML = "<i class='bx bx-money-withdraw' style='color:#FF7F50'></i> <span>Nombre de ventes: </span>" + NFT.sales;

            const cardCollection = document.createElement('p')
            cardCollection.classList.add('card-collection')
            cardCollection.innerHTML = "<i class='bx bxs-collection' style='color:#FF7F50'  ></i> <span>Collection: </span>" + NFT.collection.name;

            const buttonInfos = document.createElement('button')
            buttonInfos.classList.add('card-detail')
            buttonInfos.innerHTML = "Plus d'informations <i class='bx bx-plus'></i>"
            buttonInfos.setAttribute('onclick','toggleSide(this)');

        const cardInfosDetails = document.createElement('div')
        cardInfosDetails.classList.add('card-infos-details')

            const cardNameDetail = document.createElement('p')
            cardNameDetail.classList.add('card-name')
            cardNameDetail.innerHTML = NFT.name;

            const buttonInfosDetails = document.createElement('button')
            buttonInfosDetails.classList.add('card-detail')
            buttonInfosDetails.innerHTML = "Plus d'informations <i class='bx bx-plus'></i>"
            buttonInfosDetails.setAttribute('onclick','toggleSide(this)');

            const description = document.createElement('p')
            description.classList.add('description')
            description.innerHTML = NFT.description;
            


            document.getElementById('elements').append(card)
                card.append(cardTop)
                    if(NFT.image_url != "") cardTop.append(cardImage)
                    cardTop.append(cardButtons)
                        cardButtons.append(buttonFav)
                        cardButtons.append(buttonPanier)
                    cardInfos.append(cardName)
                    cardInfos.append(cardCreator)
                    cardInfos.append(cardSales)
                    cardInfos.append(cardCollection)
                    card.append(cardInfos)
                    cardInfosDetails.append(cardNameDetail)
                    cardInfosDetails.append(description)
                    cardInfosDetails.append(buttonInfosDetails)
                    card.append(cardInfosDetails)
                    cardInfos.append(buttonInfos)
    
}

async function afficherNftParPages() {
    for (let j = 1; j <= 5; j++) {
        
        await fetch('https://awesome-nft-app.herokuapp.com/?page=' + j)
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    for (let i = 0; i < data.assets.length; i++) {
                        data.assets[i].creator.username = data.assets[i].creator.username || " inconnu";
                        dataNFT.push(data.assets[i]);
                    }
                })
            } else {
                console.log('ERREUR');
                document.getElementById('erreur').innerHTML = "Erreur"
            }
        })
    }
    
    for (let k = 0; k < dataNFT.length; k++) {
        createCard(dataNFT[k]);
    }
}


function toggleSide(e) {
    const card = e.parentElement.parentElement;
    console.log(card);
    if(e.parentElement.classList.contains('card-infos'))
    {
        card.children[1].style.display = "none";
        card.children[2].style.display = "flex";        
    }
    if(e.parentElement.classList.contains('card-infos-details'))
    {
        card.children[1].style.display = "flex";
        card.children[2].style.display = "none";        
    }
}






let selectFilter = document.getElementById('select-filter');
selectFilter.addEventListener('change', () => {
    gestionFiltre(selectFilter.value)
});

async function gestionFiltre(val) {
    const allCards = document.getElementById('elements');
    allCards.innerHTML = "";
    let newDataNFT = [... dataNFT];

    switch (val) {
        case 'search' :
            console.log(inputSearch.value)
            newDataNFT = await getDataBySearch(inputSearch.value);
        break;
        case 'createurs':
            newDataNFT.sort((a, b) => a.creator.username.localeCompare(b.creator.username)); 
        break;
        case 'ventes':
            newDataNFT.sort((a, b) => b.sales - a.sales);
        break;
    }
    for (let k = 0; k < newDataNFT.length; k++) {
        createCard(newDataNFT[k]);
    }
}

async function getDataBySearch(valueInput) {
    let dataList = [];
    await fetch('https://awesome-nft-app.herokuapp.com/search?q=' + valueInput)
        .then(response => {
            return response.json()
        }).then(async data => {
            for (let i = 0; i < data.assets.length; i++) {
                data.assets[i].creator.username = data.assets[i].creator.username || " inconnu";
                dataList.push(data.assets[i]);
            }
        })
    return dataList;
}


buttonSearch.addEventListener('click', () => {
    gestionFiltre('search')
})


afficherNftParPages();


/*--------fonction favori-------*/
function getFav(){
    return  JSON.parse(localStorage.getItem("favoris"))|| [] 
}

function setFav(id){
    let favList = getFav()
    favList.push(id)
    localStorage.setItem("favoris", JSON.stringify(favList));
}

function deleteFavorite(id){
    let favoriList = getFav()
    favoriList = favoriList.filter ( FVid => FVid != id)
    localStorage.setItem("favoris", JSON.stringify(favoriList));
}

function hasFav(id) {
    let favoriList = getFav()
    return favoriList.includes(id) 
}



 /*--------fonction panier-------*/
 function getPanier(){
    return  JSON.parse(localStorage.getItem("paniers"))|| [] 
 }

  function setPanier(id){
     let panierList = getPanier()
     panierList.push(id)
       localStorage.setItem("paniers", JSON.stringify(panierList));
 }
 
 
 function deletePanier(id){
     let panList = getPanier()
     panList = panList.filter ( PNid => PNid != id)
    localStorage.setItem("paniers", JSON.stringify(panList));
 }

 function hasPanier(id) {
     let panList = getPanier()
     return panList.includes(id)
 }