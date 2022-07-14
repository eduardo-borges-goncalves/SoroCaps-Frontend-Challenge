import { useRef } from "react";

export const useDebounce = (func: any, delay: number) => {
  const timer:any = useRef( );
  
  const DebouncedFunction = (...args: any) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => func(...args), delay)
  }

  return DebouncedFunction;
}