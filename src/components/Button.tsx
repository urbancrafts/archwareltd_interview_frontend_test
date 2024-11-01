import { ReactNode } from "react"

interface Props{
    children: ReactNode;
    color?: 'primary'|'secondary';
    onClic: () => void;
  }

const Button = ({children, onClic, color}: Props) => {
  return (
    <button type="button" className={'btn btn-' +color} onClick={onClic}>{children}</button>
  )
}

export default Button