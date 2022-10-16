import { debounce } from "lodash";
import React, { useState, ChangeEvent } from "react";
import { HiTrash } from "react-icons/hi";
import { searchUserProfile } from "../../../api/userRequest";
import { resetSearchResults } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { SearchResult } from "../../Search";
import style from "./navBarSearch.module.scss";

const searchDebounce = debounce(async (str, dispatch) => {
  await dispatch(searchUserProfile({ str }));
}, 500);

export default function NavBarSearch() {
  const dispatch = useAppDispatch();
  const { count, data } = useAppSelector((state) => state.userState.foundUsers);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(false);

  const searchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    searchDebounce(e.target.value, dispatch);
  };

  const selectInput = () => {
    if (search.length < 1) dispatch(resetSearchResults());
    setSelected((prev) => true);
  };

  const setSearchDefault = () => {
    setSelected(false);
    setSearch("");
  };

  const closeSearchResults = () => {
    setSelected(false);
  };

  const clearInput = () => {
    setSearch("");
  };

  return (
    <div className={style["nav-bar-search"]}>
      <input
        type="text"
        placeholder="Galleria Search ..."
        value={search}
        onChange={searchHandler}
        onClick={selectInput}
      />
      {search.length > 0 && (
        <button id={style.clear} onClick={clearInput}>
          <HiTrash />
        </button>
      )}
      {selected && search.length > 0 && (
        <SearchResult
          query={search}
          count={count}
          users={data}
          onDefault={setSearchDefault}
          onClose={closeSearchResults}
        />
      )}
    </div>
  );
}
