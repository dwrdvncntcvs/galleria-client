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
  const [newPage, setNewPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const scroll = () => {
      const handleScroll = () => {
        const isAtBottom =
          document.documentElement.scrollHeight -
            document.documentElement.scrollTop <=
          document.documentElement.clientHeight;

        if (numberOfItems / limit <= newPage) {
          console.log("Done Scrolling");
          return;
        }

        if (isAtBottom) {
          setNewPage(newPage + 1);
        }
      };

      window.addEventListener("scroll", handleScroll);
    };

    scroll();
  }, [numberOfItems, newPage]);

  useEffect(() => {
    const getData = async () => {
      setLoading((prev) => (prev = true));
      await dispatch(dataRequest({ userId, limit, page: newPage }));
      setLoading((prev) => (prev = false));
    };

    getData();
  }, [userId, newPage]);

  return (
    <>
      {children}
      {loading && <p>Loading</p>}
    </>
  );
};

export default InfiniteScroll;
