import { Heart } from "lucide-react";

const links = {
  services: [
    { label: "MMR Буст", href: "#services" },
    { label: "Калибровка", href: "#services" },
    { label: "Экспресс", href: "#services" },
    { label: "Коучинг", href: "#services" },
  ],
  company: [
    { label: "О нас", href: "#" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакт", href: "#" },
  ],
  legal: [
    { label: "Политика", href: "#" },
    { label: "Условия", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A" }}>
      {/* Divider */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,140,0,0.2), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="mb-4 flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Semka x ZXKalendarb"
                className="h-8 w-8 rounded-lg"
              />
              <span className="text-lg font-bold text-white">Semka x ZXKalendarb</span>
            </a>
            <p
              className="text-sm font-medium leading-relaxed"
              style={{ color: "#636366" }}
            >
              Профессиональный буст Dota 2.
              <br />
              Ранг растёт — ты отдыхаешь.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h4
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#8E8E93" }}
            >
              Услуги
            </h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: "#636366" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F5F5F7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#636366")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#8E8E93" }}
            >
              Компания
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: "#636366" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F5F5F7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#636366")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#8E8E93" }}
            >
              Правовое
            </h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: "#636366" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F5F5F7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#636366")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-16 flex flex-col items-center gap-4 pt-8 text-center md:flex-row md:justify-between md:text-left"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <p className="text-sm font-medium" style={{ color: "#636366" }}>
            Dota 2 Boost by Semka x ZXKalendarb © 2026
          </p>
          <p
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "#636366" }}
          >
            Ранг — это просто цифра, твои нервы — это всё
            <Heart className="h-3.5 w-3.5" style={{ color: "#FF8C00" }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
