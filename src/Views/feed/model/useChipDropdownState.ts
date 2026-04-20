import { useState } from "react";

type ChipDropdownState = "collapsed" | "expanded" | "overlay";

export function useChipDropdownState() {
  const [state, setState] = useState<ChipDropdownState>("collapsed");

  // collapsed → expanded
  const expand = () => setState("expanded");

  // expanded → overlay
  const showOverlay = () => setState("overlay");

  // overlay → expanded
  const shrink = () => setState("expanded");

  // overlay/expanded → collapsed
  const collapse = () => setState("collapsed");

  return { state, expand, showOverlay, collapse, shrink };
}
