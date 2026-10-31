/**
 * InputGroupAddon - rögzített feliratú/ikonos toldalék az InputGroup szélére.
 *
 * `inline-flex` kell rá: enélkül a span `display: block` marad, és az
 * `items-center` / `justify-center` nem hat semmire - a felirat a 40px magas
 * doboz tetejére csúszik, a szomszédos input szövegéhez képest elcsúszva.
 *
 * `shrink-0` + `whitespace-nowrap`: a toldalék fix szélességű marad, a
 * csoportban a szabad helyet az input kapja, nem a felirat törik meg.
 */
export default function InputGroupAddon({ className, ...props }) {
  return (
    <span
      {...props}
      className={[
        "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
        "h-10 px-3 bg-black/5 text-black/70 border border-black/15",
        className || "",
      ].join(" ").trim()}
    />
  );
}
