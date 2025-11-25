import React, { useState, useRef, useEffect } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

export default function Select({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = "Pilih...",
  disabled = false,
  className = "",
  panelStyle = "w-60",
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setHighlight(idx >= 0 ? idx : 0);
    }
  }, [open, options, value]);

  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  function onKeyDown(e) {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return setOpen(true);
      setHighlight((h) => Math.min(h + 1, options.length - 1));
      scrollIntoView(highlight + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      setHighlight((h) => Math.max(h - 1, 0));
      scrollIntoView(highlight - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!open) return setOpen(true);
      if (highlight >= 0 && options[highlight]) {
        const v = options[highlight].value;
        onChange(v);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  function scrollIntoView(index) {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[index];
    if (item) item.scrollIntoView({ block: "nearest" });
  }

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="select-label"
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`inline-flex items-center justify-between gap-2 w-full px-3 py-2 text-sm rounded-md transition
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          bg-secondary text-foreground border border-white/15 focus:outline-none`}
      >
        <span className="flex items-center gap-2">
          <span
            id="select-label"
            className={`truncate ${selected ? "" : "text-foreground"}`}
          >
            {placeholder}
          </span>
          <HiOutlineChevronDown size={18} />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-activedescendant={
            highlight >= 0 ? `opt-${highlight}` : undefined
          }
          tabIndex={-1}
          ref={listRef}
          className={`absolute mt-2 ${panelStyle} right-0 max-h-56 overflow-auto rounded-md shadow-lg bg-secondary border border-white/15 z-50`}
          onKeyDown={onKeyDown}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-foreground">
              Tidak ada opsi
            </div>
          ) : (
            options.map((opt, idx) => {
              const isSelected = value === opt.value;
              const isHighlighted = idx === highlight;
              return (
                <div
                  id={`opt-${idx}`}
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(opt.label);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 px-3 py-2 text-sm cursor-pointer select-none
                    ${isHighlighted ? "bg-white/10" : ""}
                  `}
                >
                  <span className="truncate">{opt.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
