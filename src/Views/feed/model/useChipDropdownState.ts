import { useState, useCallback } from "react";

export function useChipDropdownState() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setExpandedCategories(new Set());
  }, []);

  const expandCategory = useCallback((cat: string) => {
    setExpandedCategories((prev) => new Set(prev).add(cat));
  }, []);

  const collapseCategory = useCallback((cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.delete(cat);
      return next;
    });
  }, []);

  const isCategoryExpanded = useCallback(
    (cat: string) => expandedCategories.has(cat),
    [expandedCategories],
  );

  return { isOpen, open, close, expandCategory, collapseCategory, isCategoryExpanded };
}
