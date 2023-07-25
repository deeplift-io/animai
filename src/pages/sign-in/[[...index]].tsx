import { SignIn } from "@clerk/nextjs";
import Spline from "@splinetool/react-spline";

export default function SignInPage() {
  return (
    <div className="w-screen h-screen inline-flex items-center justify-center">
      <Spline
        className="absolute w-full h-full"
        scene="https://prod.spline.design/WgWTewlRDu6sT7pf/scene.splinecode"
      />

      <SignIn />
    </div>
  );
}
