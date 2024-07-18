import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: any) => {
        if (entries[0].isIntersecting) {
          callback && callback();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [callback, observerTarget.current]);

  return observerTarget;
};
