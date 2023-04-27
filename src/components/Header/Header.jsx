import s from "./Header.module.css";
import logoSrc from "assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "components/Button/buttonPrimary";
import { Logo } from "components/logo/Logo";

export function Header(props) {
  const navigate = useNavigate();
  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          onClick={() => navigate("/")}
          title="Notomatic"
          subtitle={"Manage your notes"}
          image={logoSrc}
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-end">
        <ButtonPrimary onClick={() => navigate("/notes/new")}>
          Add note +
        </ButtonPrimary>
      </div>
    </div>
  );
}
