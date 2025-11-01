import React from "react";

export const InputField = ({ value, onChange }) => {
  return (
    <div className="flex flex-col w-[527px] items-start gap-[var(--size-space-200)] relative">
      <input
        className="min-w-60 pt-[var(--size-space-200)] pr-[var(--size-space-600)] pb-[var(--size-space-200)] pl-[var(--size-space-600)] relative self-stretch w-full bg-[var(--color-background-default-default)] rounded-lg overflow-hidden border border-solid border-[var(--color-primitives-gray-900)] flex-1 font-[var(--body-base-font-weight)] text-[var(--color-text-default-default)] text-[var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]"
        placeholder="Search City"
        type="text"
        value={value}
        onChange={onChange}
        aria-label="Search City"
        role="searchbox"
      />
    </div>
  );
};