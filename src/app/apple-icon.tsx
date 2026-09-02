import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: "36px",
          fontWeight: 800,
          fontFamily: "sans-serif",
          border: "4px solid rgba(255, 255, 255, 0.15)",
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
