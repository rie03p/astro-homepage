import React from "react";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import BoldFont from "../assets/NotoSansJP-Bold.ttf";

const generateOgpImage = async (element: React.ReactNode) => {
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: Buffer.from(BoldFont),
        style: "normal",
        weight: 600,
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const image = resvg.render();
  return image.asPng();
};

export const generateBlogPostOgpImage = (title: string) => {
  const element = (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "630px",
        position: "relative",
        backgroundColor: "#fff",
        padding: "2rem",
        boxSizing: "border-box",
        border: "40px solid #e0e8b2",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          margin: "24px",
          textAlign: "left",
          color: "#333",
          lineHeight: "1.5",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          maxWidth: "1100px",
        }}
      >
        {title}
      </h1>

      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          right: "3rem",
          color: "#333",
          fontSize: "2.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/124267041?v=4"
          width={80}
          height={80}
          style={{ borderRadius: 9999, marginRight: 24 }}
        />
        rie03p
      </div>
    </div>
  );

  return generateOgpImage(element);
};
