import React from "react";

export default function InputGroup({ className, children, ...rest }) {
  const items = React.Children.toArray(children);

  const enhanced = items.map((child, idx) => {
    if (!React.isValidElement(child)) return child;
    const isFirst = idx === 0;
    const isLast  = idx === items.length - 1;

    const posCls = isFirst ? "rounded-l-2xl"
                 : isLast  ? "rounded-r-2xl"
                 :           "rounded-none";

    const mergeCls = [
      child.props.className || "",
      posCls,
      !isFirst && "-ml-px",
      "focus-within:z-10 focus:z-10",
    ].filter(Boolean).join(" ");

    return React.cloneElement(child, { className: mergeCls });
  });

  return (
    <div
      {...rest}
      className={["sze-inputgroup inline-flex items-stretch", className || ""].join(" ").trim()}
    >
      {enhanced}
    </div>
  );
}
