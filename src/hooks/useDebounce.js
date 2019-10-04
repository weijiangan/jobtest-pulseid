import { useCallback } from "react";
import { debounce } from "lodash";

export function useDebounceCallback(...args) {
  return useCallback(debounce(...args), []);
}
