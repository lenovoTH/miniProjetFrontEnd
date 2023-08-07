const api = "http://127.0.0.1:8000/api/";
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const telephone = document.getElementById('telephone');
const bntAjouter = document.getElementById('ajouter');
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
    });
});
