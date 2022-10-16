import React from "react";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "../../../assets/images";
import { useAppSelector } from "../../../hooks/reduxHook";
import { UserProfile } from "../../../models/User";
import style from "./searchResult.module.scss";

interface SearchResultProps {
  users: UserProfile[];
  count: number;
  onDefault: () => void;
  onClose: () => void;
  query: string;
}

export default function SearchResult({
  count,
  users,
  onDefault,
  onClose,
  query,
}: SearchResultProps) {
  const { userData } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();

  const goToUserProfile = (username: string) => () => {
    navigate(`/${username}`);
    onDefault();
  };

  return (
    <div className={style["search-result"]}>
      <div className={style.header}>
        <p>Search Result{users.length > 1 ? "s" : ""}</p>
        <button id={style["clear"]} onClick={onClose}>
          <HiX />
        </button>
      </div>
      {users.length < 1 ? (
        <div className={style["no-result"]}>
          <p>Nothing's found related to "{query}".</p>
        </div>
      ) : (
        users.map(({ first_name, last_name, username, Profile, id }) => (
          <button key={id} onClick={goToUserProfile(username!)}>
            <img
              src={
                Profile?.profileImage !== ""
                  ? Profile?.profileImage
                  : defaultAvatar
              }
              alt={`${first_name} ${last_name}`}
            />
            <div className={style["profile-details"]}>
              <p>
                {first_name} {last_name}
              </p>
              <p>{userData?.username === username ? "You" : username}</p>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
