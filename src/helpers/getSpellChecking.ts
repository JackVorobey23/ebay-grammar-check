export const getSpellChecking = async (query: string) => {
  const myHeaders = new Headers();
  myHeaders.append("apikey", import.meta.env.VITE_SPELL_CHECKER_API_KEY);

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `https://api.apilayer.com/spell/spellchecker?q=${query}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const getEbayGoods = async (searchString: string, goodsAmount: number) => {
  const requestOptions: RequestInit = {
    method: "GET",
  };
  const requestLink = `${
    import.meta.env.VITE_EBAY_API_BASE_URL
  }?search_string=${searchString}&amount=${goodsAmount}`;

  const response = await fetch(requestLink, requestOptions);

  const goods: string[] = JSON.parse(await response.text());
  return goods;
};
