import React from "react";
import { UserProfile } from "../../../models/User";
import { PeopleCard } from "../../People";
import style from "./searchResult.module.scss";

interface SearchResultProps {
  users: UserProfile[];
  count: number;
}

export default function SearchResult({ count, users }: SearchResultProps) {
  return (
    <div className={style["search-result"]}>
      <p>
        Search found {count} {count < 2 ? "person" : "people"}
      </p>
      {users.map((user) => (
        <PeopleCard userProfile={user} />
      ))}
    </div>
  );
}
