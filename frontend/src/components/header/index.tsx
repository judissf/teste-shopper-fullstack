import { HeaderStyle, Logo } from "./style"
import logo from "../../assets/img/logo.png"

export const Header = () => {
  return (
    <HeaderStyle>
      <Logo>
        <img src={logo} alt="Logo Need for Trip" />
      </Logo>
    </HeaderStyle>
  )
}