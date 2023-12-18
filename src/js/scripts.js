// document.getElementById("botao-encurtar").addEventListener("click", encurtarUrl);
const botaoEncurtar = document.getElementById("botao-encurtar")
botaoEncurtar.addEventListener("click", encurtarUrl)

// document.getElementById("botao-copiar").addEventListener("click", copiar);
const botaoCopiar = document.getElementById("botao-copiar")
botaoCopiar.addEventListener("click", copiar)

function encurtarUrl() {
    let url = document.getElementById("input-url").value;

    const protocoloHttps = /^https:\/\//i;

    if (protocoloHttps.test(url)) {
        // Headers
        let headers = {
            "Content-Type": "application/json",
            // Chave API
            "apiKey": "723916e5e5a648a08703504374b0c4fd"
        };

        // Dados
        let linkRequest = {
            destination: url,
            domain: { fullName: "rebrand.ly" }
        };

        fetch("https://api.rebrandly.com/v1/links", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(linkRequest)
        })
            .then(response => response.json())
            .then(json => {
                let inputUrl = document.getElementById("input-url");
                inputUrl.value = json.shortUrl;
            })
            .catch(error => {
                console.error("Erro ao encurtar URL:", error);
                alert("Houve um erro ao encurtar a URL!");
            });
    } else {
        alert("É preciso inserir uma URL com protocolo HTTPS");
    }
}

function copiar() {
    let inputUrl = document.getElementById("input-url");

    if (!inputUrl.value) {
        alert("É preciso inserir uma URL com protocolo HTTPS");
        return;
    }

    inputUrl.select();
    inputUrl.setSelectionRange(0, inputUrl.value.length);

    navigator.clipboard.writeText(inputUrl.value);

    alert(`URL copiada: ${inputUrl.value}`);
}
