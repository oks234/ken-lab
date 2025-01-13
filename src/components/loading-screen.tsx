import { ClipLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClipLoader />
    </div>
  );
}
