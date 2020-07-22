import React from "react";

import firebase from "./firebase";
import Gallery, { MAIN_IMAGE_SIZE } from "./Gallery";
import Image from "./Image";

function getBucketRoot() {
  return firebase.storage().ref();
}

function Storage() {
  const [images, setImages] = React.useState([]);
  const [update, setUpdate] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState({});

  React.useEffect(() => {
    const image = images[selectedIndex];

    if (!image) {
      return;
    }

    image.getDownloadURL().then((src) =>
      setSelectedImage({
        name: image.name,
        src,
      })
    );
  }, [selectedIndex, images]);

  React.useEffect(() => {
    getBucketRoot()
      .listAll()
      .then((references) => {
        setImages(references.items);

        if (selectedIndex === 0) {
          setSelectedIndex(references.items.length - 1);
        }
      });
  }, [selectedIndex, update]);

  return (
    <div>
      <button onClick={() => setUpdate(update + 1)}>update</button>

      <br />

      <p>
        <input
          type="range"
          min="0"
          max={images.length - 1}
          value={selectedIndex}
          onChange={(event) => setSelectedIndex(event.target.value)}
        />
        {selectedIndex} / {images.length - 1}
      </p>

      <p>
        {selectedImage.src ? (
          <Image
            number={selectedIndex}
            text={selectedImage.name}
            height={MAIN_IMAGE_SIZE}
            src={selectedImage.src}
            alt={selectedImage.name}
          />
        ) : (
          "carregando"
        )}
      </p>

      <Gallery selectedIndex={selectedIndex} images={images} />
    </div>
  );
}

export default Storage;
