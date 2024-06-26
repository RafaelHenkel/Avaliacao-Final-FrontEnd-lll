const divFooter = document.getElementById("info-footer");
const rowCards = document.getElementById("row-cards");

let acc = 1;

const getCharacters = () => {
  api
    .get(`/character/[${acc++},${acc++},${acc++},${acc++},${acc++},${acc++}]`)
    .then(function (response) {
      const characters = response.data;

      characters.map(function (character, index) {
        const episodeUrl = character.episode.at(-1);

        let htmlCard = `
      <div class="col-6">
        <div class="card mb-3">
          <div class="row g-0" id="row-cards">
            <div class="col-md-5">
              <img src="${character.image}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-7">
              <div class="card-body">
              <a href='' data-bs-toggle="modal" data-bs-target="#exampleModal${character.id}"class="card-title text-white">
                ${character.name}
              </a>
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
                  <span class="text-white" id="last-episode-${character.id}"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal${character.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">${character.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column">
              <img src="${character.image}" alt="" />
              <div class="mt-3">
              <p class="card-text text-white status-text">
              Status:   
              ${character.status}
                <span class="${character.status} mx-2"></span>
              </p>
                <p>Especie: ${character.species}</p>
                <p>Gênero: ${character.gender}</p>
                <p>Origem: ${character.origin.name}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
      `;

        if (index > 4) {
          htmlCard = '<div class="col-6"></div>' + htmlCard;
        }

        rowCards.innerHTML += htmlCard;
        api
          .get(episodeUrl)
          .then(function (episode) {
            const labelEpisode = document.getElementById(`last-episode-${character.id}`);
            const episodeName = episode.data.name;
            labelEpisode.innerHTML = episodeName;
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

getCharacters()

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

const searchCharacter = async () => {
  try {
    const inputValue = document.getElementById("search-input-value").value.toLowerCase();

    const response = await api.get(`/character/?name=${inputValue}`);
    const characters = response.data.results;
    console.log(characters);

    rowCards.innerHTML = ``;
    characters.map(async function (character, index) {
      const episodeUrl = character.episode.at(-1);

      const episode = await api.get(episodeUrl);

      const episodeName = episode.data.name;

      if (index < 6) {
        let htmlCard = `
      <div class="col-6">
        <div class="card mb-3">
          <div class="row g-0" id="row-cards">
            <div class="col-md-5">
              <img src="${character.image}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-7">
              <div class="card-body">
              <a href='' data-bs-toggle="modal" data-bs-target="#exampleModal${character.id}"class="card-title text-white">
                ${character.name}
              </a>
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
                  <span class="text-white">${episodeName}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal${character.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">${character.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column">
              <img src="${character.image}" alt="" />
              <div class="mt-3">
              <p class="card-text text-white status-text">
              Status:   
              ${character.status}
              <span class="${character.status} mx-2"></span>
              </p>
                <p>Especie: ${character.species}</p>
                <p>Gênero: ${character.gender}</p>
                <p>Origem: ${character.origin.name}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
      `;
        if (index > 4) {
          htmlCard = '<div class="col-6"></div>' + htmlCard;
        }

        rowCards.innerHTML += htmlCard;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
