import { motion } from "framer-motion";
import { Globe, ShieldCheck, Eye, Zap, Download } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Замена рекламы",
    desc: "Все баннеры заменяются на брендинг Semka x ZXKalendarb",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Anti-Flicker",
    desc: "Мгновенная замена без мерцания",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "MutationObserver",
    desc: "Работает с динамическим контентом и бесконечной прокруткой",
  },
];

export default function ExtensionCTA() {
  return (
    <section
      id="extension"
      className="relative py-28 px-6"
      style={{ background: "#0A0A0A" }}
    >
      {/* Divider */}
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
            Расширение
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Реклама? Какая реклама?
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(255, 140, 0, 0.1)",
                      color: "#FF8C00",
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="mb-1 text-base font-semibold text-white">
                      {f.title}
                    </h4>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#8E8E93" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #FF8C00, #E07B00)",
                boxShadow: "0 0 30px rgba(255, 140, 0, 0.25)",
              }}
            >
              <Download className="h-5 w-5" />
              Установить расширение
            </motion.button>
          </motion.div>

          {/* Right — browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: "rgba(18, 18, 18, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  background: "rgba(26, 26, 26, 0.8)",
                }}
              >
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }} />
                  <div className="h-3 w-3 rounded-full" style={{ background: "#FFBD2E" }} />
                  <div className="h-3 w-3 rounded-full" style={{ background: "#27CA40" }} />
                </div>
                <div
                  className="ml-4 flex-1 rounded-md px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#636366",
                  }}
                >
                  youtube.com
                </div>
                <Globe className="h-4 w-4" style={{ color: "#636366" }} />
              </div>

              {/* Browser content */}
              <div className="p-6">
                {/* Simulated page content */}
                <div className="space-y-4">
                  {/* Content line placeholders */}
                  <div className="flex gap-3">
                    <div
                      className="h-20 w-32 flex-shrink-0 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-3 w-3/4 rounded"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      />
                      <div
                        className="h-3 w-1/2 rounded"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                  </div>

                  {/* Replaced ad — Semka banner */}
                  <div
                    className="animate-pulse-glow relative overflow-hidden rounded-xl p-5"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,140,0,0.1), rgba(255,140,0,0.03))",
                      border: "1px solid rgba(255, 140, 0, 0.15)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ background: "linear-gradient(135deg, #FF8C00, #E07B00)" }}
                      >
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Semka x ZXKalendarb
                        </div>
                        <div
                          className="text-xs font-medium"
                          style={{ color: "#FF8C00" }}
                        >
                          Реклама заменена ✓
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* More content */}
                  <div className="flex gap-3">
                    <div
                      className="h-20 w-32 flex-shrink-0 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-3 w-2/3 rounded"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      />
                      <div
                        className="h-3 w-1/3 rounded"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                  </div>

                  {/* Another replaced ad */}
                  <div
                    className="relative overflow-hidden rounded-xl p-5"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,140,0,0.08), rgba(255,140,0,0.02))",
                      border: "1px solid rgba(255, 140, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ background: "linear-gradient(135deg, #FF8C00, #E07B00)" }}
                      >
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Semka x ZXKalendarb
                        </div>
                        <div
                          className="text-xs font-medium"
                          style={{ color: "#FF8C00" }}
                        >
                          Реклама заменена ✓
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating counter badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FF8C00, #E07B00)",
                boxShadow: "0 0 30px rgba(255, 140, 0, 0.3)",
              }}
            >
              <div className="text-center">
                <div className="text-lg font-extrabold text-white leading-none">47</div>
                <div className="text-[8px] font-semibold text-white/70 uppercase">healed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
