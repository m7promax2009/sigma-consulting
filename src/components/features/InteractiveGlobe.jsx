import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// High-performance Three.js Interactive 3D Earth Globe with crisp "SIGMA CONSULTING" banner
export default function InteractiveGlobe() {
  const mountRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 550;
    let height = container.clientHeight || 550;

    // ─── 1. THREE.JS SCENE SETUP ───
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ─── 2. EARTH GROUP (Center of scene) ───
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, 0, 0);
    earthGroup.rotation.z = (12 * Math.PI) / 180;
    scene.add(earthGroup);

    const textureLoader = new THREE.TextureLoader();
    const dayTexture = textureLoader.load("/earth_day.jpg");
    const cloudsTexture = textureLoader.load("/earth_clouds.png");

    dayTexture.colorSpace = THREE.SRGBColorSpace;

    // ─── 3. EARTH SURFACE SPHERE ───
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: dayTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // ─── 4. REALISTIC CLOUD LAYER ───
    const cloudGeometry = new THREE.SphereGeometry(1.018, 64, 64);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthGroup.add(cloudMesh);



    // ─── 6. PERFECT EQUATORIAL RING OF "SIGMA CONSULTING" (Cylinder Ribbon) ───
    // We create a high-resolution 2D canvas with "SIGMA   CONSULTING" repeating perfectly
    const ringCanvas = document.createElement("canvas");
    ringCanvas.width = 2048;
    ringCanvas.height = 256;
    const rCtx = ringCanvas.getContext("2d");

    if (rCtx) {
      rCtx.clearRect(0, 0, 2048, 256);

      // Font: Oswald (Bold, modern, condensed, clean)
      rCtx.font = "700 85px 'Oswald', 'Plus Jakarta Sans', sans-serif";
      rCtx.textBaseline = "middle";
      rCtx.textAlign = "center";

      // Render 2 instances around the cylinder (180 deg apart) so it loops endlessly
      const segments = [512, 1536];
      segments.forEach((centerX) => {
        // Deep shadow for 3D depth
        rCtx.fillStyle = "rgba(4, 15, 20, 0.95)";
        rCtx.fillText("SIGMA        CONSULTING", centerX + 3, 128 + 3);

        // Subtle crisp highlight outline
        rCtx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        rCtx.lineWidth = 3;
        rCtx.strokeText("SIGMA        CONSULTING", centerX, 128);

        // Main requested #D9E2DE text
        rCtx.fillStyle = "#D9E2DE";
        rCtx.fillText("SIGMA        CONSULTING", centerX, 128);
      });
    }

    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    ringTexture.wrapS = THREE.RepeatWrapping;
    ringTexture.wrapT = THREE.ClampToEdgeWrapping;
    ringTexture.colorSpace = THREE.SRGBColorSpace;

    // Open-ended cylinder surrounding the equator
    const ringRadius = 1.42;
    const ringHeight = 0.38;
    const cylinderGeo = new THREE.CylinderGeometry(
      ringRadius,
      ringRadius,
      ringHeight,
      96,
      1,
      true // openEnded
    );

    const cylinderMat = new THREE.MeshBasicMaterial({
      map: ringTexture,
      transparent: true,
      side: THREE.FrontSide, // Only renders the front half! The back half naturally hides behind Earth!
      depthWrite: false,
    });

    const textRingMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    // Slight planetary tilt through center
    textRingMesh.rotation.x = 0.12;
    textRingMesh.rotation.z = -0.05;
    scene.add(textRingMesh);

    // ─── 7. LIGHTING ───
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(4, 2, 3);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x1a2e3b, 1.2);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    // ─── 8. INTERACTIVE 360-DEGREE ROTATION & INERTIA ───
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0.5;
    let rotationVelocity = { x: 0, y: 0.002 };

    const domElement = renderer.domElement;

    const onPointerDown = (e) => {
      isDragging = true;
      setIsGrabbing(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity = {
        x: deltaY * 0.003,
        y: deltaX * 0.003,
      };

      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsGrabbing(false);
    };

    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // ─── 9. RESIZE HANDLER ───
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 550;
      height = container.clientHeight || 550;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // ─── 10. ANIMATION LOOP ───
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Earth rotation
      if (!isDragging) {
        targetRotationY += rotationVelocity.y;
        targetRotationX += rotationVelocity.x;
        rotationVelocity.y *= 0.95;
        rotationVelocity.x *= 0.95;
        if (Math.abs(rotationVelocity.y) < 0.0016) {
          rotationVelocity.y = 0.0016;
        }
      }

      earthGroup.rotation.y += (targetRotationY - earthGroup.rotation.y) * 0.12;
      earthGroup.rotation.x += (targetRotationX - earthGroup.rotation.x) * 0.12;

      cloudMesh.rotation.y += 0.0006;

      // ─── Ultra-smooth, tranquil, slow reading speed ───
      ringTexture.offset.x -= 0.00038;

      renderer.render(scene, camera);
    };

    animate();

    // ─── CLEANUP ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
      sphereGeometry.dispose();
      cloudGeometry.dispose();
      cylinderGeo.dispose();
      earthMaterial.dispose();
      cloudMaterial.dispose();
      cylinderMat.dispose();

      ringTexture.dispose();
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] w-full items-center justify-center select-none overflow-visible">
      {/* Three.js Container */}
      <div
        ref={mountRef}
        className={`h-full w-full flex items-center justify-center touch-none ${
          isGrabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      />
    </div>
  );
}
