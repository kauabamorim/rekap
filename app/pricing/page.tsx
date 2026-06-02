"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const plans = [
  {
    name: "Starter",
    monthlyPrice: 197,
    annualPrice: 157,
    description: "Para agencias que estao comecando.",
    highlight: false,
    features: [
      "Ate 5 contas de anuncios",
      "Relatorios ilimitados",
      "Link compartilhavel",
      "Meta Ads",
      "Suporte por email",
    ],
    cta: "Comecar gratis",
    href: "/register",
  },
  {
    name: "Agencia",
    monthlyPrice: 397,
    annualPrice: 317,
    description: "Para agencias em crescimento.",
    highlight: true,
    features: [
      "Ate 20 contas de anuncios",
      "Relatorios ilimitados",
      "Link compartilhavel",
      "Meta Ads + Google Ads",
      "White-label completo",
      "Relatorios agendados",
      "Suporte prioritario",
    ],
    cta: "Comecar gratis",
    href: "/register",
  },
  {
    name: "Pro",
    monthlyPrice: 697,
    annualPrice: 557,
    description: "Para grandes agencias e grupos.",
    highlight: false,
    features: [
      "Contas ilimitadas",
      "Relatorios ilimitados",
      "Link compartilhavel",
      "Todas as integracoes",
      "White-label completo",
      "Relatorios agendados",
      "Suporte dedicado",
      "Acesso a API",
    ],
    cta: "Falar com vendas",
    href: "/register",
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Nav */}
      <nav className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">rekap</Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Funcionalidades
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
      <section className="pt-20 pb-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Preco simples.
            <br />
            <span className="text-gray-400 dark:text-gray-600">Sem surpresas.</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            Comece gratis. Cancele a qualquer momento. Sem fidelidade.
          </p>

          {/* Toggle mensal/anual */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-900 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !annual ? "bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? "bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Anual
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                -20%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-2xl scale-105"
                  : "bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Mais popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
                  {plan.description}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">
                    R$ {annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-gray-400 dark:text-gray-500" : "text-gray-400"}`}>
                    /mes
                  </span>
                </div>
                {annual && (
                  <p className={`text-xs mt-1 ${plan.highlight ? "text-gray-400 dark:text-gray-500" : "text-gray-400"}`}>
                    Cobrado anualmente
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-blue-400 dark:text-blue-600" : "text-green-500"}`} />
                    <span className={plan.highlight ? "text-gray-200 dark:text-gray-700" : "text-gray-600 dark:text-gray-300"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full text-center py-3 rounded-xl text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-32 px-6 border-t border-gray-100 dark:border-gray-800 pt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Perguntas frequentes</h2>
          <div className="space-y-6">
            {[
              { q: "Preciso de cartao de credito para comecar?", a: "Nao. Voce pode criar uma conta e conectar uma conta de anuncios gratuitamente, sem nenhum dado de pagamento." },
              { q: "Posso cancelar a qualquer momento?", a: "Sim. Sem fidelidade, sem multa. Cancele quando quiser diretamente pelo painel." },
              { q: "O que acontece se eu exceder o limite de contas?", a: "O sistema vai avisar quando estiver proximo do limite. Voce pode fazer upgrade ou remover contas inativas." },
              { q: "Os relatorios ficam com a minha marca?", a: "A partir do plano Agencia, voce pode adicionar o logo e as cores da sua agencia nos relatorios." },
              { q: "Quais plataformas de anuncios sao suportadas?", a: "Atualmente Meta Ads (Facebook e Instagram). Google Ads esta disponivel nos planos Agencia e Pro. Outras plataformas em breve." },
            ].map((item) => (
              <div key={item.q} className="border-b border-gray-100 dark:border-gray-800 pb-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">rekap</span>
          <p className="text-xs text-gray-400">© 2026 Rekap. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
