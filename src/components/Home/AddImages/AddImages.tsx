import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { HiPlus, HiOutlinePhotograph, HiTrash } from "react-icons/hi";
import { ImageBlob, ImageData, ImagePost } from "../../../models/Post";
import { v4 } from "uuid";
import "./addImages.scss";
import { ImageService } from "../../../services/imageServices";

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

  return (
    <div className="ai__main-container">
      <input
        type="file"
        accept="image/*"
        ref={buttonRef}
        name="inputFile"
        hidden={true}
        onChange={handleChange}
      />
      <section>
        {imagesData.length < 1 && (
          <div className="ai__empty">
            <p>Add Image</p>
            <p>
              <HiOutlinePhotograph size={30} />
            </p>
          </div>
        )}
        {imagesData.map(({ src, alt, id }) => (
          <div className="ai__image-prev" key={id}>
            <button id="ai__rm-btn" onClick={(e) => removeImageData(id)}>
              <HiTrash />
            </button>
            <img src={src} alt={alt} />
          </div>
        ))}
      </section>
      <button onClick={() => buttonRef.current?.click()}>
        <HiPlus size={15} />
      </button>
    </div>
  );
}