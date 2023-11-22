async function searchCommunes() {
    var searchTerm = document.getElementById("communeInput").value;

    try {
        const response = await fetch(
            `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
                searchTerm
            )}&fields=nom,population,code,codesPostaux,departement,region&format=json&geometry=centre&boost=population`
        );

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Erreur de recherche :', error);
        document.getElementById("resultCount").innerText = "Erreur de recherche. Veuillez réessayer.";
        document.getElementById("communeList").innerHTML = "";
    }
}

function displayResults(communes) {
    var resultCountElement = document.getElementById("resultCount");
    var communeListElement = document.getElementById("communeList");

    resultCountElement.innerText = "";
    communeListElement.innerHTML = "";

    if (communes.length === 0) {
        resultCountElement.innerText = "Aucune commune trouvée.";
    } else {
        resultCountElement.innerText = `Nombre de résultats : ${communes.length}`;

        communes.forEach(commune => {
            var region = commune.region ? commune.region.nom : 'N/A';
            var codesPostaux = commune.codesPostaux ? commune.codesPostaux.join(", ") : 'N/A';

            var listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Nom de la commune:</strong> ${commune.nom}<br>
                <strong>Population:</strong> ${commune.population}<br>
                <strong>Région:</strong> ${region}<br>
                <strong>Département:</strong> ${commune.departement.nom}<br>
                <strong>Codes postaux:</strong> ${codesPostaux}<br>
                <strong>Code de la commune:</strong> ${commune.code}
            `;
            communeListElement.appendChild(listItem);
        });
    }
}
