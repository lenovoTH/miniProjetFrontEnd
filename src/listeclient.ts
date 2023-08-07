
const apiur = "http://127.0.0.1:8000/api/"
const tbody = document.querySelector('tbody') as HTMLElement;


fetch(apiur + "clientsbycompte")
    .then(res => res.json())
    .then((data) => {
        // console.log(data);
        data.forEach((element: any) => {
            const { client, fournisseur, id, statut } = element
            tbody.innerHTML += `<tr> 
            <td>
                <div class="d-flex align-items-center">
                    <div class="ms-3">
                        <p class="fw-bold mb-1">${client.nom}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="fw-normal mb-1">${client.prenom}</p>
            </td>
            <td>
                <p class="fw-normal mb-1">${client.telephone}</p>
            </td>
            <td>
            <p class="fw-normal mb-1">${fournisseur}</p>
        </td>
            <td>
                <a class="badge btn badge-danger d-inline" onClick="fermer(${id},'fermer')">fermer</a>
            </td>
            <td>
                <a class="badge btn badge-warning d-inline" onClick="fermer(${id},'${statut}')">
                ${statut == 'bloquer' ? 'debloquer' : 'bloquer'}</a>
            </td>
            </tr>`
        });
    })


function fermer(id: number, statut: string) {

    // console.log(statut);
    fetch(apiur + "fermer", {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            id: id,
            statut: statut == 'bloquer' ? 'ouvert' : statut == 'fermer' ? 'fermer' : 'bloquer' 
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}




