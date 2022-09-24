import React, { PropsWithChildren, useEffect, useState } from "react";
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
  console.log("Current Page: ", page);
  const [newPage, setNewPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      setLoading((prev) => (prev = true));
      await dispatch(dataRequest({ userId, limit, page: newPage }));
      setLoading((prev) => (prev = false));
    };

    getData();

    return () => {};
  }, [userId, newPage]);

  useEffect(() => {
    const scroll = () => {
      const handleScroll = () => {
        const isAtBottom =
          document.documentElement.scrollHeight -
            document.documentElement.scrollTop <=
          document.documentElement.clientHeight + 10;

        if (numberOfItems / limit <= newPage) return;

        if (isAtBottom) setNewPage(newPage + 1);
      };

      window.addEventListener("scroll", handleScroll);
    };

    scroll();
    return () => {
      if (numberOfItems / limit <= newPage) dispatch(reset());
    };
  }, [numberOfItems, newPage]);

  return (
    <>
      {children}
      {loading && <p>Loading</p>}
    </>
  );
};

export default InfiniteScroll;
