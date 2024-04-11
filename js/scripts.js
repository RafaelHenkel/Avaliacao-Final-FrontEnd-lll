const divFooter = document.getElementById("info-footer");
const rowCards = document.getElementById("row-cards");

let acc = 1;

const getInfos = async () => {
  try {
    const character = await api.get("/character");
    const amountCharacter = character.data.info.count;

    const location = await api.get("/location");
    const amountLocation = location.data.info.count;

    const episode = await api.get("/episode");
    const amountEpisode = episode.data.info.count;

    divFooter.innerHTML = `<p>PERSONAGENS: <span>${amountCharacter}</span></p> <p>LOCALIZAÇÕES: <span>${amountLocation}</span></p><p> EPISÓDIOS: <span>${amountEpisode}</span></p>`;
  } catch (error) {
    console.log(error);
  }
};

getInfos();

const getCharacters = async () => {
  try {
    const response = await api.get(`character/[${acc++},${acc++},${acc++},${acc++},${acc++},${acc++}]`);
    const characters = response.data;

    characters.forEach((character, index) => {

      let htmlCard = `
      <div class="col-6">
        <div class="card mb-3">
          <div class="row g-0" id="row-cards">
            <div class="col-md-5">
              <img src="${character.image}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h2 class="card-title text-white fw-bold">${character.name}</h2>
                <p class="card-text text-white status-text">
                <span class="${character.status}"></span>
                ${character.status} - ${character.species}
                </p>
                <p class="card-text my-text-body">
                  Última localização conhecida </br>
                  <span class="text-white">${character.location.name}</span>
                </p>
                <p class="card-text ">
                </p>
                <p class="card-text my-text-body">
                  Último episódio visto: </br>
                  <span class="text-white">//</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
      if (index > 4) {
        htmlCard = '<div class="col-6"></div>' + htmlCard;
      }

      rowCards.innerHTML += htmlCard;

    });
    
  } catch (error) {
    console.log(error);
  }
};

getCharacters();

const prevPage = () => {
  if (acc > 7) {
    acc -= 12;
    rowCards.innerHTML = ``;
    getCharacters();
  }
};

const nextPage = () => {
  rowCards.innerHTML = ``;
  getCharacters();
};

const searshCharacter = async () => {};
