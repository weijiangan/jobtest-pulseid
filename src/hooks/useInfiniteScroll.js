import { useEffect } from "react";

function useInfiniteScroll({ isLoading, triggerHeight = 500 }, callback) {
  function handleSrollEnd() {
    const maxScrollPosition = document.body.scrollHeight - window.innerHeight;
    const nearEnd = window.scrollY > maxScrollPosition - triggerHeight;
    if (nearEnd && !isLoading) {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener("optimizedScroll", handleSrollEnd, false);
    return () => {
      window.removeEventListener("optimizedScroll", handleSrollEnd, false);
    };
  });
}

export { useInfiniteScroll };
