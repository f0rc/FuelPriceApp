import { type ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
  moreTailwindStyle?: string;
}

const ToolTip = ({ children, tooltip, moreTailwindStyle = "" }: Props) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = `${clientX - left}px`;
      }}
      className={`group relative inline-block ${moreTailwindStyle}`}
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="tooltip invisible absolute top-full z-10 mt-1 inline-block whitespace-nowrap rounded-lg bg-gray-900 p-1 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100 dark:bg-gray-700"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;
