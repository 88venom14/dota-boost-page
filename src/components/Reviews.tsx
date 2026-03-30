import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { useState } from "react";

interface Review {
  name: string;
  rank: string;
  text: string;
  stars: number;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: "Артём",
    rank: "Legend → Divine",
    text: "За 3 дня подняли с легенды до дивайна. Семка и Календарь — красавцы, знают своё дело!",
    stars: 5,
    avatar: "А",
  },
  {
    name: "Кирилл",
    rank: "Archon → Ancient",
    text: "Наконец-то могу спокойно спать. Семка бустит, Календарь поддерживает — лучший дуэт.",
    stars: 5,
    avatar: "К",
  },
  {
    name: "Дмитрий",
    rank: "Crusader → Legend",
    text: "Калибровка 10/10 побед. Семка и Календарь играют как боги, даже стрим смотрел.",
    stars: 5,
    avatar: "Д",
  },
  {
    name: "Алиса",
    rank: "Herald → Guardian",
    text: "Подруга посоветовала Семку и Календаря. Результат через сутки. Теперь сама учусь по реплеям.",
    stars: 5,
    avatar: "А",
  },
  {
    name: "Максим",
    rank: "Divine → Immortal",
    text: "Коучинг от Семки и Календаря изменил мою игру полностью. Стоит каждого рубля.",
    stars: 5,
    avatar: "М",
  },
  {
    name: "Виктор",
    rank: "Ancient → Divine",
    text: "Экспресс буст от Семки и Календаря — заказал вечером, утром уже дивайн. Магия.",
    stars: 5,
    avatar: "В",
  },
  {
    name: "Егор",
    rank: "Guardian → Crusader",
    text: "Семка и Календарь — топ бустеры. Вежливые, играют чисто, без банов. Рекомендую!",
    stars: 5,
    avatar: "Е",
  },
  {
    name: "Сергей",
    rank: "Legend → Ancient",
    text: "Думал скам, но Семка с Календарём доказали обратное. ММР растёт, я доволен.",
    stars: 5,
    avatar: "С",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="mx-3 w-[320px] flex-shrink-0 rounded-2xl p-6"
      style={{
        background: "rgba(18, 18, 18, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #FF8C00, #E07B00)" }}
        >
          {review.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{review.name}</div>
          <div className="text-xs font-medium" style={{ color: "#FF8C00" }}>
            {review.rank}
          </div>
        </div>
      </div>
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: review.stars }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5"
            fill="#FF8C00"
            style={{ color: "#FF8C00" }}
          />
        ))}
      </div>
      <p className="text-sm font-medium leading-relaxed" style={{ color: "#AEAEB2" }}>
        "{review.text}"
      </p>
    </div>
  );
}

export default function Reviews() {
  const doubledReviews = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden py-28"
      style={{ background: "#0A0A0A" }}
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,140,0,0.2), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
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
            Отзывы
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Они уже исцелились
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32"
          style={{
            background: "linear-gradient(90deg, #0A0A0A, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32"
          style={{
            background: "linear-gradient(270deg, #0A0A0A, transparent)",
          }}
        />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubledReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ReviewForm />
        </motion.div>
      </div>
    </section>
  );
}

function ReviewForm() {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, rank, text, stars });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setText("");
      setRank("");
    }, 3000);
  };

  return (
    <div
      className="mx-auto max-w-2xl rounded-2xl p-8"
      style={{
        background: "rgba(18, 18, 18, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <h3 className="mb-6 text-center text-xl font-bold text-white">
        Оставить отзыв
      </h3>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-8 text-center"
        >
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(39, 202, 64, 0.2)" }}
          >
            <Send className="h-8 w-8" style={{ color: "#27CA40" }} />
          </div>
          <p className="text-lg font-semibold text-white">Спасибо за отзыв!</p>
          <p className="mt-2 text-sm" style={{ color: "#8E8E93" }}>
            Ваш отзыв опубликован от имени <span className="font-semibold text-[#FF8C00]">{name}</span>
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: "#AEAEB2" }}>
              Ваше имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться?"
              required
              className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-[#636366] outline-none transition-all focus:bg-white/10"
              style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: "#AEAEB2" }}>
              Ваш ранг (было → стало)
            </label>
            <input
              type="text"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Legend → Divine"
              required
              className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-[#636366] outline-none transition-all focus:bg-white/10"
              style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: "#AEAEB2" }}>
              Ваш отзыв
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Расскажите о вашем опыте..."
              required
              rows={4}
              className="w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-[#636366] outline-none transition-all focus:bg-white/10"
              style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: "#AEAEB2" }}>
              Оценка
            </label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStars(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className="h-6 w-6"
                    fill={i < stars ? "#FF8C00" : "none"}
                    style={{ color: i < stars ? "#FF8C00" : "#636366" }}
                  />
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #FF8C00, #E07B00)",
            }}
          >
            <Send className="h-4 w-4" />
            Опубликовать отзыв
          </motion.button>
        </form>
      )}
    </div>
  );
}
