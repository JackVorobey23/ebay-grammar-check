import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import TextCheck from "./components/TextCheck";
import EbayCheck from "./components/EbayCheck";
import PageEnum from "./enums/PageEnum";

function App() {
  const [page, setPage] = useState<PageEnum>(PageEnum.EbaySearch);
  return (
    <>
      <h1>Ebay grammar checker</h1>
      <Menu page={page} setPage={setPage} />
      {page === PageEnum.EbaySearch ? <EbayCheck /> : <TextCheck />}
    </>
  );
}

export default App;
