import React from "react";
// import { Icon } from "./Icon";

export const ButtonElevated = ({ onClick, children = "Search" }) => {
  return (
    <button
      type="button"
      className="inline-flex h-12 items-center justify-center relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
      aria-label="Search"
      onClick={onClick}
    >
      <span className="inline-flex items-center justify-center relative flex-[0_0_auto] bg-[var(--color-primitives-white-1000)] rounded-full overflow-hidden hover:opacity-95 transition-opacity">
        <span className="inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-[0_0_auto]">
          {/* <Icon className="!relative !w-5 !h-5" aria-hidden="true" /> */}
          <span className="relative flex items-center justify-center w-fit font-[var(--heading-font-weight)] text-[var(--heading-font-size)] text-sm tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] whitespace-nowrap text-[var(--color-text-default-default)]">
            {children}
          </span>
        </span>
      </span>
    </button>
  );
}