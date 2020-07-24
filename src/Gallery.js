import React from "react";
import Image from "./Image";

const FRAME_SIZE = 3;
export const MAIN_IMAGE_SIZE = 500;

function picturesInRange(currentIndex, imagesTotal) {
  const halfFrameLen = Math.ceil(FRAME_SIZE / 2);
  const minImageIndex = Math.max(0, currentIndex - halfFrameLen);

  return Math.min(minImageIndex, imagesTotal - halfFrameLen);
}

function Gallery({ selectedIndex, images, onClickImage }) {
  const [frames, setFrames] = React.useState([]);

  React.useEffect(() => {
    const sliceInitialPosition = picturesInRange(selectedIndex, images.length);
    const newFrame = images.slice(
      sliceInitialPosition,
      sliceInitialPosition + FRAME_SIZE
    );

    Promise.all(newFrame.map((image) => image.getDownloadURL())).then(
      (imagesSrc) => {
        setFrames(
          imagesSrc.map((src, index) => ({
            fullPath: newFrame[index].fullPath,
            name: newFrame[index].name,
            src,
            index: sliceInitialPosition + index,
          }))
        );
      }
    );
  }, [selectedIndex, images]);

  return (
    <div>
      <p>
        {frames.map((image) => (
          <Image
            number={image.index}
            text={image.name}
            key={image.fullPath}
            height={MAIN_IMAGE_SIZE / FRAME_SIZE}
            src={image.src}
            alt={image.name}
            onClick={() => onClickImage(image.index)}
          />
        ))}
      </p>
    </div>
  );
}

export default Gallery;
