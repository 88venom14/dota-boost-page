import { motion } from "framer-motion";
import { TrendingUp, Target, Zap, GraduationCap, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceCard {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  popular?: boolean;
  features: string[];
}

const services: ServiceCard[] = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "MMR Буст",
    description: "Повышение рейтинга до желаемого уровня",
    price: "от ₽500",
    popular: true,
    features: ["Любой ранг", "Стриминг по запросу", "Максимальный результат"],
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Калибровка",
    description: "10 калибровочных игр с максимальным результатом",
    price: "от ₽2,000",
    features: ["10 побед", "Герои на выбор", "Гарантия ранга"],
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Экспресс",
    description: "Приоритетный буст — результат за 24 часа",
    price: "от ₽1,500",
    features: ["24ч дедлайн", "Топ бустеры", "Приоритет"],
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Коучинг",
    description: "Персональное обучение от игроков 7000+ MMR",
    price: "от ₽800/ч",
    features: ["1-на-1", "Разбор реплеев", "План развития"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 px-6"
      style={{ background: "#0A0A0A" }}
    >
      {/* Divider gradient */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,140,0,0.2), transparent)",
        }}
      />

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
            Услуги
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Выбери свой путь
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300"
              style={{
                background: service.popular
                  ? "rgba(255, 140, 0, 0.05)"
                  : "rgba(18, 18, 18, 0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: service.popular
                  ? "1px solid rgba(255, 140, 0, 0.2)"
                  : "1px solid rgba(255, 255, 255, 0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 140, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = service.popular
                  ? "rgba(255, 140, 0, 0.2)"
                  : "rgba(255, 255, 255, 0.06)";
              }}
            >
              {service.popular && (
                <div
                  className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "rgba(255, 140, 0, 0.15)",
                    color: "#FF8C00",
                  }}
                >
                  Популярное
                </div>
              )}

              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(255, 140, 0, 0.1)",
                  color: "#FF8C00",
                }}
              >
                {service.icon}
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">
                {service.title}
              </h3>
              <p
                className="mb-4 text-sm font-medium leading-relaxed"
                style={{ color: "#8E8E93" }}
              >
                {service.description}
              </p>

              <div className="mb-4 flex-1">
                {service.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 py-1.5 text-sm"
                    style={{ color: "#AEAEB2" }}
                  >
                    <div
                      className="h-1 w-1 rounded-full"
                      style={{ background: "#FF8C00" }}
                    />
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <div
                  className="mb-4 text-2xl font-bold"
                  style={{ color: "#FF8C00" }}
                >
                  {service.price}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200"
                  style={{
                    background: service.popular
                      ? "linear-gradient(135deg, #FF8C00, #E07B00)"
                      : "rgba(255, 255, 255, 0.06)",
                  }}
                  onMouseEnter={(e) => {
                    if (!service.popular) {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!service.popular) {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.06)";
                    }
                  }}
                >
                  Начать
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
