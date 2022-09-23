import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { HiPlus } from "react-icons/hi";
import { ImageBlob, ImageData, ImagePost } from "../../../models/Post";
import { v4 } from "uuid";
import style from "./addImages.module.scss";
import { ImageService } from "../../../services/imageServices";
import NoImages from "./NoImages/NoImages";
import DisplayImage from "./DisplayImage/DisplayImage";

interface AddImagesProps {
  setImages: Dispatch<SetStateAction<ImageBlob[]>>;
  setImageUrls: Dispatch<SetStateAction<ImagePost[]>>;
}

export default function AddImages({ setImages, setImageUrls }: AddImagesProps) {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);

  const buttonRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const { getImageData } = new ImageService(file);
    const fileData = await getImageData();
    const id = v4();

    setImages((prev) => [{ value: file, id }, ...prev]);
    setImagesData((prev) => [
      ...prev,
      { id, src: fileData, alt: "toBePostedFile" },
    ]);
    setImageUrls((prev) => [...prev, { id, postImageUrl: fileData }]);
  };

  const removeImageData = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
    setImagesData((prev) => prev.filter((item) => item.id !== id));
  };

  const noImages = imagesData.length < 1 && <NoImages />;

  return (
    <div className={style["add-image-container"]}>
      <input
        type="file"
        accept="image/*"
        ref={buttonRef}
        name="inputFile"
        hidden={true}
        onChange={handleChange}
      />
      <section>
        {noImages}
        {imagesData.map(({ src, alt, id }) => (
          <DisplayImage
            src={src}
            alt={alt}
            id={id}
            onRemoveImage={removeImageData}
            key={id}
          />
        ))}
      </section>
      <button onClick={() => buttonRef.current?.click()}>
        <HiPlus size={15} />
      </button>
    </div>
  );
}
