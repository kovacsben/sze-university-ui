import { Button as PButton } from "primereact/button";
export default function IconButton(props) {
  return <PButton {...props} label={null} className={"!px-3 !h-10 aspect-square " + (props.className || "")} />;
}
