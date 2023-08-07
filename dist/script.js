const API = "http://127.0.0.1:8000/api/";
const apiUrl1 = "http://127.0.0.1:8000/api/transactions";
const apiUrl2 = "http://127.0.0.1:8000/api/clients";
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
const bodymodal = document.getElementById('mod');
const code = document.getElementById('code');
const iscode = document.getElementById('iscode');
const modal2 = document.getElementById('modal2');
const btn = document.querySelector('.btn');
const tbodyy = document.querySelector('tbody');
telExp.addEventListener('input', () => {
    if (telExp.value.length == 9) {
        fetch(API + "auto", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, method: 'POST',
            body: JSON.stringify({
                telephone: telExp.value,
            })
        })
            .then(res => res.json())
            .then((data) => {
            const { prenom, nom } = data;
            nomExp.value = `${prenom} ${nom}`;
        });
    }
});
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
            is_code: iscode.value
        })
    })
        .then(res => res.json())
        .then((data) => {
        if (typeTrans.value == "depot" || typeTrans.value == "retrait") {
            console.log(data);
        }
        else if (typeTrans.value == "transfert" && iscode.checked) {
            // console.log(iscode.value);
            console.log(data);
            const { code } = data;
            modal2.innerHTML = `<div> Code: ${code} </div>`;
            modal2.style.display = 'block';
        }
        else {
            console.log(data);
        }
    });
});
const apiHistorique = "http://127.0.0.1:8000/api/historiques";
// icone.style.display='none'
icone.addEventListener('click', () => {
    // const concat = `${telExp.value}/fournisseur/${fournisseur.value}`
    fetch(apiHistorique, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify({
            telephone: telExp.value,
            fournisseur: fournisseur.value,
        })
    })
        .then(res => res.json())
        .then((data) => {
        console.log(data);
        data.forEach((element) => {
            const { transactions } = element;
            transactions.forEach((transaction, index) => {
                tbodyy.innerHTML += `
                <td>
                    <p class="fw-normal mb-1">${transaction.typetransaction}</p>
                </td>
                <td>
                    <p class="fw-normal mb-1">${transaction.montant}</p>
                </td>
                <td>
                <p class="fw-normal mb-1">${transaction.date}</p>
            </td>
            <td>
                <p class="fw-normal mb-1">${transaction.recepteur_id}</p>
            </td>
            <td>
                    ${index == transactions.length - 1 ?
                    ` <a class="badge btn badge-danger d-inline">annuler</a>` : ""}
            </td>`;
            });
        });
    });
});
typeTrans.addEventListener('change', () => {
    if (typeTrans.value == "retrait") {
        divdestinataire.style.display = 'none';
    }
    else {
        divdestinataire.style.display = 'flex';
    }
    if (typeTrans.value === "transfert") {
        code.removeAttribute('hidden');
    }
    else {
        code.setAttribute('hidden', 'hidden');
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
// const apiHistorique = "http://127.0.0.1:8000/api/historique2"
// icone.style.display='none'
// icone.addEventListener('click', () => {
//     const telExpp = document.getElementById('telexp') as HTMLInputElement;
//     fetch(apiHistorique, {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             expediteur: telExpp.value,
//         })
//     })
//         .then(res => res.json())
//         .then((data) => {
//             console.log(data);
//             data.forEach((element: any) => {
//                 const { fournisseur, numerocompte, transactions } = element
//                 transactions.forEach((transaction: any) => {
//                     const { typetransaction, montant, date, recepteur_id } = transaction
//                     bodymodal.innerHTML += `<div>fournisseur: ${fournisseur}</div>
//                                     <div>numero compte: ${numerocompte} </div>
//                                     <div>typetransaction: ${typetransaction}</div>
//                                     <div>montant: ${montant}</div>
//                                     <div>date: ${date}</div>
//                                     <div>recepteur: ${recepteur_id}</div>`
//                 });
//             });
//         })
// })
// const apiHistorique = "http://127.0.0.1:8000/api/historiques/numero/"
// // icone.style.display='none'
// icone.addEventListener('click', () => {
//     const concat = `${telExp.value}/fournisseur/${fournisseur.value}`
//     fetch(apiHistorique + concat)
//         .then(res => res.json())
//         .then((data) => {
//             // console.log(data);
//             data.forEach((element: any) => {
//                 const { fournisseur, numerocompte, transactions } = element
//                 transactions.forEach((transaction: any) => {
//                     const { typetransaction, montant, date, recepteur_id } = transaction
//                     bodymodal.innerHTML += `<div>fournisseur: ${fournisseur}</div>
//                     <div>numero compte: ${numerocompte} </div>
//                     <div>typetransaction: ${typetransaction}</div>
//                     <div>montant: ${montant}</div>
//                     <div>date: ${date}</div>
//                     <div>recepteur: ${recepteur_id}</div>`
//                 });
//             });
//         })
// })
// async function postData(apiUrl: string, data: object) {
//     // let myvar: any;
//     // fetch(apiUrl, {
//     //     headers: {
//     //         'Accept': 'application/json',
//     //         'Content-Type': 'application/json'
//     //     },
//     //     method: 'POST',
//     //     body: JSON.stringify(
//     //         data
//     //     )
//     // })
//     //     .then(res => res.json())
//     //     .then((data) => {
//     //         myvar = data
//     //         console.log(data);
//     //         // return data
//     //     })
//     // return myvar
//     let response = await fetch(apiUrl, {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }, method: 'POST', body: JSON.stringify(data)
//     })
//     let donnee = await response.json();
//     return donnee;
// }
