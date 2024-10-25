import { Link } from "react-router-dom";
import "./Tool.css";

interface ToolProps {
  name: string;
}

const Tool = ({ name }: ToolProps) => {
  return (
    <>
      <div className="tool-preview">
        <div className="tool">
          <Link to="/texter">{name}</Link>
        </div>
      </div>
    </>
  );
};

export default Tool;
