import React from 'react'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

import RegularFont from '../assets/NotoSansJP-Regular.ttf'
import BoldFont from '../assets/NotoSansJP-Bold.ttf'
import { getStaticPaths } from 'src/pages/posts/ogp/[...slug].png'

const generateOgpImage = async (element: React.ReactNode) => {
  const svg = await satori(
    element,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: Buffer.from(RegularFont),
          style: "normal",
          weight: 400,
        },
        {
          name: "Noto Sans JP",
          data: Buffer.from(BoldFont),
          style: "normal",
          weight: 600,
        }
      ]
    },
  )

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    }
  })

  const image = resvg.render();

  return image.asPng();
}

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
          fontSize: "3rem",
          margin: "16px",
          textAlign: "left",
          color: "#000",
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
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="https://rieogen.com/profile_icon.png"
          alt="Profile Icon"
          style={{
            width: "80px",
            height: "auto",
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            fontSize: "2.5rem",
            marginLeft: "1.3rem",
            color: "#000",
          }}
        >
          rienote
        </span>
      </div>
      
    </div>
  );

  return generateOgpImage(element);
}
