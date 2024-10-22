import "./Tool.css";

interface ToolProps {
  name: string;
}

const Tool = ({ name }: ToolProps) => {
  return (
    <>
      <div className="tool-preview">
        <div className="tool">{name}</div>
      </div>
    </>
  );
};

export default Tool;
