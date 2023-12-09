import { useState, useEffect } from "react";

const useGrammar = () => {
  const [grammarResult, setGrammarResult] = useState('');

  const checkGrammar = async () => {
    const url = "https://jspell-checker.p.rapidapi.com/check";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace 'YOUR_RAPIDAPI_KEY' with your actual RapidAPI key
        "X-RapidAPI-Host": "jspell-checker.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: "enUS",
        fieldvalues: "thiss is intresting",
        config: {
          forceUpperCase: false,
          ignoreIrregularCaps: false,
          ignoreFirstCaps: true,
          ignoreNumbers: true,
          ignoreUpper: false,
          ignoreDouble: false,
          ignoreWordsWithNumbers: true,
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setGrammarResult(result);
    } catch (error) {
      console.error(error);
      setGrammarResult('');
    }
  };

  useEffect(() => {
    checkGrammar();
  }, []);

  return grammarResult;
};

export default useGrammar;
