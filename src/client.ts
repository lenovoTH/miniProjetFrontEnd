const api = "http://127.0.0.1:8000/api/"
const prenom = document.getElementById('prenom') as HTMLInputElement
const nom = document.getElementById('nom') as HTMLInputElement
const telephone = document.getElementById('telephone') as HTMLInputElement
const bntAjouter = document.getElementById('ajouter') as HTMLButtonElement


bntAjouter.addEventListener('click', () => {
    fetch(api + "client", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify({
            prenom: prenom.value,
            nom: nom.value,
            telephone: telephone.value
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
})









