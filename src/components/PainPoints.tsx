import { motion } from "framer-motion";
import { ShieldAlert, BatteryLow, Crown } from "lucide-react";
import type { ReactNode } from "react";

interface PainCard {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const cards: PainCard[] = [
  {
    icon: <ShieldAlert className="h-8 w-8" />,
    title: "Минус токсичность",
    description:
      "Больше никаких флеймеров и руинеров. Мы забираем боль — ты забираешь ранг.",
    gradient: "linear-gradient(135deg, #FF6B6B22, #FF8C0011)",
  },
  {
    icon: <BatteryLow className="h-8 w-8" />,
    title: "Плюс сон",
    description:
      "Пока ты спишь — мы играем. Просыпайся с новым рангом и свежей головой.",
    gradient: "linear-gradient(135deg, #4ECDC422, #44AA9922)",
  },
  {
    icon: <Crown className="h-8 w-8" />,
    title: "Вкус победы",
    description:
      "Чистый винрейт, красивый профиль. Заслуженная гордость без лишних страданий.",
    gradient: "linear-gradient(135deg, #FFD93D22, #FF8C0011)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function PainPoints() {
  return (
    <section className="relative py-28 px-6" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#FF8C00" }}
          >
            Почему мы
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Три измерения свободы
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
              style={{
                background: "rgba(18, 18, 18, 0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 140, 0, 0.15)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.background = "rgba(18, 18, 18, 0.6)";
              }}
            >
              {/* Gradient accent */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: card.gradient }}
              />

              <div className="relative z-10">
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(255, 140, 0, 0.1)",
                    color: "#FF8C00",
                  }}
                >
                  {card.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {card.title}
                </h3>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: "#8E8E93" }}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
