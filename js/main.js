let dataNFT = [];

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
                buttonFav.innerHTML = "<i class='bx bx-star'></i>"
                
                const buttonPanier = document.createElement('button')
                buttonPanier.classList.add('card-panier')
                buttonPanier.innerHTML = "<i class='bx bx-cart'></i>"
            
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
selectFilter.addEventListener('change', function() {

    const allCards = document.getElementById('elements');
    allCards.innerHTML = "";
    let newDataNFT = [... dataNFT];

    switch (this.value) {
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
});



// let search = document.getElementById('search');
// search.addEventListener('change', function() {

//     const allCards = document.getElementById('elements');
//     allCards.innerHTML = "";
//     let newDataNFT = [... dataNFT];

    
//     async function afficherNftParRecherche(searched) {
//         await fetch('https://awesome-nft-app.herokuapp.com/search?q=' + searched)
//         .then(response => {
//             if(response.ok) {
//                 response.json().then(data => {
//                     for (let i = 0; i < data.assets.length; i++) {
//                         data.assets[i].creator.username = data.assets[i].creator.username || " inconnu";
//                         newDataNFT.push(data.assets[i]);
//                     }
//                 })
//             }
//         })
//     }

//     for (let k = 0; k < dataNFT.length; k++) {
//         createCard(dataNFT[k]);
//     }
// });



afficherNftParPages();