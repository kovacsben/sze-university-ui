export default function InputGroupAddon({ className, ...props }) {
  return (
    <span
      {...props}
      className={[
        "h-10 px-3 bg-black/5 text-black/70 border border-black/15",
        className || "",
      ].join(" ").trim()}
    />
  );
}
