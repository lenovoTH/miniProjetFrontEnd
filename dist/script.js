const apiUrl1 = "http://127.0.0.1:8000/api/transactions";
const apiUrl2 = "http://127.0.0.1:8000/api/clients";
// const apiHistorique = "http://127.0.0.1:8000/api/historiques/numero/774715759/fournisseur/orange_money"
const telExp = document.getElementById('telexp');
const nomExp = document.getElementById('nomexp');
const montant = document.getElementById('montant');
const fournisseur = document.getElementById('fournisseur');
const typeTrans = document.getElementById('typetrans');
const telDest = document.getElementById('teldest');
const nomDest = document.getElementById('nomdest');
const divdestinataire = document.getElementById('divdestinataire');
const trans = document.querySelector('.trans');
const icone = document.getElementById('icone');
const btn = document.querySelector('.btn');
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
    });
});
typeTrans.addEventListener('change', () => {
    if (typeTrans.value == "retrait") {
        divdestinataire.style.display = 'none';
    }
    else {
        divdestinataire.style.display = 'flex';
    }
});
fournisseur.addEventListener('input', () => {
    if (fournisseur.value === "orange_money") {
        trans.style.color = 'orange';
    }
    else if (fournisseur.value === "wave") {
        trans.style.color = 'blue';
    }
    else if (fournisseur.value === "wari") {
        trans.style.color = 'green';
    }
    else if (fournisseur.value === "cb") {
        trans.style.color = 'red';
    }
});
