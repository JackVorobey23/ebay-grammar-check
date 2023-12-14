const getUaSpellChecking = async (text: string) => {

    const queryString = text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/ /g, ',');
    const response = await fetch(
        `http://localhost:8080/get-incorrect-words/?words=${queryString}`,
        {
            method: "POST",
        }
    ).catch((error) => {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
    });
    const responseData = await response.text();

    return responseData;
};

export default getUaSpellChecking;
