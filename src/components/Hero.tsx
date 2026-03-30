import { motion } from "framer-motion";
import { ChevronDown, Shield, Sparkles } from "lucide-react";

const stats = [
  { value: "2,500+", label: "Бустов" },
  { value: "99.7%", label: "Успех" },
  { value: "24/7", label: "Поддержка" },
];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #FF8C00 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #FF8C00 0%, transparent 70%)" }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            background: "rgba(255, 140, 0, 0.1)",
            border: "1px solid rgba(255, 140, 0, 0.2)",
          }}
        >
          <Sparkles className="h-4 w-4" style={{ color: "#FF8C00" }} />
          <span className="text-sm font-medium" style={{ color: "#FF8C00" }}>
            Профессиональный буст Dota 2
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-white">Твой ранг —</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #FF8C00, #FFB347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            твой покой.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-10 max-w-xl text-lg font-medium leading-relaxed md:text-xl"
          style={{ color: "#8E8E93" }}
        >
          Исцеление профиля, сбережение души.
          <br />
          Пока мы бустим — ты живёшь.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #FF8C00, #E07B00)",
              boxShadow: "0 0 30px rgba(255, 140, 0, 0.25)",
            }}
          >
            <Shield className="h-5 w-5" />
            Начать исцеление
          </motion.a>
          <motion.a
            href="#reviews"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-colors"
            style={{
              color: "#AEAEB2",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Отзывы
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center gap-12 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold md:text-3xl"
                style={{ color: "#FF8C00" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-xs font-medium uppercase tracking-wider"
                style={{ color: "#636366" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="animate-scroll-indicator flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium" style={{ color: "#636366" }}>
            Листай
          </span>
          <ChevronDown className="h-4 w-4" style={{ color: "#636366" }} />
        </motion.div>
      </div>
    </section>
  );
}
