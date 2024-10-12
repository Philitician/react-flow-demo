import { useStore } from "@xyflow/react";
import { useEffect, useRef } from "react";

const selector = (state: any) => ({
  transform: state.transform,
  width: state.width,
  height: state.height,
});

type BlueprintBackgroundProps = {
  blueprintUrl: string;
};

export function BlueprintBackground({
  blueprintUrl,
}: BlueprintBackgroundProps) {
  const { transform, width, height } = useStore(selector);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current && transform && width && height) {
      const [x, y, zoom] = transform;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(${zoom})`;
      bgRef.current.style.width = `${width}px`;
      bgRef.current.style.height = `${height}px`;
    }
  }, [transform, width, height]);

  return (
    <div
      className="react-flow__background"
      style={{
        position: "absolute",
        zIndex: -1,
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "0 0",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${blueprintUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        <div
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            width: "100%",
            height: "100%",
            position: "absolute",
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
}
