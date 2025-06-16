
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

interface FullScreenImageViewerProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export const FullScreenImageViewer = ({
  images,
  isOpen,
  onClose,
  currentIndex,
  onIndexChange,
}: FullScreenImageViewerProps) => {
  const slides = images.map((image) => ({
    src: image,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={currentIndex}
      on={{
        view: ({ index }) => onIndexChange(index),
      }}
      plugins={[Zoom, Fullscreen]}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        doubleClickMaxStops: 2,
        keyboardMoveDistance: 50,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
        scrollToZoom: true,
      }}
      fullscreen={{
        auto: false,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: true,
      }}
      carousel={{
        finite: false,
        preload: 2,
      }}
    />
  );
};
