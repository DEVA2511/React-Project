import { SearchBar } from "components/SearchBar/SearchBar";
import s from "./style.module.css";
export function Input({ onTextChange, placeholder }) {
  return (
    <>
      <SearchBar size={25} className={s.icon} />
      <input
        type="text"
        className={s.input}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}
