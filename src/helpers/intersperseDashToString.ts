import compose from "ramda/src/compose";
import join from "ramda/src/join";
import intersperse from "ramda/src/intersperse";

export const intersperseDashToString = compose(join(""), intersperse("-"));
