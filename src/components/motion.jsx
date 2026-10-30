import { motion } from "framer-motion";

export const EASE = [0.23, 1, 0.32, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const stagger = (delay = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

const viewport = { once: true, margin: "0px 0px -60px 0px" };

export function RevealGroup({ as = "div", gap = 0.05, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={stagger(gap)} initial="hidden" whileInView="show" viewport={viewport} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export function Item({ as = "div", className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={fadeUp} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export const press = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.12, ease: EASE },
};
