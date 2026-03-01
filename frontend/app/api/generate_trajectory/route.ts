import { NextResponse } from "next/server";

type GenerateTrajectoryRequest = {
  current_angles?: [number, number, number] | number[];
  target_x?: number;
  target_y?: number;
  duration?: number;
  dt?: number;
  l1?: number;
  l2?: number;
  l3?: number;
};

type TrajectoryPoint = {
  time: number;
  q1: number;
  q2: number;
  q3: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function coerceAngles(angles: unknown): [number, number, number] {
  if (!Array.isArray(angles) || angles.length < 3) {
    return [Math.PI / 4, -Math.PI / 4, -Math.PI / 4];
  }
  const a0 = Number(angles[0]);
  const a1 = Number(angles[1]);
  const a2 = Number(angles[2]);
  if ([a0, a1, a2].every((n) => Number.isFinite(n))) return [a0, a1, a2];
  return [Math.PI / 4, -Math.PI / 4, -Math.PI / 4];
}

function solveApproxIk2Link(
  x: number,
  y: number,
  l1: number,
  l23: number,
): [number, number] {
  const r2 = x * x + y * y;
  const cosQ2 = clamp((r2 - l1 * l1 - l23 * l23) / (2 * l1 * l23), -1, 1);
  const q2 = Math.acos(cosQ2);
  const k1 = l1 + l23 * Math.cos(q2);
  const k2 = l23 * Math.sin(q2);
  const q1 = Math.atan2(y, x) - Math.atan2(k2, k1);
  return [q1, q2];
}

function generateMockTrajectory(req: GenerateTrajectoryRequest) {
  const current = coerceAngles(req.current_angles);

  const l1 = isFiniteNumber(req.l1) ? req.l1 : 100;
  const l2 = isFiniteNumber(req.l2) ? req.l2 : 80;
  const l3 = isFiniteNumber(req.l3) ? req.l3 : 60;

  const dt = isFiniteNumber(req.dt) ? clamp(req.dt, 0.01, 0.2) : 0.05;
  const duration = isFiniteNumber(req.duration)
    ? clamp(req.duration, 0.2, 20)
    : 2.5;

  const targetX = isFiniteNumber(req.target_x) ? req.target_x : 120;
  const targetY = isFiniteNumber(req.target_y) ? req.target_y : 40;

  const l23 = l2 + l3;
  const [q1Target, q2Target] = solveApproxIk2Link(targetX, targetY, l1, l23);
  const target: [number, number, number] = [q1Target, q2Target, 0];

  const steps = Math.max(2, Math.floor(duration / dt) + 1);
  const trajectory: TrajectoryPoint[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i * dt;
    const s = duration <= 0 ? 1 : 0.5 - 0.5 * Math.cos((Math.PI * t) / duration);
    const q1 = current[0] + s * (target[0] - current[0]);
    const q2 = current[1] + s * (target[1] - current[1]);
    const q3 = current[2] + s * (target[2] - current[2]);
    trajectory.push({ time: Number(t.toFixed(4)), q1, q2, q3 });
  }

  return {
    trajectory,
    mocked: true,
  };
}

export async function POST(request: Request) {
  let body: GenerateTrajectoryRequest | undefined;
  try {
    body = (await request.json()) as GenerateTrajectoryRequest;
  } catch {
    body = undefined;
  }

  return NextResponse.json(generateMockTrajectory(body ?? {}));
}
