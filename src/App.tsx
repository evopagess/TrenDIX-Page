import { motion, useScroll, useTransform } from "motion/react";
import { Check, ChevronRight, Clock, Zap, BarChart3, ShieldCheck, Star, ArrowRight, Menu, Sparkles, Filter, Activity, Target, Fingerprint, Hexagon, Component } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";

// Luxuriant, performance-optimized Apple-style components
const Section = ({ children, className = "", id = "" }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto relative ${className}`}>
    {children}
  </section>
);

const BentoCard = ({ children, className = "", delay = 0, yOffset = 60 }: { children: ReactNode; className?: string; delay?: number; yOffset?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ willChange: "transform, opacity" }} // Performance optimization
    className={`bg-white/80 md:bg-[#f5f5f7]/60 backdrop-blur-none md:backdrop-blur-md transform-gpu rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-700 border border-black/5 md:border-white/50 ${className}`}
  >
    {children}
  </motion.div>
);

const FadeInText = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ willChange: "transform, opacity" }}
    className={className}
  >
    {children}
  </motion.div>
);

const GradientText = ({ children }: { children: ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-semibold">
    {children}
  </span>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll logic for native anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Set up global scroll values for parallax
  const { scrollY, scrollYProgress } = useScroll();

  // Hero Parallax Transforms (mapped to absolute pixel scroll for precision at the top)
  const heroY = useTransform(scrollY, [0, 1000], [0, 150]); // Reduced movement
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.95]);

  // Abstract Background Parallax (mapped to 0-1 percentage for entire page)
  const bgImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Trocado useSpring por scrollYProgress direto
  const floatY1 = useTransform(scrollY, [0, 3000], [0, -200]);
  const floatY2 = useTransform(scrollY, [0, 3000], [0, -300]);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-pink-100 selection:text-pink-900 overflow-hidden relative">

      {/* Global Background Parallax Elements for Luxury Depth - Hidden on Mobile */}
      <motion.div
        style={{ y: floatY1, willChange: "transform" }}
        className="pointer-events-none absolute top-40 left-10 w-96 h-96 bg-pink-100/40 rounded-full blur-[100px] opacity-40 mix-blend-multiply transform-gpu hidden md:block"
      />
      <motion.div
        style={{ y: floatY2, willChange: "transform" }}
        className="pointer-events-none absolute top-96 right-10 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px] opacity-40 mix-blend-multiply transform-gpu hidden md:block"
      />

      {/* Navbar - Apple Style Light */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg transform-gpu border-b border-black/5 h-16 flex items-center justify-center text-xs font-medium text-[#1d1d1f] tracking-wide transition-all duration-300">
        <div className="max-w-[1200px] w-full flex justify-between items-center px-6 md:px-12">
          <img src="https://i.postimg.cc/k4tvPP3w/Logo-Preta2.png" alt="TRENDIX Logo" width="120" height="36" className="h-8 md:h-9 w-auto" />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 text-[#424245]">
            <a href="#problem" className="hover:text-pink-600 transition-colors">Problema</a>
            <a href="#solution" className="hover:text-pink-600 transition-colors">Solução</a>
            <a href="#features" className="hover:text-pink-600 transition-colors">Recursos</a>
            <a href="#pricing" className="hover:text-pink-600 transition-colors">Comprar</a>
          </div>

          {/* Mobile Menu Button */}
          <button aria-label="Menu" className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-[#1d1d1f]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-8 md:hidden shadow-2xl border-b border-gray-100"
        >
          <div className="flex flex-col gap-8 text-3xl font-light text-[#1d1d1f] tracking-tight">
            <a href="#problem" onClick={() => setIsMenuOpen(false)}>Problema</a>
            <a href="#solution" onClick={() => setIsMenuOpen(false)}>Solução</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)}>Recursos</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Comprar</a>
          </div>
        </motion.div>
      )}

      {/* SECTION 1: HEADER / HEADLINE - Parallax Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-12 overflow-hidden z-10">

        {/* Parallax Container applied to the main Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale, willChange: "transform, opacity" }}
          className="relative z-20 flex flex-col items-center justify-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <img src="https://i.postimg.cc/k4tvPP3w/Logo-Preta2.png" alt="TRENDIX Logo" width="224" height="112" fetchPriority="high" className="h-20 md:h-28 mx-auto mb-6 object-contain" />
            <p className="text-xl md:text-3xl font-medium tracking-tight text-[#515154]">
              Inteligência <GradientText>Viral</GradientText>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-semibold leading-[1.05] tracking-tighter text-[#1d1d1f]">
              <GradientText>Pare de analisar</GradientText><br /> concorrente no olho.
            </h2>
            <p className="text-xl md:text-2xl font-light tracking-tight text-[#515154] max-w-2xl mx-auto">
              Existe uma maneira mais inteligente de criar conteúdo que performa — e ela não envolve horas de análise manual.
            </p>

            <div className="pt-8">
              <a href="#pricing" aria-label="Ir para a seção de preços para assinar o TRENDIX" className="inline-flex items-center gap-3 bg-[#1d1d1f] hover:bg-black text-white px-10 py-5 rounded-full text-lg md:text-xl font-medium transition-all shadow-2xl hover:shadow-3xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-pink-500/50">
                Assista ao vídeo <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-32 w-full max-w-6xl relative z-10"
        >
          <div className="aspect-[21/9] bg-gradient-to-tr from-[#fbfbfb] to-[#ffffff] rounded-[40px] md:rounded-[60px] border border-gray-200 shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <div className="text-center z-20 flex flex-col items-center justify-center w-full h-full relative">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] mb-4 transition-transform duration-700 hover:scale-110 cursor-pointer">
                <div className="w-0 h-0 border-t-[12px] md:border-t-[20px] border-t-transparent border-l-[20px] md:border-l-[32px] border-l-[#1d1d1f] border-b-[12px] md:border-b-[20px] border-b-transparent ml-2 md:ml-3"></div>
              </div>
              <p className="font-semibold text-[#1d1d1f]/80 tracking-wider uppercase text-xs md:text-sm mt-4">Assista ao vídeo antes de continuar</p>
            </div>
            {/* Parallax Background inside the frame (Luxurious Geometric CSS instead of AI image) */}
            <motion.div
              style={{ y: bgImageY }}
              className="absolute top-[-40%] inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-multiply pointer-events-none"
            >
              <div className="absolute w-[600px] h-[600px] border border-gray-200 rounded-full"></div>
              <div className="absolute w-[900px] h-[900px] border border-gray-100 rounded-full"></div>
              <div className="absolute w-[1200px] h-[1200px] border border-gray-50 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: O PROBLEMA - Light Mode Spotlight / Widescreen */}
      <section id="problem" className="bg-[#f5f5f7] py-32 md:py-48 rounded-[40px] md:rounded-[80px] mx-2 md:mx-6 shadow-sm overflow-hidden relative">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <FadeInText>
            <h3 className="text-[#86868b] font-medium tracking-widest uppercase text-sm md:text-base mb-6">A Dor do Avatar</h3>
            <p className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-16 text-[#1d1d1f]">
              Você já passou por isso: abriu o perfil do concorrente e ficou lá rolando por horas <GradientText>tentando entender o que funciona?</GradientText>
            </p>
          </FadeInText>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-16 md:mt-24">
            <BentoCard className="bg-white p-12 hover:bg-white/90 group cursor-default">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                <Clock strokeWidth={1} className="w-7 h-7 text-red-500" />
              </div>
              <h4 className="text-3xl font-medium tracking-tight mb-4 text-[#1d1d1f]">Análise Amadora</h4>
              <p className="text-[#515154] text-xl font-light leading-relaxed">
                Criou uma planilha que ficou desatualizada em 2 semanas e entregou um relatório baseado em <span className="text-pink-600 font-medium">'achismo'</span> porque não tinha dados concretos.
              </p>
            </BentoCard>

            <BentoCard className="bg-white p-12 hover:bg-white/90 group cursor-default" delay={0.15}>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                <BarChart3 strokeWidth={1} className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="text-3xl font-medium tracking-tight mb-4 text-[#1d1d1f]">Falta de Direção</h4>
              <p className="text-[#515154] text-xl font-light leading-relaxed">
                Passou o domingo pensando em pauta, saiu sem clareza e viu o concorrente explodir enquanto você postava <span className="text-purple-600 font-medium">as mesmas coisas sem resultado</span>.
              </p>
            </BentoCard>
          </div>

          <FadeInText delay={0.3} className="max-w-3xl mx-auto mt-20 text-center">
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-[#1d1d1f]">
              Não é falta de esforço. É falta da ferramenta certa. <br /><span className="font-light text-[#515154] mt-4 block">O problema não é que você não sabe criar conteúdo. O problema é que você está gastando energia no lugar errado: na análise manual, lenta e sem padrão — quando deveria estar focado em criar estratégia.</span>
            </p>
          </FadeInText>
        </div>
      </section>

      {/* SECTION 3: A SOLUÇÃO - Large Feature Showcase */}
      <Section id="solution">
        <div className="text-center mb-24 md:mb-32">
          <FadeInText delay={0.1}>
            <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 text-[#1d1d1f]">
              Apresentando o <GradientText>TRENDIX</GradientText>.
            </h2>
            <p className="text-2xl md:text-4xl font-light tracking-tight text-[#515154] max-w-4xl mx-auto leading-tight">
              A plataforma que transforma análise de concorrente em <span className="text-[#1d1d1f] font-medium">inteligência de conteúdo</span> — em minutos, não em horas.
            </p>
          </FadeInText>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="bg-[#1d1d1f] rounded-[40px] md:rounded-[60px] p-10 md:p-32 text-center overflow-hidden relative shadow-2xl"
        >
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40 opacity-50"></div>

          <FadeInText className="relative z-10" delay={0.2}>
            <h3 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-white">Você cola o link. O TRENDIX analisa tudo.</h3>
            <p className="text-xl md:text-2xl font-light text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed">
              Descubra os <span className="text-pink-400 font-medium">formatos que performam</span>, o que funciona para ser modelado, e o que não funciona como oportunidade.  Receba dezenas de <span className="text-purple-400 font-medium">ideias de conteúdo</span> baseadas em padrões reais e um relatório pronto gerado por IA para impressionar seu cliente.
            </p>
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-[30px] bg-gradient-to-br from-[#1d1d1f] to-[#3a3a3c] border border-white/10 text-white shadow-2xl shadow-indigo-500/10 hover:scale-105 transition-transform duration-500 cursor-default group">
              <Fingerprint strokeWidth={0.5} className="w-14 h-14 fill-transparent text-pink-300 group-hover:text-purple-300 transition-colors" />
            </div>
          </FadeInText>
        </motion.div>
      </Section>

      {/* SECTION 4: A EQUAÇÃO DE VALOR - Bento Grid */}
      <Section id="features" className="bg-white">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-[#1d1d1f]">Por que é diferente.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(380px,auto)]">
          {/* Large Card NO AI IMAGES */}
          <BentoCard className="md:col-span-2 lg:col-span-2 p-12 flex flex-col justify-between bg-gradient-to-br from-[#1d1d1f] to-[#2d2d2f] overflow-hidden relative shadow-2xl" yOffset={40}>
            {/* Elegant Vector background overlay */}
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-b from-pink-500/20 to-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
              <Target strokeWidth={0.5} className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10 mt-auto pt-40">
              <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-3">Calendário Inteligente</h3>
              <p className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] max-w-xl text-white">
                30 dias de pauta prontos gerados por <GradientText>IA</GradientText>.
              </p>
              <p className="text-white/80 mt-4 text-lg">Sem domingo perdido. Você informa o público e nós alinhamos com o que já funciona no mercado.</p>
            </div>
          </BentoCard>

          {/* Tall Card */}
          <BentoCard className="md:row-span-2 p-12 bg-[#f5f5f7] flex flex-col justify-between" delay={0.15}>
            <div>
              <div className="w-16 h-16 bg-white border border-gray-100 rounded-[20px] flex items-center justify-center mb-8 shadow-sm">
                <Activity strokeWidth={1} className="w-8 h-8 text-[#1d1d1f]" />
              </div>
              <h3 className="text-3xl font-medium tracking-tight mb-4 text-[#1d1d1f]">Tempo Mínimo.</h3>
              <p className="text-[#515154] text-xl font-light leading-relaxed">
                O que levava horas de "estudo de campo" longo e manual agora é feito em <span className="font-medium text-[#1d1d1f]">segundos</span>.
              </p>
            </div>
            <div className="mt-16 h-40 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.03)] rounded-2xl w-full border border-white relative overflow-hidden flex items-center justify-center">
              <Component strokeWidth={0.5} className="w-24 h-24 text-gray-200" />
            </div>
          </BentoCard>

          {/* Medium Card */}
          <BentoCard className="p-12 bg-[#f5f5f7]" delay={0.2}>
            <h3 className="text-3xl font-medium tracking-tight mb-6 text-[#1d1d1f]">Para quem é:</h3>
            <ul className="text-[#515154] text-lg font-light space-y-3">
              <li><span className="font-semibold text-pink-600">•</span> Social media ou consultor querendo ser estratégico.</li>
              <li><span className="font-semibold text-pink-600">•</span> Especialistas que buscam atrair clientes no direct.</li>
              <li><span className="font-semibold text-pink-600">•</span> Quem quer embasar decisões e relatórios com dados.</li>
            </ul>
          </BentoCard>

          {/* Medium Card */}
          <BentoCard className="p-12 bg-[#f5f5f7]" delay={0.3}>
            <h3 className="text-3xl font-medium tracking-tight mb-6 text-[#1d1d1f]">Não é para você se:</h3>
            <ul className="text-[#515154] text-lg font-light space-y-3">
              <li><span className="font-semibold text-gray-400">•</span> Cria conteúdo só por hobby sem meta de vendas.</li>
              <li><span className="font-semibold text-gray-400">•</span> Não tem cliente ou produto consolidado.</li>
              <li><span className="font-semibold text-gray-400">•</span> Acha que dados e estratégia são perda de tempo.</li>
            </ul>
          </BentoCard>
        </div>
      </Section>

      {/* SECTION 5: VALOR + PREÇO */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeInText className="mb-20">
            <h3 className="text-[#86868b] font-medium tracking-widest uppercase text-sm md:text-base mb-6">Investimento</h3>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-[#1d1d1f]">Quanto valem 5 horas <br />do seu mês?</h2>
            <p className="text-xl md:text-2xl font-light tracking-tight text-[#515154] mt-6">
              Uma análise de concorrente terceirizada custa entre <span className="font-medium">R$300 e R$800</span>. Ferramentas gringas começam em <span className="font-medium text-pink-600">US$49/mês</span>.
            </p>
          </FadeInText>

          <FadeInText delay={0.2}>
            <div className="p-10 md:p-14 bg-[#1d1d1f] rounded-[40px] text-white shadow-2xl shadow-indigo-500/10">
              <p className="text-xl font-light tracking-widest uppercase mb-4 text-purple-300">O TRENDIX faz tudo e mais.</p>
              <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">R$29<span className="text-4xl">,90</span><span className="text-2xl font-medium text-gray-400">/mês</span></div>
              <p className="text-lg md:text-xl font-light opacity-80 max-w-md mx-auto mb-10">Menos de R$1 por dia para criar com inteligência e parar de perder tempo. Uma refeição no iFood já custa mais.</p>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <p className="text-sm font-semibold text-gray-200">Se o TRENDIX te ajudar a manter 1 cliente a mais por mês, você já pagou o investimento em <GradientText>10 vezes</GradientText>.</p>
              </div>
            </div>
          </FadeInText>
        </div>
      </section>

      {/* SECTION 6: FAQ & QUEBRA DE OBJEÇÕES */}
      <section className="py-32 bg-white px-6 border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto">
          <FadeInText className="mb-16">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4 text-[#1d1d1f]">Perguntas que você <br />pode ter agora.</h2>
          </FadeInText>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeInText delay={0.1}>
              <h4 className="text-2xl font-medium mb-3">Preciso saber de tecnologia para usar?</h4>
              <p className="text-lg text-[#515154] font-light">Não. Você cola o link, a IA trabalha. O relatório aparece. Interface simples, sem curva de aprendizado.</p>
            </FadeInText>
            <FadeInText delay={0.2}>
              <h4 className="text-2xl font-medium mb-3">Vale mesmo para o meu nicho?</h4>
              <p className="text-lg text-[#515154] font-light">Se você trabalha com Instagram e tem concorrente no nicho, funciona. O sistema é baseado nos próprios dados do perfil que você analisar.</p>
            </FadeInText>
            <FadeInText delay={0.3}>
              <h4 className="text-2xl font-medium mb-3">Já tenho meu jeito de analisar.</h4>
              <p className="text-lg text-[#515154] font-light">Seu jeito atual gera relatórios automatizados? Monta 30 dias de pauta em minutos? Se não — o TRENDIX complementa ou substitui.</p>
            </FadeInText>
            <FadeInText delay={0.4}>
              <h4 className="text-2xl font-medium mb-3">E se eu não gostar?</h4>
              <p className="text-lg text-[#515154] font-light">Ao entrar no pré-lançamento você garante o preço de fundador. E com nossos <span className="font-semibold text-pink-600">7 dias de garantia Risco Zero</span>, só paga se mantiver.</p>
            </FadeInText>
          </div>
        </div>
      </section>

      {/* SECTION 7 & 8: URGÊNCIA & CTA FINAL */}
      <section id="pricing" className="py-40 bg-[#f5f5f7] text-center px-6 relative border-t border-gray-200">
        <FadeInText className="max-w-5xl mx-auto">
          <div className="inline-flex px-5 py-2 rounded-full border border-pink-200 bg-pink-50 text-pink-600 md:text-lg font-medium tracking-wide items-center justify-center mb-10">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            Pré-Lançamento. Vagas Limitadas.
          </div>

          <h2 className="text-6xl md:text-8xl font-semibold mb-10 tracking-tighter text-[#1d1d1f]">
            Esse preço <br /> não vai durar.
          </h2>
          <p className="text-2xl md:text-3xl font-light tracking-tight text-[#515154] mb-8 max-w-3xl mx-auto leading-relaxed">
            Os primeiros assinantes garantem o menor preço que essa ferramenta vai ter — <span className="font-semibold">para sempre</span>. Quem entrar agora sai na frente e trava o valor.
          </p>
          <p className="text-xl md:text-2xl tracking-normal text-[#1d1d1f] mb-16 italic font-medium">A dúvida custa mais caro que R$29,90.</p>

          <motion.div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ willChange: "transform" }}
              aria-label="Botão para assinar o TRENDIX com preço de fundador"
              className="w-full md:w-auto relative inline-flex items-center justify-center px-10 md:px-14 py-6 md:py-8 text-xl md:text-2xl font-medium tracking-tight text-white bg-[#1d1d1f] hover:bg-black rounded-full transition-all shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-4 focus:ring-pink-500/50"
            >
              TRAVAR PREÇO DE FUNDADOR
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </motion.button>
            <span className="text-lg text-[#515154] font-medium hidden md:block">ou</span>
            <a href="#problem" aria-label="Voltar para a seção do problema" className="text-lg text-[#1d1d1f] underline font-medium opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-2">continue analisando no olho.</a>
          </motion.div>
        </FadeInText>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-16 border-t border-black/5 text-sm font-medium tracking-wide text-[#86868b]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>&copy; {new Date().getFullYear()} TRENDIX. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" aria-label="Ler Política de Privacidade" className="hover:text-[#1d1d1f] text-[#515154] transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1">Política de Privacidade</a>
            <a href="#" aria-label="Ler Termos de Uso" className="hover:text-[#1d1d1f] text-[#515154] transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
