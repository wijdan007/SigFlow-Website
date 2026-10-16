// Shared mutable object for cross-component scroll communication
// Avoids React re-renders — read directly in useFrame
export const heroScrollProgress = { value: 0 }
