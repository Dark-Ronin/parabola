export function calculateProjectile({
  velocity,
  angle,
  height = 0,
  gravity = 9.81,
}) {
  if (velocity < 0) {
    throw new Error("A velocidade não pode ser negativa.");
  }

  if (angle < 0 || angle > 90) {
    throw new Error("O ângulo deve estar entre 0° e 90°.");
  }

  if (height < 0) {
    throw new Error("A altura inicial não pode ser negativa.");
  }

  if (gravity <= 0) {
    throw new Error("A gravidade deve ser maior que zero.");
  }

  const radians = (angle * Math.PI) / 180;

  const velocityX = velocity * Math.cos(radians);
  const velocityY = velocity * Math.sin(radians);

  const flightTime =
    (velocityY +
      Math.sqrt(velocityY ** 2 + 2 * gravity * height)) /
    gravity;

  const maxHeight =
    height + velocityY ** 2 / (2 * gravity);

  const range = velocityX * flightTime;

  const impactVelocityY =
    velocityY - gravity * flightTime;

  const impactVelocity = Math.sqrt(
    velocityX ** 2 + impactVelocityY ** 2
  );

  const trajectory = [];

  const steps = 100;

  for (let i = 0; i <= steps; i++) {
    const time = (flightTime / steps) * i;

    const x = velocityX * time;

    const y =
      height +
      velocityY * time -
      0.5 * gravity * time ** 2;

    trajectory.push({
      time,
      x: Math.max(0, x),
      y: Math.max(0, y),
    });
  }

  return {
    flightTime,
    maxHeight,
    range,
    velocityX,
    velocityY,
    impactVelocity,
    trajectory,
  };
}