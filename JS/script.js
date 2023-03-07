history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// Calcul Tarifs
var m2 = 0;
var panier = 0;
var order = 0;

const contenuPanier = document.querySelector("#contenuPanier");
const total = document.querySelector("#total");
const MessagepanierVide = document.querySelector("#cvide");
objets = document.querySelectorAll(".card");

const objetsAjoutes = [];

// Ouvrir ou fermer Panier
document.querySelector("#panier").addEventListener("click", function () {
  document.querySelector(".croix").classList.toggle("pop");
  document.querySelector("#paniertout").classList.toggle("active");
});

// Reset Panier
document.querySelector("#vider").addEventListener("click", function () {
  panier = 0;
  order = 0;
  total.textContent = panier + " €";
  contenuPanier.innerHTML =
    '<div id="cvide"><img src="IMG/shopping-cart.png" alt="">Votre panier est vide</div>';
  objetsAjoutes.length = 0;
});

// Ajout des objets au panier
objets.forEach((e) => {
  e.addEventListener("click", function () {
    document.querySelector("#cvide").style.display = "none";
    // Si l'objet n'est pas déja dans la liste
    if (!objetsAjoutes.includes(this)) {
      objetsAjoutes.push(this);
      var prix = parseInt(this.getAttribute("data-prix"));
      panier += prix;
      total.textContent = panier + " €";
      console.log(panier);

      // Ajouter l'objet à la liste
      var nom = this.getAttribute("data-nom");
      var article = document.createElement("div");
      article.classList.add("panier-item");
      article.innerHTML = nom + " - " + prix + " €";
      contenuPanier.appendChild(article);
    }
  });
});

// Afficher le prix réel
const surfaceInput = document.querySelector(".surface");

function updateTotal() {
  const surface = parseInt(surfaceInput.value);
  const prixTotal = surface * panier;
  total.textContent = calculprix() + " €";
}

setInterval(updateTotal, 10);

function calculprix() {
  var total = 0;
  var surface = document.querySelector(".surface").value;
  objetsAjoutes.forEach((truc) => {
    var prix = parseInt(truc.getAttribute("data-prix"));
    var calcul = truc.getAttribute("data-calcul");
    if (calcul === "oui") {
      total += prix * surface;
    } else {
      total += prix;
    }
  });
  return total;
}

// Valider Panier
document.querySelector("#valider").addEventListener("click", function () {
  m2 = document.querySelector(".surface").value;
  order = calculprix();
  panier = 0;
  document.querySelector('#app').classList.remove('hidden');
});