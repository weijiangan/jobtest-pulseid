import { useEffect } from "react";

function useInfiniteScroll({ isLoading, triggerHeight = 500, ref }, callback) {
  function handleSrollEnd() {
    const maxScrollPosition = document.body.scrollHeight - window.innerHeight;
    const nearEnd = window.scrollY > maxScrollPosition - triggerHeight;
    if (nearEnd && !isLoading) {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleSrollEnd, false);
    return () => {
      window.removeEventListener("scroll", handleSrollEnd, false);
    };
  });
}

export { useInfiniteScroll };
