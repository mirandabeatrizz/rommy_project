import image from "../../public/images/bgImage.png";
const BackgroudImage = () => {
  return (
    <img
      className="object-cover w-full h-full"
      src={image.src}
      alt="Background"
    />
  );
};
export default BackgroudImage;
