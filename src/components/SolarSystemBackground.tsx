"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SolarSystemBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    let width = containerRef.current.clientWidth || window.innerWidth;
    let height = containerRef.current.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    // Initial camera position (zoomed out, looking down slightly)
    camera.position.set(0, 12, 22);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222233);
    scene.add(ambientLight);

    // Glowing Sun light source
    const sunLight = new THREE.PointLight(0xffd79e, 4, 100, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const sunLightHelper = new THREE.DirectionalLight(0x7c3aed, 1.5);
    sunLightHelper.position.set(5, 10, 5);
    scene.add(sunLightHelper);

    // 1. Sun
    const sunGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    // Emissive yellow-orange glowing sun
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8800,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Add a glowing wireframe/aura to the Sun for more depth
    const sunWireframeGeo = new THREE.SphereGeometry(2.35, 16, 16);
    const sunWireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sunWireframe = new THREE.Mesh(sunWireframeGeo, sunWireframeMat);
    sun.add(sunWireframe);

    // 2. Stars (Starfield)
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorsList = [
      new THREE.Color(0xffffff), // White
      new THREE.Color(0xaaccff), // Light blue
      new THREE.Color(0xddaaff), // Purple
      new THREE.Color(0xffbbbb), // Pale red
    ];

    for (let i = 0; i < starCount * 3; i += 3) {
      // Distribute stars in a large spherical shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 25 + Math.random() * 50; // Between radius 25 and 75

      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);

      const color = colorsList[Math.floor(Math.random() * colorsList.length)];
      starColors[i] = color.r;
      starColors[i + 1] = color.g;
      starColors[i + 2] = color.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // 3. Planets
    interface PlanetData {
      mesh: THREE.Mesh;
      radius: number;
      orbitRadius: number;
      speed: number;
      angle: number;
      orbitLine: THREE.LineLoop;
    }

    const planetConfigs = [
      { radius: 0.35, orbitRadius: 4.8, color: 0xff5533, speed: 0.012 }, // Mercury-like (Red-orange)
      { radius: 0.55, orbitRadius: 7.2, color: 0x33bbee, speed: 0.008 }, // Earth-like (Blue-cyan)
      { radius: 0.85, orbitRadius: 10.8, color: 0xe2c695, speed: 0.005, hasRings: true }, // Saturn-like (Tan with rings)
      { radius: 0.5, orbitRadius: 14.2, color: 0x9955ff, speed: 0.003 }, // Neptune-like (Purple-indigo)
    ];

    const planets: PlanetData[] = [];

    planetConfigs.forEach((config) => {
      // Planet Mesh
      const geo = new THREE.SphereGeometry(config.radius, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: config.color,
        roughness: 0.6,
        metalness: 0.2,
        emissive: config.color,
        emissiveIntensity: 0.12,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Saturn Rings
      if (config.hasRings) {
        const ringGeo = new THREE.RingGeometry(config.radius * 1.4, config.radius * 2.3, 30);
        ringGeo.rotateX(Math.PI / 2); // Lay flat
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd8be8a,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        mesh.add(ringMesh);
      }

      scene.add(mesh);

      // Orbit Line
      const orbitPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(theta) * config.orbitRadius, 0, Math.sin(theta) * config.orbitRadius));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.18,
      });
      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      scene.add(orbitLine);

      planets.push({
        mesh,
        radius: config.radius,
        orbitRadius: config.orbitRadius,
        speed: config.speed,
        angle: Math.random() * Math.PI * 2, // Random starting position
        orbitLine,
      });
    });

    // 4. Scroll Tracking
    let scrollProgress = 0;
    const calculateScrollProgress = () => {
      const section = document.getElementById("projects");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Progress goes from 0 (section starts appearing) to 1 (section completely leaves)
      const start = sectionTop - viewportHeight;
      const end = sectionTop + sectionHeight;
      const current = window.scrollY;

      let p = (current - start) / (end - start);
      scrollProgress = Math.max(0, Math.min(1, p));
    };

    window.addEventListener("scroll", calculateScrollProgress, { passive: true });
    calculateScrollProgress();

    // 5. Mouse Interaction (Parallax)
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5; // [-0.5, 0.5]
      mouseY = (e.clientY / window.innerHeight) - 0.5; // [-0.5, 0.5]
    };
    window.addEventListener("mousemove", onMouseMove);

    // 6. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || 600;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Rotate Sun
      sun.rotation.y = elapsed * 0.08;
      sunWireframe.rotation.y = -elapsed * 0.04;
      sunWireframe.rotation.x = elapsed * 0.02;

      // Animate Planets in orbit
      planets.forEach((planet) => {
        planet.angle += planet.speed * 0.6; // Speed multiplier
        planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitRadius;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitRadius;
        planet.mesh.rotation.y = elapsed * 0.4;
      });

      // Slowly rotate starfield for ambient motion
      starfield.rotation.y = elapsed * 0.008;
      starfield.rotation.x = elapsed * 0.003;

      // Scroll camera zoom path interpolation:
      // At scrollProgress = 0, camera is far away: x: mouseX * 3, y: 12 + mouseY * 3, z: 22
      // At scrollProgress = 1, camera is close/passed: x: 2.5 + mouseX * 3, y: 2.2 + mouseY * 3, z: 4.8
      const targetCamX = (mouseX * 4) + (scrollProgress * 3.5);
      const targetCamY = 12 - (scrollProgress * 9.8) + (mouseY * 4);
      const targetCamZ = 22 - (scrollProgress * 17.2);

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      // Focus point: camera shifts from Sun (0,0,0) to slightly offset as it zooms
      const targetLookAt = new THREE.Vector3(scrollProgress * 2.0, 0, 0);
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);

      // Clean up resources
      sunGeometry.dispose();
      sunMaterial.dispose();
      sunWireframeGeo.dispose();
      sunWireframeMat.dispose();
      starGeometry.dispose();
      starMaterial.dispose();

      planets.forEach((p) => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach((m) => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
        p.orbitLine.geometry.dispose();
        if (Array.isArray(p.orbitLine.material)) {
          p.orbitLine.material.forEach((m) => m.dispose());
        } else {
          p.orbitLine.material.dispose();
        }
      });

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0 overflow-hidden pointer-events-none opacity-45 sm:opacity-60"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, transparent)",
      }}
    />
  );
}
