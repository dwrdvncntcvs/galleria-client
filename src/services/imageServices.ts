export class ImageService {
  constructor(private imageFile: File) {}

  getImageData = () => {
    const fileReader = new FileReader();

    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new Error("Error loading image file"));
      };

      fileReader.readAsDataURL(this.imageFile);
      fileReader.addEventListener("load", (e) => {
        const viewedFile = e.target?.result;
        const fileData = viewedFile!;
        resolve(fileData);
      });
    });
  };
}
