const getSpellChecking = (query: string) => {
  const myHeaders = new Headers();
  myHeaders.append("apikey", 'import.meta.env.VITE_SPELL_CHECKER_API_KEY');

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  return fetch(
    `https://api.apilayer.com/spell/spellchecker?q=${query}`,
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    });
};

export default getSpellChecking;
