import { RADIUS, controlSize } from "../tokens";

export const inputTextPT = {
  root: ({ props }) => {
    const cs = controlSize(props.size);
    const radiusCls = RADIUS[props.radius] ?? RADIUS["3xl"];
    return {
      className:
        `w-full ${cs.height} ${radiusCls} border border-black/15 px-3 bg-sze-third/20 ` +
        "placeholder:opacity-60 " +
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sze-primary " +
        "focus-visible:ring-offset-1 ring-offset-white dark:ring-offset-neutral-900",
    };
  },
};
