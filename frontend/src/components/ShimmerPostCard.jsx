import React from "react";
import {
  ShimmerCircularImage,
  ShimmerSocialPost,
  ShimmerText,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";

const ShimmerPostCard = ({ key }) => {
  return (
    <div
      key={key}
      style={{
        width: "90%",
        margin: "15px",
        padding: "16px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff", // Adding a subtle background color to make the shimmer more visible
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <ShimmerCircularImage
          size={55}
          circular={true}
          style={{ backgroundColor: "#e0e0e0", opacity: 0.4 }} // Darker and more opaque
        />
        <div style={{ marginLeft: "16px" }}>
          <ShimmerThumbnail
            rounded
            height={16}
            width={150}
            style={{
              backgroundColor: "#e0e0e0",
              opacity: 0.8,
            }}
          />
          <ShimmerThumbnail
            height={12}
            width={200}
            style={{ backgroundColor: "#e0e0e0", opacity: 0.8 }}
          />
        </div>
      </div>
      <ShimmerThumbnail
        height={180}
        width={"100%"}
        style={{ backgroundColor: "#e0e0e0", opacity: 0.8 }}
      />
      <div style={{ marginTop: "16px" }}>
        <ShimmerText
          line={3}
          style={{ backgroundColor: "#e0e0e0", opacity: 0.8 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ShimmerCircularImage
            size={45}
            circular={true}
            style={{ backgroundColor: "#e0e0e0", opacity: 0.8 }}
          />
          <ShimmerCircularImage
            size={45}
            circular={true}
            style={{ backgroundColor: "#e0e0e0", opacity: 0.8 }}
          />
          <ShimmerCircularImage
            size={45}
            circular={true}
            style={{ backgroundColor: "#e0e0e0", opacity: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShimmerPostCard;
