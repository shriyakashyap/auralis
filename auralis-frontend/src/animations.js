import { easeOut } from "framer-motion";

export const staggerContainer = (staggerTime = 0.08, delayChildren = 0.15) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren: staggerTime
    }
  }
});

// 1. (Master Parent) Card slides in, but delays its staggered children
export const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      // The master delay. Every child must wait this long.
      delayChildren: 0.6, // Wait 600ms AFTER card appears
      // Once started, cascade the rest every 100ms
      staggerChildren: 0.12 
    }
  }
};

// 2. The Setup (plays almost immediately)
export const setupVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { delay: 0.3, duration: 1.2 } 
  }
};

// 3. The Reveal (waits 1.2 seconds for dramatic effect)
export const revealVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// 4. The Rest (waits 1.8s total, then staggers its children)
export const detailsStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      delayChildren: 1.5, 
      staggerChildren: 0.2 // Cascades children 100ms apart
    }
  }
};

// 5. Shared Child Fade (used inside detailsStagger)
export const itemFade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Slow, gentle fade and rise for the logo title
export const slowTitleVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1], // Smooth ease-out
      delay: 0.2
    }
  }
};

// Delayed container that lets the title breathe before starting the subtitle/button
export const slowWelcomeStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.2,   // Waits nearly 1s after title begins
      staggerChildren: 0.25 // Generous quarter-second gap between lines & button
    }
  }
};

// Smooth, slower fade-in for tagline lines, button, and note
export const slowItemFade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};