import { useLottie } from "lottie-react";
import loadingAnimation from "../../public/animations/loading.json"

const LoadingPulse = () => {
  const options = {
    animationData: loadingAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return <div className="w-24 h-24">{View}</div>;
};

export default LoadingPulse;
