import { proizvodi } from "./podaci.js";

const katalog = document.getElementById("katalog");
const brojac = document.getElementById("brojac");
const praznoStanje = document.getElementById("prazno-stanje");

function izradiKarticu(proizvod) {
  const kartica = document.createElement("article");
  kartica.classList.add("kartica");

  kartica.dataset.id = proizvod.id;

  if (proizvod.cijena >= 100) {
    kartica.classList.add("skuplji");
  } else {
    kartica.classList.add("standardni");
  }

  const slika = document.createElement("img");
  slika.src = proizvod.slika;
  slika.alt = `Slika proizvoda: ${proizvod.naziv}`;
  slika.loading = "lazy";

  const kategorija = document.createElement("p");
  kategorija.classList.add("kategorija");
  kategorija.textContent = proizvod.kategorija;

  const naziv = document.createElement("h2");
  naziv.textContent = proizvod.naziv;

  const cijena = document.createElement("p");
  cijena.classList.add("cijena");
  cijena.textContent = new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR"
  }).format(proizvod.cijena);

  const poveznica = document.createElement("a");
  poveznica.href = proizvod.poveznica;
  poveznica.textContent = "Pogledaj proizvod";
  poveznica.target = "_blank";
  poveznica.rel = "noopener noreferrer";

  kartica.append(
    slika,
    kategorija,
    naziv,
    cijena,
    poveznica
  );

  return kartica;
}

function prikaziKatalog(popis) {
  katalog.replaceChildren();

  brojac.textContent = popis.length;
  praznoStanje.hidden = popis.length !== 0;

  if (popis.length === 0) {
    return;
  }

  const kartice = popis.map(izradiKarticu);
  katalog.append(...kartice);
}

const odabranaKategorija = "Sve";

const filtriraniProizvodi = proizvodi.filter((proizvod) => {
  return odabranaKategorija === "Sve" ||
    proizvod.kategorija === odabranaKategorija;
});


filtriraniProizvodi.sort((a, b) => a.cijena - b.cijena);


prikaziKatalog(filtriraniProizvodi);

