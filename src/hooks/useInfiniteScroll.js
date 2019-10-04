import { useEffect } from "react";

function useInfiniteScroll(
  { isLoading, triggerHeight = 500, ref = window },
  callback
) {
  function handleSrollEnd() {
    const maxScrollPosition =
      ref === window
        ? document.body.scrollHeight - window.innerHeight
        : ref.scrollHeight - ref.offsetHeight;
    const nearEnd =
      (ref === window ? window.scrollY : ref.scrollTop) >=
      maxScrollPosition - triggerHeight;
    if (nearEnd && !isLoading) {
      callback();
    }
  }

  useEffect(() => {
    ref.addEventListener("scroll", handleSrollEnd, false);
    return () => {
      ref.removeEventListener("scroll", handleSrollEnd, false);
    };
  });
}

export { useInfiniteScroll };
