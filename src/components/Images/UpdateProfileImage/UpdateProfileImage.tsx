import React, { ChangeEvent, useState, useRef } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";
import { v4 } from "uuid";
import { updateUserAvatar } from "../../../api/userRequest";
import { closeModal } from "../../../features/modalSlice";
import { useImageUrl } from "../../../hooks/imageHooks";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { ImageBlob } from "../../../models/Post";
import { Card, ModalOverlay } from "../../../UI";
import { CloseModalButton } from "../../global";
import style from "./updateProfileImage.module.scss";

export default function UpdateProfileImage() {
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const [imageBlob, setImageBlob] = useState<ImageBlob>({
    id: "",
    value: null,
  });

  const buttonRef = useRef<HTMLInputElement>(null);
  const imageUrl = useImageUrl(imageBlob.value!);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setImageBlob((prev) => ({ ...prev, value: e.target.files![0], id: v4() }));

  const addImage = () => buttonRef.current?.click();
  const removeImage = () => setImageBlob((prev) => ({ id: "", value: null }));

  const updateImageAction = async () => {
    console.log("Image Blob: ", imageBlob);
    const { meta } = await dispatch(
      updateUserAvatar({ imageData: imageBlob.value!, userId: userData?.id! })
    );

    if (meta.requestStatus === "fulfilled") {
      dispatch(closeModal());
      window.location.reload();
    }
  };

  return (
    <ModalOverlay hasBackButton={true} backButtonComponent={CloseModalButton}>
      <Card>
        <div className={style["update-profile-image"]}>
          <p>Update Profile Image</p>
          <input
            ref={buttonRef}
            type="file"
            onChange={handleChangeValue}
            hidden={true}
          />
          <div className={style["display-image"]}>
            {imageUrl !== "" && (
              <img className={style["image"]} src={imageUrl} alt="" />
            )}
            {imageBlob.value === null ? (
              <button
                id={style["add"]}
                className={style["image"]}
                onClick={addImage}
              >
                <HiPlus />
              </button>
            ) : (
              <button id={style["remove"]} onClick={removeImage}>
                <HiTrash />
              </button>
            )}
          </div>

          <button
            id={style["save"]}
            onClick={updateImageAction}
            disabled={!imageBlob.value}
          >
            Save
          </button>
        </div>
      </Card>
    </ModalOverlay>
  );
}
