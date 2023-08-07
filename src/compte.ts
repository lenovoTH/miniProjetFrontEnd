const api1 = "http://127.0.0.1:8000/api"
const fourn = document.getElementById('fournisseur') as HTMLSelectElement
const phone = document.getElementById('telephone') as HTMLInputElement
const bntAjout = document.getElementById('ajouter') as HTMLButtonElement

bntAjout.addEventListener('click', () => {

    fetch(api1 + "/compte", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify({
            fournisseur: fourn.value,
            telephone: phone.value
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        });
});







