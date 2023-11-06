export const fadeLeft = {
  hidden: { opacity: 0.7, x: 0, scale: 1 },
  visible: { opacity: 0, x: '-40vw', scale: 1.6, transition: { duration: 5 } },
}

export const fadeRight = {
  hidden: { opacity: 0.7, x: 0, scale: 1 },
  visible: { opacity: 0, x: '40vw', scale: 1.6, transition: { duration: 5 } },
}

export const fadeUp = {
  hidden: { opacity: 0.7, y: 0, scale: 1 },
  visible: { opacity: 0, y: '-40vh', scale: 0.8, transition: { duration: 5 } },
}
export const fadeDown = {
  hidden: { opacity: 0.7, y: 0, scale: 1 },
  visible: { opacity: 0, y: '40vh', scale: 0.8, transition: { duration: 5 } },
}
