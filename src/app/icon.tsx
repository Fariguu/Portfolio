import { ImageResponse } from "next/og";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 26,
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: "10px",
          fontWeight: 800,
          fontFamily: "sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        GF
      </div>
    ),
    {
      ...size,
    }
  );
}
