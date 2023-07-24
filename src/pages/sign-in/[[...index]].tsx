import { SignIn } from "@clerk/nextjs";
import Spline from "@splinetool/react-spline";

export default function Page() {
    return (
      <div className="w-screen h-screen inline-flex items-center justify-center">
        <Spline
          className="absolute w-full h-full"
          scene="https://prod.spline.design/GxysiaMq70nq1i7Q/scene.splinecode"
        />
  
        <SignIn />
      </div>
    );
  }
  