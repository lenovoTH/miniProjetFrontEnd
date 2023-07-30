
const apiUrl1 = "http://127.0.0.1:8000/api/transactions"
const apiUrl2 = "http://127.0.0.1:8000/api/clients"
// const apiHistorique = "http://127.0.0.1:8000/api/historiques/numero/774715759/fournisseur/orange_money"
const telExp = document.getElementById('telexp') as HTMLInputElement;
const nomExp = document.getElementById('nomexp') as HTMLInputElement;
const montant = document.getElementById('montant') as HTMLInputElement;
const fournisseur = document.getElementById('fournisseur') as HTMLInputElement;
const typeTrans = document.getElementById('typetrans') as HTMLInputElement;
const telDest = document.getElementById('teldest') as HTMLInputElement;
const nomDest = document.getElementById('nomdest') as HTMLInputElement;
const divdestinataire = document.getElementById('divdestinataire') as HTMLInputElement;
const trans = document.querySelector('.trans') as HTMLElement;
const icone = document.getElementById('icone') as HTMLInputElement;
const btn = document.querySelector('.btn') as HTMLInputElement;

btn.addEventListener('click', () => {
    fetch(apiUrl1, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            expediteur: telExp.value,
            montant: montant.value,
            fournisseur: fournisseur.value,
            typetransaction: typeTrans.value,
            recepteur: telDest.value,
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
})

typeTrans.addEventListener('change', () => {
    if (typeTrans.value == "retrait") {
        divdestinataire.style.display = 'none'
    }
    else {
        divdestinataire.style.display = 'flex'
    }
})

fournisseur.addEventListener('input', () => {
    if (fournisseur.value === "orange_money") {
        trans.style.color = 'orange'
    } else if (fournisseur.value === "wave") {
        trans.style.color = 'blue'
    } else if (fournisseur.value === "wari") {
        trans.style.color = 'green'
    } else if (fournisseur.value === "cb") {
        trans.style.color = 'red'
    }
})


