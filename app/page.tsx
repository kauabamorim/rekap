"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { BarChart3, Link2, Zap, Clock, TrendingUp, Shield } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
}

const features = [
  { icon: Zap, title: "Conecte em segundos", description: "Integre Meta Ads e Google Ads com um clique. Sem configuracoes complexas, sem planilhas." },
  { icon: BarChart3, title: "Relatorios automaticos", description: "Dados de campanhas organizados em relatorios visuais e profissionais, gerados automaticamente todo mes." },
  { icon: Link2, title: "Link para o cliente", description: "Compartilhe um link exclusivo com cada cliente. Eles acessam o relatorio sem precisar de login." },
  { icon: Clock, title: "Economize 10h por mes", description: "Pare de montar relatorios no PowerPoint. O Rekap faz isso enquanto voce foca no que importa: resultados." },
  { icon: TrendingUp, title: "Visao completa da performance", description: "Gasto, impressoes, cliques, CPA e muito mais. Tudo em um so lugar, atualizado em tempo real." },
  { icon: Shield, title: "Sua marca, seu relatorio", description: "Relatorios com a identidade visual da sua agencia. Impressione seus clientes com profissionalismo." },
]

const steps = [
  { number: "01", title: "Conecte sua conta", description: "Autorize o acesso ao Meta Ads ou Google Ads em menos de 1 minuto." },
  { number: "02", title: "Selecione o periodo", description: "Escolha o intervalo de datas e o Rekap busca todos os dados automaticamente." },
  { number: "03", title: "Compartilhe o link", description: "Copie o link do relatorio e envie para seu cliente via WhatsApp ou email." },
]

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">rekap</span>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Precos
            </Link>
            <ThemeToggle />
            <Link href="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-sm bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full px-5 py-2 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
              Comecar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-medium px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Para agencias de marketing digital
          </motion.div>

          <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1}
            className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Relatorios que
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              impressionam.
            </span>
            <br />
            Sem esforco.
          </motion.h1>

          <motion.p initial="hidden" animate="show" variants={fadeUp} custom={2}
            className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            O Rekap conecta suas contas de anuncios e gera relatorios profissionais automaticamente.
            Compartilhe com seus clientes em segundos e economize horas todo mes.
          </motion.p>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register"
              className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-medium rounded-full px-8 py-4 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all hover:scale-105"
            >
              Criar conta gratis
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Ja tenho uma conta &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mock dashboard */}
      <section className="pb-32 px-6">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gray-950 rounded-3xl p-1 shadow-2xl">
            <div className="bg-gray-900 rounded-[20px] p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Gasto total", value: "R$ 12.840" },
                  { label: "Impressoes", value: "1.2M" },
                  { label: "Cliques", value: "48.3K" },
                  { label: "CPA", value: "R$ 28,40" },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                    <p className="text-white text-xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-800 rounded-xl p-4 h-24 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-violet-500 rounded-sm opacity-80"
                    style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Voce passa horas todo mes{" "}
            <span className="text-gray-400 dark:text-gray-600">montando relatorio no PowerPoint?</span>
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
          >
            Agencias com 20 clientes perdem ate{" "}
            <strong className="text-gray-900 dark:text-white">300 horas por ano</strong>{" "}
            so em relatorios. Dados puxados manualmente, formatacao no PowerPoint, envio por email — tudo isso pode acabar agora.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Tudo que sua agencia precisa</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Simples, rapido e profissional.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.5}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Como funciona</h2>
            <p className="text-lg text-gray-400">Tres passos. Menos de 5 minutos.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.number} initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.5} className="text-center"
              >
                <div className="text-6xl font-bold text-gray-800 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold tracking-tight mb-6">
            Comece hoje,
            <br />
            <span className="text-gray-400 dark:text-gray-600">de graca.</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
            Crie sua conta e conecte sua primeira conta de anuncios em menos de 5 minutos.
          </p>
          <Link href="/register"
            className="inline-block bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-medium rounded-full px-10 py-4 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all hover:scale-105"
          >
            Criar conta gratis
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold tracking-tight">rekap</span>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/pricing" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Precos</Link>
            <span>© 2026 Rekap. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
