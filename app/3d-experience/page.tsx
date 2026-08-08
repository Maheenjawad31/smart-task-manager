
"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Scene() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <mesh
        onClick={(event) => {
          event.stopPropagation();

          setColor((current) =>
            current === "#3b82f6"
              ? "#22c55e"
              : "#3b82f6"
          );
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={8}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500" />

        <p className="text-sm text-slate-300">
          Loading 3D experience...
        </p>
      </div>
    </div>
  );
}

export default function ThreeDExperiencePage() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          3D Productivity Experience
        </h1>

        <p className="mb-6 text-sm text-slate-300 sm:text-base">
          Click the cube to change its material color.
          Drag to rotate and pinch or scroll to zoom.
        </p>

        <div className="h-[60vh] min-h-[360px] max-h-[600px] overflow-hidden rounded-2xl bg-slate-900">
          {reducedMotion ? (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <div>
                <div className="mx-auto mb-4 h-24 w-24 rounded-2xl bg-blue-500 shadow-lg sm:h-32 sm:w-32" />

                <p className="text-sm text-slate-300 sm:text-base">
                  3D animation is reduced because your
                  browser prefers reduced motion.
                </p>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingFallback />}>
              <Canvas
                camera={{
                  position: [4, 3, 5],
                  fov: 50,
                }}
                dpr={[1, 1.5]}
                performance={{
                  min: 0.5,
                }}
              >
                <Scene />
              </Canvas>
            </Suspense>
          )}
        </div>

        <section className="mt-8 rounded-xl bg-white p-6 text-slate-900 shadow dark:bg-slate-900 dark:text-white">
          <h2 className="mb-3 text-xl font-semibold">
            Performance Notes
          </h2>

          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            This experience uses a small procedural cube instead of a large
            external 3D model, keeping the scene lightweight. The canvas uses
            a capped device pixel ratio and a responsive height to reduce GPU
            work on mobile devices. The 3D scene is also wrapped in Suspense
            with a loading fallback, while reduced-motion preferences replace
            the animated canvas with a static visual.
          </p>
        </section>
      </div>
    </main>
  );
}