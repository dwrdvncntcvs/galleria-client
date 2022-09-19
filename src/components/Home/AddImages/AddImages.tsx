import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { HiPlus, HiOutlinePhotograph, HiTrash } from "react-icons/hi";
import { ImageBlob, ImageData } from "../../../models/Post";
import { v4 } from "uuid";
import "./addImages.scss";
import { ImageService } from "../../../services/imageServices";

interface AddImagesProps {
  setImages: Dispatch<SetStateAction<ImageBlob[]>>;
}

export default function AddImages({ setImages }: AddImagesProps) {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);

  const buttonRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const { getImageData } = new ImageService(file);
    const fileData = await getImageData();
    const id = v4();

    setImages((prev) => [{ value: fileData, id }, ...prev]);
    setImagesData((prev) => [
      { id, src: fileData, alt: "toBePostedFile" },
      ...prev,
    ]);
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
          <div className="ai__image-prev">
            <button id="ai__rm-btn" onClick={(e) => removeImageData(id)}>
              <HiTrash />
            </button>
            <img src={src} alt={alt} key={id} />
          </div>
        ))}
      </section>
      <button onClick={() => buttonRef.current?.click()}>
        <HiPlus size={15} />
      </button>
    </div>
  );
}
