import { Skeleton } from "@mui/material";
import "./SkeletonContainer.scss";

export const SkeletonContainer = () => {
  return (
    <div className="skeleton-container">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
        <div key={el.id}>
          <Skeleton variant="rounded" height={200} />
          <Skeleton width="60%" sx={{ marginTop: "20px" }} />
          <Skeleton sx={{ margin: "10px 0" }} height={40} />
        </div>
      ))}
    </div>
  );
};