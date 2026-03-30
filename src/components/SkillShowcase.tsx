import { motion } from "framer-motion";
import { Play, Trophy } from "lucide-react";

const videos = [
  {
    title: "zxcursed Highlights",
    description: "курсед раздает стиля на сфе",
    thumbnail: "https://i.ytimg.com/vi/RY75y0FJgxY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC1DyR0SKi2x7i0d3r0Gm13ppfPGQ",
    videoId: "RY75y0FJgxY",
  },
  {
    title: "A BEAUTIFUL EXPLOSION UNDER PAUSE / ZXCURSED",
    description: "взрыв и пауза в одном видео (не для слабонервных)",
    thumbnail: "https://i.ytimg.com/vi/Ste4ZSiysZs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC8VwrS1GpBpGOC_iE_TpV0AfFYlQ",
    videoId: "Ste4ZSiysZs",
  },
  {
    title: "DOTA 2 CALIBRATION / ZXCURSED",
    description: "калибровка на 9к ммр жестко и красиво врзываю на сфе",
    thumbnail: "https://i.ytimg.com/vi/SjrQyA8l_vA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC1DyR0SKi2x7i0d3r0Gm13ppfPGQ",
    videoId: "SjrQyA8l_vA",
  },
];

export default function SkillShowcase() {
  return (
    <section
      id="skill"
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
            Наш скилл
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Смотреть и учиться
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base font-medium"
            style={{ color: "#8E8E93" }}
          >
            Гайды, хайлайты и стримы от Semka и ZXKalendarb
          </p>
        </motion.div>

        {/* Видео сетка */}
        <div className="grid gap-6 md:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={video.videoId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-2xl"
              style={{
                background: "rgba(18, 18, 18, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
              onClick={() => {
                window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank");
              }}
            >
              {/* Превью */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/50">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{ background: "rgba(255, 140, 0, 0.9)" }}
                  >
                    <Play className="ml-1 h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
              </div>

              {/* Информация */}
              <div className="p-5">
                <h3 className="mb-2 text-base font-semibold text-white">
                  {video.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: "#8E8E93" }}>
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div
            className="mx-auto max-w-3xl rounded-2xl p-8"
            style={{
              background: "rgba(255, 140, 0, 0.05)",
              border: "1px solid rgba(255, 140, 0, 0.2)",
            }}
          >
            <Trophy
              className="mx-auto mb-4 h-12 w-12"
              style={{ color: "#FF8C00" }}
            />
            <h3 className="mb-2 text-xl font-bold text-white">
              9000+ MMR в деле
            </h3>
            <p className="mb-6 text-sm font-medium" style={{ color: "#8E8E93" }}>
              Смотрите, как мы играем на высоких рангах
            </p>
            <a
              href="https://www.youtube.com/@zxcursed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FF8C00, #E07B00)",
              }}
            >
              <Play className="h-4 w-4" fill="white" />
              Подписаться на канал
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
