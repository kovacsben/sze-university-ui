import { classNames } from "primereact/utils";
import { RADIUS, SHADOW, BORDER_WIDTH, DURATION, controlSize } from "../tokens";
export const toggleButtonPT = {
  root: ({ props }) => {
    const cs = controlSize(props.size);
    return {
      className: classNames(
        `relative inline-flex items-center ${cs.height} px-4 ${RADIUS.full} ${BORDER_WIDTH.thick} transition-all ${DURATION.slow} ease-in-out cursor-pointer toggle-button-root`,
        props.checked
          ? `bg-sze-primary border-sze-primary ${SHADOW.lg} shadow-sze-primary/50 toggle-checked`
          : "bg-gray-200 border-gray-300 hover:bg-gray-300 toggle-unchecked"
      ),
    };
  },
  label: ({ props }) => ({
    className: classNames(
      `text-sm font-semibold transition-all ${DURATION.slow}`,
      props.checked ? "text-white p-2" : "text-gray-600 p-2"
    )
  }),
  icon: { className: "mr-2" },
};
