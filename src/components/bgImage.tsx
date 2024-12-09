import { useRouter } from "next/router";
import image from "../../public/images/bgImage.png";
import imageLogin from "../../public/images/loginBackGround.png";

const BackgroudImage = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {pathname !== "/auth" && (
        <>
          <img
            className="object-cover w-full h-full"
            src={image.src}
            alt="Background"
          />
        </>
      )}
      {pathname == "/auth" && (
        <>
          <img
            className="object-cover w-full h-full"
            src={imageLogin.src}
            alt="Background"
          />
        </>
      )}
    </>
  );
};
export default BackgroudImage;
