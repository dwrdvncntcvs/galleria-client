import React, { PropsWithChildren, useEffect, useState } from "react";
import { changePage, setHasMore } from "../../../features/postSlice";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { throttle } from "lodash";

interface InfiniteScrollProps extends PropsWithChildren {
  dataRequest: ({
    param,
    limit,
    page,
  }: {
    param: string;
    limit: number;
    page: number;
  }) => any;
  param: string;
  limit: number;
  page: number;
  numberOfItems: number;
  hasMore: boolean;
}

const InfiniteScroll = ({
  children,
  dataRequest,
  param,
  limit,
  page,
  numberOfItems,
  hasMore,
}: InfiniteScrollProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const request = async () => {
    setIsLoading((prev) => (prev = true));
    const value = await dispatch(dataRequest({ param, limit, page }));

    if (value.meta.requestStatus === "fulfilled") setIsLoading(false);
  };

  const handleScrollChange = throttle(() => {
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
  }, 700);

  useEffect(() => {
    if (hasMore) request();
  }, [hasMore, param]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, [page, limit]);

  return (
    <>
      {children}
      {isLoading && <p>Loading ...</p>}
    </>
  );
};

export default InfiniteScroll;
