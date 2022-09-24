import React, { PropsWithChildren, useEffect, useCallback } from "react";
import { changePage, setHasMore } from "../../../features/postSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { throttle } from "lodash";

interface InfiniteScrollProps extends PropsWithChildren {
  dataRequest: ({
    userId,
    limit,
    page,
  }: {
    userId: string;
    limit: number;
    page: number;
  }) => any;
  userId: string;
  limit: number;
  page: number;
  numberOfItems: number;
  hasMore: boolean;
}

const InfiniteScroll = ({
  children,
  dataRequest,
  userId,
  limit,
  page,
  numberOfItems,
  hasMore,
}: InfiniteScrollProps) => {
  const dispatch = useAppDispatch();

  const request = async () => {
    await dispatch(dataRequest({ userId, limit, page }));
  };

  const handleScrollChange = useCallback(
    throttle(() => {
      const isAtBottom =
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop <=
        document.documentElement.clientHeight;

      if (Math.ceil(numberOfItems / limit) <= page) {
        dispatch(setHasMore(false));
        return;
      }

      if (isAtBottom) {
        dispatch(changePage(page + 1));
        request();
      }
    }, 1000),
    [numberOfItems, numberOfItems, page]
  );

  useEffect(() => {
    console.log("Current Page: ", page);

    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, [page, limit]);

  useEffect(() => {
    if (hasMore) request();
  }, [userId, hasMore]);

  return <>{children}</>;
};

export default InfiniteScroll;
