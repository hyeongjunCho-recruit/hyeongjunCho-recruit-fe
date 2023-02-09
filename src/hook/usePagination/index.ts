import { useCallback, useMemo, useState } from "react";

export default function usePagination({ page, size, totalCount, rangeCount }: { page: number; size: number; totalCount: number; rangeCount: number }) {
  const [current, setCurrent] = useState<number>(page);
  const max = useMemo(() => Math.min(Math.ceil(totalCount / size), Math.ceil(current / (rangeCount || 1)) * (rangeCount || 1)), [current]);
  const min = useMemo(() => max - (max - 1) % (rangeCount || 1), [max]);
  const prev = useMemo(() => min > (rangeCount || 1), [min]);
  const next = useMemo(() => max * 10 < totalCount, [max, totalCount]);
  const changePage = useCallback((pageIndex: number | string) => {
    const nextPage = Number(pageIndex);
    if (Number.isNaN(nextPage)) {
      return;
    }
    setCurrent(nextPage);
  }, []);

  return { min, max, current, changePage, prev, next }
}