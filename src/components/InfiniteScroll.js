import React, { useEffect, useRef, useState } from 'react';

function InfiniteScroll({ children, loadMore, hasMore, loading }) {
  const [element, setElement] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    if (loading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (element && hasMore) {
      observer.current.observe(element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [element, loading, hasMore, loadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <div ref={setElement} className="w-full h-20 flex items-center justify-center">
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          )}
        </div>
      )}
    </>
  );
}

export default InfiniteScroll; 