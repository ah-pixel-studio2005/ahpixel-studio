"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type BuildSystemCanvasHandle = {
  setProgress: (progress: number) => void;
};

type Point3 = { x: number; y: number; z: number };
type Point2 = { x: number; y: number };

const CYAN = "35, 211, 255";
const BLUE = "95, 177, 255";
const GOLD = "255, 220, 0";
const AMBER = "255, 176, 32";
const GREEN = "32, 220, 142";
const WHITE = "220, 231, 241";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
const smooth = (value: number) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

function rotate(point: Point3, rx: number, ry: number, rz: number): Point3 {
  let { x, y, z } = point;
  let c = Math.cos(rx);
  let s = Math.sin(rx);
  [y, z] = [y * c - z * s, y * s + z * c];
  c = Math.cos(ry);
  s = Math.sin(ry);
  [x, z] = [x * c + z * s, -x * s + z * c];
  c = Math.cos(rz);
  s = Math.sin(rz);
  [x, y] = [x * c - y * s, x * s + y * c];
  return { x, y, z };
}

function project(point: Point3, width: number, height: number): Point2 {
  const depth = Math.max(2.6, point.z + 9.5);
  const focal = Math.min(width, height) * 1.02;
  const scale = focal / depth;
  return {
    x: width * 0.52 + point.x * scale,
    y: height * 0.43 + point.y * scale,
  };
}

function rgba(color: string, alpha: number) {
  return `rgba(${color}, ${clamp(alpha)})`;
}

function strokeLine(
  context: CanvasRenderingContext2D,
  a: Point2,
  b: Point2,
  color: string,
  alpha: number,
  width = 1,
  dash: number[] = [],
) {
  context.save();
  context.strokeStyle = rgba(color, alpha);
  context.lineWidth = width;
  context.setLineDash(dash);
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.stroke();
  context.restore();
}

function drawGlow(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha: number,
) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, rgba(color, alpha));
  gradient.addColorStop(0.22, rgba(color, alpha * 0.45));
  gradient.addColorStop(1, rgba(color, 0));
  context.fillStyle = gradient;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function drawGround(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  context.save();
  const horizon = height * 0.41;
  const bottom = height * 1.05;

  for (let index = -11; index <= 11; index += 1) {
    const bottomX = width * 0.5 + index * width * 0.115;
    strokeLine(
      context,
      { x: width * 0.5 + index * 2.2, y: horizon },
      { x: bottomX, y: bottom },
      BLUE,
      index % 2 === 0 ? 0.12 : 0.065,
      0.8,
    );
  }

  for (let row = 0; row < 11; row += 1) {
    const t = row / 10;
    const y = horizon + Math.pow(t, 2.15) * (bottom - horizon);
    context.strokeStyle = rgba(BLUE, 0.05 + t * 0.06);
    context.lineWidth = 0.75;
    context.beginPath();
    context.ellipse(width * 0.5, y, width * (0.12 + t * 0.74), 10 + t * 46, 0, 0, Math.PI * 2);
    context.stroke();
  }

  const sweep = (time * 22) % (width * 1.4);
  strokeLine(
    context,
    { x: sweep - width * 0.25, y: horizon + 4 },
    { x: sweep, y: bottom },
    CYAN,
    0.12,
    1,
  );
  context.restore();
}

function drawCube(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  center: Point3,
  size: number,
  rotation: Point3,
  color: string,
  alpha: number,
  fillAlpha = 0,
) {
  const vertices: Point3[] = [];
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        const rotated = rotate(
          { x: x * size, y: y * size, z: z * size },
          rotation.x,
          rotation.y,
          rotation.z,
        );
        vertices.push({
          x: rotated.x + center.x,
          y: rotated.y + center.y,
          z: rotated.z + center.z,
        });
      }
    }
  }

  const points = vertices.map((point) => project(point, width, height));
  const edges = [
    [0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6],
    [3, 7], [4, 5], [4, 6], [5, 7], [6, 7],
  ];

  if (fillAlpha > 0) {
    context.save();
    context.fillStyle = rgba(color, fillAlpha);
    context.beginPath();
    for (const index of [6, 4, 5, 7]) {
      const point = points[index];
      if (index === 6) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
    context.closePath();
    context.fill();
    context.restore();
  }

  for (const [start, end] of edges) {
    strokeLine(context, points[start], points[end], color, alpha, 1.1);
  }
}

function drawWireSphere(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  time: number,
  color: string,
  alpha: number,
) {
  context.save();
  context.translate(x, y);
  context.rotate(time * 0.08);
  context.strokeStyle = rgba(color, alpha);
  context.lineWidth = 0.85;

  for (let index = 0; index < 7; index += 1) {
    context.beginPath();
    context.ellipse(0, 0, radius, radius * (0.12 + index * 0.125), index * 0.38, 0, Math.PI * 2);
    context.stroke();
  }

  const nodes = Array.from({ length: 18 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 18 + time * 0.035;
    const wobble = 0.72 + ((index * 17) % 8) / 22;
    return { x: Math.cos(angle) * radius * wobble, y: Math.sin(angle) * radius * wobble };
  });

  for (let index = 0; index < nodes.length; index += 1) {
    const next = nodes[(index * 5 + 3) % nodes.length];
    strokeLine(context, nodes[index], next, color, alpha * 0.72, 0.65);
  }
  context.restore();
}

function drawPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  color: string,
  alpha: number,
  glow = false,
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  if (glow) drawGlow(context, 0, 0, Math.max(width, height) * 0.85, color, alpha * 0.28);
  context.fillStyle = rgba(color, alpha * 0.055);
  context.strokeStyle = rgba(color, alpha);
  context.lineWidth = 1;
  context.fillRect(-width / 2, -height / 2, width, height);
  context.strokeRect(-width / 2, -height / 2, width, height);
  context.strokeStyle = rgba(color, alpha * 0.38);
  context.beginPath();
  context.moveTo(-width / 2, -height * 0.16);
  context.lineTo(width / 2, -height * 0.16);
  context.moveTo(-width * 0.32, height * 0.13);
  context.lineTo(width * 0.24, height * 0.13);
  context.stroke();
  context.restore();
}

function drawOrbit(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  color: string,
  alpha: number,
  rotation = 0,
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.strokeStyle = rgba(color, alpha);
  context.lineWidth = 0.9;
  context.beginPath();
  context.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function drawParticles(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const colors = [GOLD, CYAN, GREEN, AMBER, WHITE];
  for (let index = 0; index < 38; index += 1) {
    const seed = ((index * 97) % 101) / 101;
    const angle = index * 1.73 + time * (0.025 + (index % 5) * 0.004);
    const radius = width * (0.12 + seed * 0.34);
    const x = width * 0.5 + Math.cos(angle) * radius;
    const y = height * 0.42 + Math.sin(angle * 0.72) * radius * 0.28;
    const size = 1 + (index % 3) * 0.65;
    drawGlow(context, x, y, 10 + size * 5, colors[index % colors.length], alpha * 0.28);
    context.fillStyle = rgba(colors[index % colors.length], alpha * 0.75);
    context.fillRect(x, y, size, size);
  }
}

const CORE_STATIONS = [
  { x: 0.43, y: 0.44, depth: 0.92 },
  { x: 0.64, y: 0.38, depth: 1.06 },
  { x: 0.39, y: 0.31, depth: 0.88 },
  { x: 0.65, y: 0.3, depth: 1.1 },
  { x: 0.58, y: 0.5, depth: 0.94 },
  { x: 0.4, y: 0.46, depth: 1.12 },
  { x: 0.58, y: 0.32, depth: 0.9 },
  { x: 0.67, y: 0.49, depth: 1.08 },
  { x: 0.38, y: 0.47, depth: 0.91 },
  { x: 0.65, y: 0.35, depth: 1.12 },
  { x: 0.5, y: 0.4, depth: 0.98 },
] as const;

function drawCoreRoute(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  phase: number,
  time: number,
) {
  context.save();
  context.setLineDash([3, 9]);
  context.lineWidth = 0.8;
  context.strokeStyle = rgba(GOLD, 0.12);
  context.beginPath();
  CORE_STATIONS.forEach((station, index) => {
    const x = station.x * width;
    const y = station.y * height;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
  context.setLineDash([]);

  CORE_STATIONS.forEach((station, index) => {
    const distance = Math.abs(phase - index);
    const alpha = 0.08 + Math.max(0, 1 - distance) * 0.22;
    context.strokeStyle = rgba(GOLD, alpha);
    context.lineWidth = 0.8;
    context.beginPath();
    context.ellipse(station.x * width, station.y * height, 7, 3, 0, 0, Math.PI * 2);
    context.stroke();
  });

  const startIndex = Math.min(CORE_STATIONS.length - 2, Math.floor(phase));
  const local = clamp(phase - startIndex);
  const eased = smooth(local);
  const start = CORE_STATIONS[startIndex];
  const end = CORE_STATIONS[startIndex + 1];
  const x = (start.x + (end.x - start.x) * eased) * width;
  const baseY = (start.y + (end.y - start.y) * eased) * height;
  const y = baseY - Math.sin(Math.PI * eased) * height * 0.035;
  const depth = start.depth + (end.depth - start.depth) * eased;

  strokeLine(
    context,
    { x: start.x * width, y: start.y * height },
    { x: end.x * width, y: end.y * height },
    GOLD,
    0.34,
    1,
    [3, 6],
  );

  for (let index = 0; index < 9; index += 1) {
    const trail = clamp(eased - index * 0.035);
    const trailX = (start.x + (end.x - start.x) * trail) * width;
    const trailY = (start.y + (end.y - start.y) * trail) * height - Math.sin(Math.PI * trail) * height * 0.035;
    const trailAlpha = (1 - index / 9) * 0.14;
    drawGlow(context, trailX, trailY, 12 + index * 1.4, GOLD, trailAlpha);
  }

  const size = Math.min(width, height) * 0.042 * depth;
  const faceOffset = size * 0.28;
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * 0.08 + Math.sin(time * 0.42) * 0.035;

  drawGlow(context, x, y, size * 3.3, GOLD, 0.42);
  context.translate(x, y);
  context.rotate(angle);

  context.fillStyle = rgba(GOLD, 0.96);
  context.strokeStyle = rgba(GOLD, 1);
  context.lineWidth = 1.25;
  context.fillRect(-size / 2, -size / 2, size, size);
  context.strokeRect(-size / 2, -size / 2, size, size);

  context.fillStyle = rgba(AMBER, 0.58);
  context.beginPath();
  context.moveTo(size / 2, -size / 2);
  context.lineTo(size / 2 + faceOffset, -size / 2 - faceOffset);
  context.lineTo(size / 2 + faceOffset, size / 2 - faceOffset);
  context.lineTo(size / 2, size / 2);
  context.closePath();
  context.fill();
  context.stroke();

  context.fillStyle = rgba(WHITE, 0.16);
  context.beginPath();
  context.moveTo(-size / 2, -size / 2);
  context.lineTo(-size / 2 + faceOffset, -size / 2 - faceOffset);
  context.lineTo(size / 2 + faceOffset, -size / 2 - faceOffset);
  context.lineTo(size / 2, -size / 2);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
}

function drawDiscover(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  drawParticles(context, width, height, time, alpha);
  drawCube(context, width, height, { x: -2.5, y: 0.25, z: 3.8 }, 0.8, { x: 0.6, y: time * 0.18, z: 0.8 }, GOLD, alpha * 0.22, 0.035 * alpha);
  drawWireSphere(context, width * 0.66, height * 0.38, Math.min(width, height) * 0.14, time, BLUE, alpha * 0.85);
  drawOrbit(context, width * 0.5, height * 0.46, width * 0.33, height * 0.105, BLUE, alpha * 0.55, -0.06);
  drawPanel(context, width * 0.82, height * 0.57, width * 0.11, height * 0.18, -0.2, GREEN, alpha * 0.68);
}

function drawDesign(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  drawWireSphere(context, width * 0.54, height * 0.36, Math.min(width, height) * 0.18, time, BLUE, alpha);
  const panels = [
    [0.27, 0.29, -0.08], [0.35, 0.55, 0.04], [0.73, 0.31, 0.07], [0.72, 0.57, -0.04],
  ];
  panels.forEach(([x, y, rotation], index) =>
    drawPanel(context, width * x, height * y, width * 0.14, height * 0.14, rotation, index === 1 ? GOLD : WHITE, alpha * (index === 1 ? 0.95 : 0.42), index === 1),
  );
  drawCube(context, width, height, { x: -1.8, y: 1.08, z: 4.1 }, 0.66, { x: 0.6, y: time * 0.2, z: 0.35 }, GOLD, alpha * 0.22, 0.035 * alpha);
  drawOrbit(context, width * 0.5, height * 0.51, width * 0.3, height * 0.09, CYAN, alpha * 0.45);
}

function drawDirection(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const cx = width * 0.54;
  const cy = height * 0.43;
  drawOrbit(context, cx, cy, width * 0.31, height * 0.1, BLUE, alpha * 0.7, -0.08);
  drawOrbit(context, cx, cy, width * 0.22, height * 0.07, GOLD, alpha * 0.48, 0.05);
  drawWireSphere(context, width * 0.69, height * 0.35, Math.min(width, height) * 0.1, time, BLUE, alpha * 0.75);
  drawCube(context, width, height, { x: -1.4, y: 0.42, z: 3.1 }, 0.66, { x: 0.58, y: time * 0.24, z: 0.45 }, GOLD, alpha * 0.22, 0.04 * alpha);
  strokeLine(context, { x: width * 0.29, y: height * 0.38 }, { x: width * 0.73, y: height * 0.35 }, GOLD, alpha * 0.5, 0.8);
  drawParticles(context, width, height, time * 0.8, alpha * 0.62);
}

function drawStructure(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const panels = [
    [0.34, 0.31, 0.15, 0.2, -0.035],
    [0.55, 0.28, 0.18, 0.25, 0],
    [0.76, 0.31, 0.15, 0.2, 0.035],
  ];
  panels.forEach(([x, y, panelWidth, panelHeight, rotation], index) => {
    drawPanel(
      context,
      width * x,
      height * y,
      width * panelWidth,
      height * panelHeight,
      rotation,
      index === 1 ? GOLD : WHITE,
      alpha * (index === 1 ? 0.82 : 0.28),
      index === 1,
    );
  });
  drawCube(context, width, height, { x: -0.05, y: 1.12, z: 3.8 }, 0.48, { x: 0.5, y: time * 0.22, z: 0.25 }, GOLD, alpha * 0.2, 0.03 * alpha);
  drawOrbit(context, width * 0.55, height * 0.62, width * 0.22, height * 0.055, BLUE, alpha * 0.42);
}

function drawApproval(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const cx = width * 0.55;
  for (let index = 0; index < 3; index += 1) {
    drawPanel(
      context,
      cx + (index - 1) * width * 0.17,
      height * (0.3 + Math.abs(index - 1) * 0.045),
      width * (index === 1 ? 0.18 : 0.14),
      height * (index === 1 ? 0.34 : 0.24),
      (index - 1) * 0.035,
      GOLD,
      alpha * (index === 1 ? 0.75 : 0.24),
      index === 1,
    );
  }
  drawCube(context, width, height, { x: 0.1, y: 1.18, z: 3.4 }, 0.54, { x: 0.45, y: time * 0.18, z: 0.18 }, GOLD, alpha * 0.2, 0.04 * alpha);
  drawOrbit(context, cx, height * 0.67, width * 0.18, height * 0.052, AMBER, alpha * 0.48);
}

function drawBuild(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const panelWidth = width * 0.15;
  const panelHeight = height * 0.22;
  for (let index = 0; index < 3; index += 1) {
    drawPanel(
      context,
      width * (0.34 + index * 0.2),
      height * (0.33 + Math.abs(1 - index) * 0.035),
      panelWidth,
      panelHeight,
      (index - 1) * 0.035,
      index === 1 ? GOLD : WHITE,
      alpha * (index === 1 ? 0.78 : 0.28),
      index === 1,
    );
  }
  drawCube(context, width, height, { x: -0.1, y: 1.16, z: 3.6 }, 0.58, { x: 0.45, y: time * 0.22, z: -0.18 }, GOLD, alpha * 0.2, 0.04 * alpha);
  drawOrbit(context, width * 0.54, height * 0.62, width * 0.2, height * 0.055, GOLD, alpha * 0.42);
  drawParticles(context, width, height, time * 0.65, alpha * 0.5);
}

function drawRefine(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const centerX = width * 0.56;
  for (let index = 0; index < 4; index += 1) {
    const panelAlpha = alpha * (0.22 + index * 0.14);
    drawPanel(
      context,
      centerX + index * width * 0.012,
      height * (0.32 + index * 0.025),
      width * (0.34 - index * 0.035),
      height * (0.56 - index * 0.055),
      -0.025 + index * 0.012,
      GOLD,
      panelAlpha,
      index === 3,
    );
  }
  drawCube(context, width, height, { x: 0.4, y: 1.04, z: 2.6 }, 0.72, { x: 0.42, y: time * 0.18, z: 0.17 }, GOLD, alpha * 0.2, 0.05 * alpha);
  drawOrbit(context, width * 0.56, height * 0.68, width * 0.21, height * 0.065, AMBER, alpha * 0.48);
  const scanY = height * (0.16 + ((time * 0.11) % 1) * 0.55);
  const gradient = context.createLinearGradient(0, scanY - 50, 0, scanY + 4);
  gradient.addColorStop(0, rgba(GOLD, 0));
  gradient.addColorStop(1, rgba(GOLD, alpha * 0.16));
  context.fillStyle = gradient;
  context.fillRect(width * 0.22, scanY - 50, width * 0.68, 54);
  strokeLine(context, { x: width * 0.22, y: scanY }, { x: width * 0.9, y: scanY }, GOLD, alpha * 0.52);
}

function drawPreview(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const cx = width * 0.55;
  const cy = height * 0.42;
  drawWireSphere(context, cx, cy, Math.min(width, height) * 0.19, time, BLUE, alpha);
  drawOrbit(context, cx, height * 0.61, width * 0.25, height * 0.08, GOLD, alpha * 0.58);
  drawCube(context, width, height, { x: 0.3, y: 0.28, z: 3.05 }, 0.58, { x: 0.48, y: time * 0.25, z: 0.3 }, GOLD, alpha * 0.2, 0.05 * alpha);
  drawGlow(context, cx, cy, Math.min(width, height) * 0.17, GOLD, alpha * 0.2);
  drawParticles(context, width, height, time, alpha * 0.44);
}

function drawResponsive(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const cx = width * 0.52;
  const cy = height * 0.43;
  drawOrbit(context, cx, cy, width * 0.37, height * 0.14, BLUE, alpha * 0.66, -0.05);
  drawOrbit(context, cx, cy, width * 0.22, height * 0.08, GOLD, alpha * 0.56, 0.05);
  const devices = [
    [0.27, 0.36, 0.09, 0.18, -0.13],
    [0.48, 0.3, 0.13, 0.12, 0.02],
    [0.73, 0.42, 0.07, 0.19, 0.11],
  ];
  devices.forEach(([x, y, w, h, rotation], index) => {
    drawPanel(context, width * x, height * y, width * w, height * h, rotation, index === 1 ? GOLD : CYAN, alpha * (index === 1 ? 0.88 : 0.62), index === 1);
  });
  drawCube(context, width, height, { x: 0.2, y: 1.0, z: 3.6 }, 0.48, { x: 0.44, y: time * 0.25, z: 0.2 }, GOLD, alpha * 0.18, 0.03 * alpha);
}

function drawLaunch(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const cx = width * 0.51;
  const cy = height * 0.43;
  drawOrbit(context, cx, cy, width * 0.47, height * 0.29, GOLD, alpha * 0.75, 0.04);
  drawOrbit(context, cx, cy, width * 0.35, height * 0.22, BLUE, alpha * 0.42, -0.04);
  drawOrbit(context, cx, cy, width * 0.18, height * 0.09, CYAN, alpha * 0.55, 0.03);

  const orbitObjects = [
    [0.08, 0.44, "sphere"], [0.2, 0.22, "panel"], [0.39, 0.19, "cube"],
    [0.63, 0.19, "panel"], [0.82, 0.29, "sphere"], [0.92, 0.51, "cube"],
    [0.76, 0.66, "panel"], [0.25, 0.69, "cube"],
  ] as const;

  orbitObjects.forEach(([x, y, kind], index) => {
    const px = width * x;
    const py = height * y + Math.sin(time * 0.4 + index) * 5;
    if (kind === "sphere") drawWireSphere(context, px, py, Math.min(width, height) * 0.055, time + index, BLUE, alpha * 0.72);
    if (kind === "panel") drawPanel(context, px, py, width * 0.07, height * 0.13, (index - 4) * 0.08, index % 2 ? GOLD : GREEN, alpha * 0.68, index === 6);
    if (kind === "cube") drawCube(context, width, height, { x: (x - 0.52) * 8.4, y: (y - 0.42) * 5.8, z: 4.6 }, 0.32, { x: 0.5, y: time * 0.22 + index, z: 0.4 }, index % 2 ? GOLD : CYAN, alpha, 0.08 * alpha);
  });

  drawParticles(context, width, height, time, alpha * 0.52);
  drawGlow(context, cx, cy, Math.min(width, height) * 0.17, CYAN, alpha * 0.1);
}

function drawLiveLoop(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  alpha: number,
) {
  const cx = width * 0.5;
  const cy = height * 0.44;
  drawOrbit(context, cx, cy, width * 0.49, height * 0.31, GOLD, alpha * 0.78, 0.03);
  drawOrbit(context, cx, cy, width * 0.39, height * 0.22, BLUE, alpha * 0.54, -0.05);
  drawOrbit(context, cx, cy, width * 0.23, height * 0.1, CYAN, alpha * 0.58, 0.02);
  drawWireSphere(context, width * 0.18, height * 0.33, Math.min(width, height) * 0.06, time, BLUE, alpha * 0.62);
  drawWireSphere(context, width * 0.82, height * 0.31, Math.min(width, height) * 0.07, time + 2, BLUE, alpha * 0.72);
  drawPanel(context, width * 0.1, height * 0.53, width * 0.08, height * 0.18, -0.14, GREEN, alpha * 0.64, true);
  drawPanel(context, width * 0.9, height * 0.55, width * 0.07, height * 0.16, 0.14, GOLD, alpha * 0.7, true);
  drawCube(context, width, height, { x: -0.1, y: 0.45, z: 3.5 }, 0.55, { x: 0.5, y: time * 0.25, z: 0.3 }, GOLD, alpha * 0.18, 0.04 * alpha);
  drawParticles(context, width, height, time * 1.15, alpha * 0.72);
  drawGlow(context, cx, cy, Math.min(width, height) * 0.2, CYAN, alpha * 0.12);
}

const SYSTEM_SCENES = [
  drawDiscover,
  drawDirection,
  drawDesign,
  drawStructure,
  drawApproval,
  drawBuild,
  drawPreview,
  drawRefine,
  drawResponsive,
  drawLaunch,
  drawLiveLoop,
];

const BuildSystemCanvas = forwardRef<BuildSystemCanvasHandle>(function BuildSystemCanvas(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setProgress(progress: number) {
      // Keep the route interpolation inside its final segment while still
      // rendering the last scene at full visual weight.
      progressRef.current = clamp(progress, 0, 0.999999);
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let time = 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
    let isVisible = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { rootMargin: "160px 0px" });
    visibilityObserver.observe(canvas);
    resize();

    const render = () => {
      time += 0.016;
      if (!isVisible || document.hidden) {
        frame = requestAnimationFrame(render);
        return;
      }
      context.clearRect(0, 0, width, height);
      drawGround(context, width, height, time);

      const phase = progressRef.current * 10;
      const sceneWeights = Array.from({ length: 11 }, (_, index) =>
        smooth(1 - Math.abs(phase - index)),
      );

      SYSTEM_SCENES.forEach((drawScene, index) => {
        if (sceneWeights[index] > 0.001) {
          const station = CORE_STATIONS[index];
          const offsetX = (station.x - 0.5) * width * 0.88;
          const offsetY = (station.y - 0.4) * height * 0.72;
          const stationScale = 0.9 + (station.depth - 0.88) * 0.72;
          const transitionTilt = (index - phase) * 0.012;

          context.save();
          context.translate(width * 0.5 + offsetX, height * 0.5 + offsetY);
          context.rotate(transitionTilt);
          context.scale(stationScale, stationScale);
          context.translate(-width * 0.5, -height * 0.5);
          drawScene(context, width, height, time, sceneWeights[index]);
          context.restore();
        }
      });

      drawCoreRoute(context, width, height, phase, time);

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="system-canvas" aria-hidden="true" />;
});

export default BuildSystemCanvas;
