import React, { PropsWithChildren, useEffect, useCallback } from "react";
import { changePage } from "../../../features/postSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";

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
  reset: () => any;
  userId: string;
  limit: number;
  page: number;
  numberOfItems: number;
}

const InfiniteScroll = ({
  children,
  dataRequest,
  userId,
  limit,
  page,
  numberOfItems,
  reset,
}: InfiniteScrollProps) => {
  const dispatch = useAppDispatch();

  const request = async () => {
    await dispatch(dataRequest({ userId, limit, page }));
  };

  const handleScrollChange = useCallback(() => {
    const isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (Math.ceil(numberOfItems / limit) <= page) return;

    if (isAtBottom) {
      console.log("At bottom");
      dispatch(changePage(page + 1));
      request();
    }
  }, [numberOfItems, numberOfItems, page]);

  useEffect(() => {
    console.log("Current Page: ", page);
    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, [page, limit]);

  useEffect(() => {
    request();
  }, [userId]);

  return <>{children}</>;
};

export default InfiniteScroll;
