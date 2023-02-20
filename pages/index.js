import { useEffect, useRef } from "react";

import { useRouter } from "next/router";

export default function MyComponent() {
  const blobRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    // Glow effect
    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;

      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [blobRef]);

  useEffect(() => {
    // Text effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    const handleMouseOver = (event) => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const h1 = document.querySelector("h1");
    h1.addEventListener("mouseover", handleMouseOver);

    return () => {
      h1.removeEventListener("mouseover", handleMouseOver);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div id="blob" ref={blobRef}></div>
      <div id="blur"></div>
      <h1 data-value="TALK2HANDS">TALK2HANDS</h1>
      <button></button>
      <div id="links">
        <div className="meta-link">
          <button
            onClick={() => {
              router.push("/about");
            }}
            data-value="TALK2HANDS"
            className="glow-on-hover"
          >
            <p className="text-in-button">About</p>
          </button>
          <button
            onClick={() => {
              router.push("/demo");
            }}
            data-value="TALK2HANDS"
            className="glow-on-hover"
          >
            <p className="text-in-button">Demo</p>
          </button>
        </div>
      </div>
    </div>
  );
}
