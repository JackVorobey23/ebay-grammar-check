import PageEnum from "../../enums/PageEnum";
import "./styles.css";

interface MenuProps {
  page: PageEnum;
  setPage: React.Dispatch<React.SetStateAction<PageEnum>>;
}
const Menu = ({ page, setPage }: MenuProps) => {
  return (
    <div className="d-flex justify-content-evenly">
      <h2>get text from:</h2>
      <ul className="menu-nav">
        <li>
          <button
            className={`nav-button ${
              page === PageEnum.EbaySearch ? "menu-nav-active" : ""
            }`}
            onClick={() => setPage(PageEnum.EbaySearch)}
          >
            Ebay serch
          </button>
        </li>
        <li>
          <button
            className={`nav-button ${
              page === PageEnum.FromText ? "menu-nav-active" : ""
            }`}
            onClick={() => setPage(PageEnum.FromText)}
          >
            From text
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
