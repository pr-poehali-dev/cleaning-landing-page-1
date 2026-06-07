import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const BEFORE_IMG = "https://cdn.poehali.dev/projects/048291d0-43d8-4ae3-af1c-12aa29648a51/files/5230fd2c-9ea2-41cd-889a-6282ea3ede33.jpg";
const AFTER_IMG = "https://cdn.poehali.dev/projects/048291d0-43d8-4ae3-af1c-12aa29648a51/files/d76a892d-e55f-42d7-8bf6-61194293cb6e.jpg";
const CARPET_IMG = "https://cdn.poehali.dev/projects/048291d0-43d8-4ae3-af1c-12aa29648a51/files/7931d6df-de4c-44af-a233-bbaeee3d880d.jpg";

const services = [
  { icon: "🛋️", name: "Диван", price: "от 1 200 ₽", time: "2–3 часа", desc: "Глубокая чистка ткани, антибактериальная обработка" },
  { icon: "🪑", name: "Кресло", price: "от 600 ₽", time: "1 час", desc: "Пятновыводка, дезодорация, освежение цвета" },
  { icon: "🛏️", name: "Матрас", price: "от 900 ₽", time: "1.5 часа", desc: "Удаление клещей, пятен, запахов. Безопасно для детей" },
  { icon: "🪞", name: "Ковёр", price: "от 80 ₽/м²", time: "от 1 часа", desc: "Машинная и ручная чистка, восстановление ворса" },
  { icon: "🪑", name: "Стул", price: "от 250 ₽", time: "30 мин", desc: "Обивка, ножки, полная санитарная обработка" },
  { icon: "🚗", name: "Автокресло", price: "от 700 ₽", time: "1.5 часа", desc: "Чистка детских и взрослых автокресел, дезинфекция" },
];

const benefits = [
  { icon: "⚡", title: "Выезд за 2 часа", desc: "Работаем по всему Краснодару без выходных — 8:00 до 22:00" },
  { icon: "🧪", title: "Безопасные средства", desc: "Kiehl, Chemspec — сертифицированные составы, безопасны для детей и животных" },
  { icon: "📸", title: "Фото до и после", desc: "Документируем каждую работу, чтобы вы видели результат" },
  { icon: "🛡️", title: "Гарантия на работу", desc: "Не уйдёт пятно — вернёмся и дочистим бесплатно" },
  { icon: "💳", title: "Оплата после", desc: "Платите только после того, как оцените результат работы" },
];

const steps = [
  { num: "01", icon: "📱", text: "Заявка онлайн или по телефону" },
  { num: "02", icon: "💬", text: "Оценка стоимости за 5 минут" },
  { num: "03", icon: "🚐", text: "Выезд мастера в удобное время" },
  { num: "04", icon: "✨", text: "Профессиональная чистка" },
  { num: "05", icon: "🔍", text: "Контроль качества с фото" },
  { num: "06", icon: "💳", text: "Оплата наличными или картой" },
];

const reviews = [
  { name: "Алина К.", date: "15 мая 2025", stars: 5, text: "Диван стал как новый! Мастер приехал вовремя, всё объяснил, работал аккуратно. Пятна от кофе ушли полностью. Рекомендую!", avatar: "👩‍🦰" },
  { name: "Дмитрий Р.", date: "3 апреля 2025", stars: 5, text: "Заказывал чистку матраса и двух кресел. Цены адекватные, результат отличный. Запаха нет, всё высохло за 4 часа.", avatar: "👨‍💼" },
  { name: "Светлана М.", date: "20 марта 2025", stars: 5, text: "Ковёр площадью 12м² привели в порядок за 2 часа. Цвет стал ярче, ворс поднялся. Спасибо за профессионализм!", avatar: "👩‍🦳" },
  { name: "Игорь Ф.", date: "10 февраля 2025", stars: 4, text: "Хороший сервис, мастера вежливые. Диван-уголок почистили качественно. Единственное — приехали на 30 минут позже, но предупредили.", avatar: "👨‍🦱" },
  { name: "Мария Д.", date: "2 января 2025", stars: 5, text: "Третий раз обращаемся — всегда результат на высоте. Чистят два детских матраса раз в полгода. Безопасные средства!", avatar: "👩" },
];

const faqs = [
  { q: "Сколько времени занимает чистка?", a: "В зависимости от типа мебели: диван — 2–3 часа, кресло — 1 час, матрас — 1.5 часа, ковёр — от 1 часа. После чистки мебель полностью высыхает за 3–6 часов." },
  { q: "Когда можно пользоваться мебелью?", a: "Через 3–6 часов после чистки мебель полностью высыхает. Мы используем профессиональные экстракторы, которые удаляют 95% влаги уже в процессе работы." },
  { q: "Останется ли запах химии?", a: "Нет. Мы используем средства с нейтральным или лёгким свежим ароматом. После высыхания запах полностью исчезает." },
  { q: "Как подготовить мебель к чистке?", a: "Убрать декоративные подушки и покрывала. Освободить доступ к мебели. Больше ничего не нужно — всё остальное мы сделаем сами." },
  { q: "Что делать, если пятно не уйдёт?", a: "Мы даём гарантию на результат. Если после чистки пятно осталось — вернёмся и устраним его бесплатно. Такое бывает крайне редко, но мы всегда выполняем своё обещание." },
];

const furnitureTypes = ["Диван", "Кресло", "Матрас", "Ковёр", "Стул", "Автокресло"];
const soilingLevels = ["Лёгкое", "Среднее", "Сильное"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [calcType, setCalcType] = useState("Диван");
  const [calcSoiling, setCalcSoiling] = useState("Среднее");
  const [calcArea, setCalcArea] = useState(10);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [sent, setSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const calcPrice = () => {
    const base: Record<string, number> = {
      Диван: 1200, Кресло: 600, Матрас: 900, Ковёр: 80 * calcArea, Стул: 250, Автокресло: 700,
    };
    const mult: Record<string, number> = { Лёгкое: 1, Среднее: 1.2, Сильное: 1.5 };
    return Math.round(base[calcType] * mult[calcSoiling]);
  };

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleSliderMove(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { if (isDragging) handleSliderMove(e.touches[0].clientX); };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  const handleContactSubmit = (e: React.FormEvent) => { e.preventDefault(); setContactSent(true); };

  const navLinks = [
    { label: "Услуги", href: "#services" },
    { label: "Цены", href: "#calculator" },
    { label: "Галерея", href: "#gallery" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-bold text-white">
            Чисто<span className="neon-text">Мастер</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-neon transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>
          <a href="tel:+78612345678" className="hidden md:flex items-center gap-2 bg-neon text-background px-4 py-2 rounded-lg font-display font-semibold text-sm hover:brightness-110 transition-all">
            <Icon name="Phone" size={14} />
            +7 (861) 234-56-78
          </a>
          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden glass border-t border-white/5 px-4 py-4 flex flex-col gap-3">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-sm text-foreground font-medium py-2" onClick={() => setMobileMenu(false)}>
                {l.label}
              </a>
            ))}
            <a href="tel:+78612345678" className="flex items-center gap-2 bg-neon text-background px-4 py-2 rounded-lg font-display font-semibold text-sm justify-center">
              <Icon name="Phone" size={14} />
              +7 (861) 234-56-78
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(45,226,200,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,170,26,0.06)_0%,transparent_60%)]" />
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full border border-neon/10 animate-float opacity-30" />
        <div className="absolute bottom-1/4 left-10 w-48 h-48 rounded-full border border-gold/10 opacity-20" style={{ animation: 'float 4s ease-in-out 2s infinite' }} />

        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-neon font-medium mb-6 border border-neon/20">
              <span className="w-2 h-2 bg-neon rounded-full" style={{ animation: 'pulseSlow 3s ease-in-out infinite' }} />
              Краснодар · Выезд от 2 часов
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              ХИМЧИСТКА<br />
              <span className="neon-text">МЕБЕЛИ</span><br />
              В КРАСНОДАРЕ
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Бережная чистка без разводов. Безопасные сертифицированные средства. Фото до и после каждой работы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#calculator" className="inline-flex items-center justify-center gap-2 bg-neon text-background px-8 py-4 rounded-xl font-display font-semibold text-lg hover:brightness-110 transition-all" style={{ boxShadow: '0 0 0 0 rgba(45,226,200,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(45,226,200,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                <Icon name="Calculator" size={20} />
                Рассчитать стоимость
              </a>
              <a href="tel:+78612345678" className="inline-flex items-center justify-center gap-2 glass border border-white/10 px-8 py-4 rounded-xl font-display font-semibold text-lg hover:border-neon/40 transition-all">
                <Icon name="Phone" size={20} />
                Позвонить
              </a>
            </div>

            <div className="mt-10 flex gap-8">
              <div>
                <div className="font-display text-3xl font-bold neon-text">500+</div>
                <div className="text-xs text-muted-foreground mt-1">выполненных заказов</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold gold-text">4.9★</div>
                <div className="text-xs text-muted-foreground mt-1">рейтинг на 2ГИС</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white">2ч</div>
                <div className="text-xs text-muted-foreground mt-1">минимальный выезд</div>
              </div>
            </div>
          </div>

          {/* Hero form */}
          <div className="glass border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="font-display text-xl font-bold mb-1">Заказать выезд</div>
            <p className="text-muted-foreground text-sm mb-6">Рассчитаем стоимость за 5 минут</p>
            {!sent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                />
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Телефон"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                />
                <input
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Адрес (необязательно)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                />
                <div className="flex gap-2 flex-wrap">
                  {furnitureTypes.slice(0, 4).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCalcType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${calcType === t ? "bg-neon text-background" : "glass border border-white/10 text-muted-foreground hover:border-neon/30"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input type="checkbox" required className="accent-neon" />
                  Согласен с обработкой персональных данных
                </label>
                <button type="submit" className="w-full bg-neon text-background py-4 rounded-xl font-display font-semibold text-base hover:brightness-110 transition-all">
                  Получить расчёт стоимости
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <div className="font-display text-xl font-bold neon-text mb-2">Заявка принята!</div>
                <p className="text-muted-foreground text-sm">Перезвоним в течение 5 минут</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-center mb-14">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-neon font-medium border border-neon/20 mb-4">Услуги</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">ЧТО МЫ <span className="neon-text">ЧИСТИМ</span></h2>
            </div>
          </Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <Section key={s.name}>
                <div className="glass border border-white/8 rounded-2xl p-6 hover-lift group cursor-default h-full" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <div className="font-display text-xl font-bold mb-1">{s.name}</div>
                  <div className="text-muted-foreground text-sm mb-4 leading-relaxed">{s.desc}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="neon-text font-display text-xl font-bold">{s.price}</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground glass px-2.5 py-1.5 rounded-lg border border-white/8">
                      <Icon name="Clock" size={12} />
                      {s.time}
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(45,226,200,0.04)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-12">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-gold font-medium border border-gold/20 mb-4">Калькулятор</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">РАССЧИТАЙ <span className="gold-text">ЦЕНУ</span></h2>
            </div>
            <div className="glass border border-white/10 rounded-2xl p-6 md:p-10">
              <div className="mb-8">
                <div className="text-sm text-muted-foreground font-medium mb-3 flex items-center gap-2">
                  <span>🪑</span> Тип мебели
                </div>
                <div className="flex flex-wrap gap-2">
                  {furnitureTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setCalcType(t)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${calcType === t ? "bg-neon text-background" : "glass border border-white/10 text-muted-foreground hover:border-neon/30 hover:text-foreground"}`}
                      style={calcType === t ? { boxShadow: '0 0 20px rgba(45,226,200,0.4)' } : {}}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-sm text-muted-foreground font-medium mb-3 flex items-center gap-2">
                  <span>🧹</span> Степень загрязнения
                </div>
                <div className="flex gap-3">
                  {soilingLevels.map(l => (
                    <button
                      key={l}
                      onClick={() => setCalcSoiling(l)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${calcSoiling === l ? "bg-gold text-background" : "glass border border-white/10 text-muted-foreground hover:border-gold/30"}`}
                      style={calcSoiling === l ? { boxShadow: '0 0 20px rgba(255,170,26,0.4)' } : {}}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {calcType === "Ковёр" && (
                <div className="mb-8">
                  <div className="text-sm text-muted-foreground font-medium mb-3 flex items-center gap-2">
                    <span>📐</span> Площадь ковра: <span className="text-foreground font-bold ml-1">{calcArea} м²</span>
                  </div>
                  <input
                    type="range" min={1} max={50} value={calcArea}
                    onChange={e => setCalcArea(Number(e.target.value))}
                    className="w-full accent-neon"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 м²</span><span>50 м²</span>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-neon/10 to-transparent border border-neon/20 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Итоговая стоимость</div>
                  <div className="font-display text-4xl font-bold neon-text">от {calcPrice().toLocaleString()} ₽</div>
                  <div className="text-xs text-muted-foreground mt-1">Точная цена после осмотра мастером</div>
                </div>
                <a href="#contacts" className="bg-neon text-background px-6 py-3.5 rounded-xl font-display font-semibold text-sm hover:brightness-110 transition-all hidden sm:block">
                  Заказать
                </a>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-center mb-14">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-neon font-medium border border-neon/20 mb-4">Преимущества</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">ПОЧЕМУ <span className="neon-text">МЫ</span></h2>
            </div>
          </Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <Section key={b.title}>
                <div className="glass border border-white/8 rounded-2xl p-6 hover-lift" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <div className="font-display text-lg font-bold mb-2">{b.title}</div>
                  <div className="text-muted-foreground text-sm leading-relaxed">{b.desc}</div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,170,26,0.04)_0%,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-14">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-gold font-medium border border-gold/20 mb-4">Процесс</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">КАК МЫ <span className="gold-text">РАБОТАЕМ</span></h2>
            </div>
          </Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <Section key={s.num}>
                <div className="relative glass border border-white/8 rounded-2xl p-6 hover-lift" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="absolute top-4 right-4 font-display text-5xl font-bold text-white/5 leading-none select-none">{s.num}</div>
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <div className="font-display text-base font-semibold pr-8">{s.text}</div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-12">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-neon font-medium border border-neon/20 mb-4">Наши работы</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">ДО И <span className="neon-text">ПОСЛЕ</span></h2>
              <p className="text-muted-foreground mt-3 text-sm">Перетащи ползунок, чтобы сравнить</p>
            </div>
          </Section>

          <div className="grid md:grid-cols-2 gap-6">
            <Section>
              <div
                ref={sliderRef}
                className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none aspect-[4/3] border border-white/10"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
              >
                <img src={BEFORE_IMG} alt="До чистки" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                  <img
                    src={AFTER_IMG}
                    alt="После чистки"
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
                  />
                </div>
                <div className="absolute inset-y-0 flex items-center" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
                  <div className="w-0.5 h-full" style={{ background: '#2de2c8', boxShadow: '0 0 12px rgba(45,226,200,0.8)' }} />
                  <div className="absolute w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#2de2c8', boxShadow: '0 0 20px rgba(45,226,200,0.6)' }}>
                    <Icon name="ChevronsLeftRight" size={18} className="text-background" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 glass px-2.5 py-1 rounded-lg text-xs font-medium">До</div>
                <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-lg text-xs font-medium neon-text border border-neon/20">После</div>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">Диван после глубокой химчистки, 2.5 часа работы</p>
            </Section>

            <Section>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                <img src={CARPET_IMG} alt="Чистка ковра" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">Ковёр 12 м² — до и после чистки с восстановлением ворса</p>
            </Section>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(45,226,200,0.04)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-4">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-neon font-medium border border-neon/20 mb-4">Отзывы</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">ГОВОРЯТ <span className="neon-text">КЛИЕНТЫ</span></h2>
              <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                <span className="gold-text font-bold">4.9★</span>
                <span>· Более 120 отзывов на 2ГИС и Яндекс Картах</span>
              </div>
            </div>
          </Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {reviews.map((r, i) => (
              <Section key={r.name}>
                <div className="glass border border-white/8 rounded-2xl p-5 hover-lift h-full flex flex-col" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">{r.avatar}</div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                    <div className="ml-auto text-xs gold-text shrink-0">{"★".repeat(r.stars)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="text-center mb-12">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-gold font-medium border border-gold/20 mb-4">FAQ</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">ЧАСТЫЕ <span className="gold-text">ВОПРОСЫ</span></h2>
            </div>
          </Section>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Section key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full glass border border-white/8 rounded-2xl p-5 text-left hover:border-neon/20 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display font-semibold text-sm md:text-base">{f.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="shrink-0 text-muted-foreground" />
                  </div>
                  {openFaq === i && (
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed border-t border-white/8 pt-3">{f.a}</p>
                  )}
                </button>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(45,226,200,0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Section>
            <div className="text-center mb-12">
              <div className="inline-block glass px-4 py-1.5 rounded-full text-xs text-neon font-medium border border-neon/20 mb-4">Контакты</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">СВЯЖИТЕСЬ <span className="neon-text">С НАМИ</span></h2>
            </div>
          </Section>
          <div className="grid md:grid-cols-2 gap-6">
            <Section>
              <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
                <a href="tel:+78612345678" className="flex items-center gap-4 hover:text-neon transition-colors group">
                  <div className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center group-hover:border-neon/40 transition-colors shrink-0">
                    <Icon name="Phone" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Телефон</div>
                    <div className="font-display font-bold">+7 (861) 234-56-78</div>
                  </div>
                </a>
                <a href="https://wa.me/78612345678" className="flex items-center gap-4 hover:text-neon transition-colors group">
                  <div className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-xl group-hover:border-neon/40 transition-colors shrink-0">
                    💬
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">WhatsApp / Telegram</div>
                    <div className="font-display font-bold">+7 (861) 234-56-78</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                    🕐
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Режим работы</div>
                    <div className="font-display font-bold">Ежедневно 8:00 – 22:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass border border-white/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Зона работы</div>
                    <div className="font-display font-bold">Весь Краснодар и пригород</div>
                  </div>
                </div>
              </div>
            </Section>

            <Section>
              <div className="glass border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="font-display text-lg font-bold mb-4">Оставить заявку</div>
                {!contactSent ? (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <input
                      required
                      placeholder="Ваше имя"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Телефон"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                    />
                    <textarea
                      placeholder="Что нужно почистить? (необязательно)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors resize-none h-24"
                    />
                    <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                      <input type="checkbox" required className="accent-neon" />
                      Согласен с обработкой персональных данных
                    </label>
                    <button type="submit" className="w-full bg-neon text-background py-3.5 rounded-xl font-display font-semibold hover:brightness-110 transition-all">
                      Отправить заявку
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">✅</div>
                    <div className="font-display text-xl font-bold neon-text mb-2">Заявка принята!</div>
                    <p className="text-muted-foreground text-sm">Перезвоним в течение 5 минут</p>
                  </div>
                )}
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold">
            Чисто<span className="neon-text">Мастер</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Публичная оферта</a>
            <a href="#contacts" className="hover:text-foreground transition-colors">Контакты</a>
          </div>
          <div className="text-xs text-muted-foreground">
            ИП Иванов И.И. · ИНН 231234567890
          </div>
        </div>
      </footer>
    </div>
  );
}
