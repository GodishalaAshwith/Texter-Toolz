import { ReactNode } from "react";
import "./Background.css";

interface Props {
  children: ReactNode;
}

const Background = ({ children }: Props) => {
  return <div className="background">{children}</div>;
};

export default Background;
