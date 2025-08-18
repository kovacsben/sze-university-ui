export default function ButtonGroup({ children, className }) {
  return <div className={"inline-flex gap-2 " + (className || "")}>{children}</div>;
}
