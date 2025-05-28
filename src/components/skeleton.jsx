import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = () => (
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <div className="space-y-4 w-full max-w-md mx-auto">
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={30} />
      <Skeleton height={100} width={100} circle />
    </div>
  </SkeletonTheme>
);

export default Skeleton;
