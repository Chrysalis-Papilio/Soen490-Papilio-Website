import { useState } from 'react';

const UploadImage = (): JSX.Element => {
  const [imageFile, setImageFile] = useState<string>('');

  // TODO: Add the correct logic in the future
  function formSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log({ imageFile });
    alert("here you'd submit the form using\n the imageFile like any other field");
  };

  function convertFile(files: FileList | null): void {
    if (files != null) {
      const fileRef = files[0];
      const fileType: string = fileRef.type;
      console.log('This file upload is of type:', fileType);
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        setImageFile(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    } else {
      console.log('error');
    }
  }

  return (
    <div className="App">
      <h2 className="text-sm font-semibold text-gray-600">
        Choose an Image to Upload
        </h2>
        <br></br>
        <div className="flex pl-5 text-sm font-semibold text-gray-600">
          <form onSubmit={formSubmit}>
            <input type="file" onChange={(e) => convertFile(e.target.files)} />
            {
              <>
              {(imageFile.includes('image/')) &&
              <img src={imageFile} width={300} />
              }
              </>
            }
          </form>
        </div>
    </div>
  );
};

export default UploadImage;
