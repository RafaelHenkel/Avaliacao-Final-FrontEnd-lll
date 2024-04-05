const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

const divFooter = document.getElementById("info-footer");

const getCharacter = async () => {
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

getCharacter();
