
import { useState } from "react";
import {
  CarFront, CheckCircle2, Wrench, AlertCircle,
  Fuel, FileText, TrendingUp, TrendingDown
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MetricCard from "../components/MetricCard";

type DashboardProps = {
  onLogout: () => void;
};

const fleetMetrics = [
  { title: "Total de veículos", value: 6, icon: CarFront, iconColor: "text-green-600" },
  { title: "Em atividade", value: 4, icon: CheckCircle2, iconColor: "text-green-600" },
  { title: "Em manutenção", value: 1, icon: Wrench, iconColor: "text-sky-500" },
  { title: "Indisponíveis", value: 1, icon: AlertCircle, iconColor: "text-red-500" },
];

const quickActions = [
  { title: "Registrar Abastecimento", icon: Fuel },
  { title: "Solicitar Manutenção", icon: Wrench },
  { title: "Ver Relatório de Frota", icon: FileText },
];

const operationalMetrics = [
  { title: "Média de consumo", value: "8,7 km/L", positive: true },
  { title: "Custo Médio por KM", value: "R$ 0,83", positive: false },
  { title: "Total de KM rodado", value: "141.700 KM", positive: false },
];

export default function Dashboard({ onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleQuickAction = (title: string) => {
    alert(`${title}: funcionalidade em desenvolvimento.`);
  };

  return (
    <div className="min-h-screen bg-emerald-50/60">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className={`min-h-screen transition-all duration-300 ${
        sidebarOpen ? "ml-60" : "ml-14"
      }`}>
        <Header onLogout={onLogout} />

        <main className="mx-auto w-full max-w-[1500px] space-y-8 px-5 py-8 sm:px-8 lg:px-12">
          {/* BANNER */}
          <section className="relative h-44 overflow-hidden rounded-2xl bg-emerald-800 shadow-sm sm:h-52 lg:h-56">
            <img
              src="/baner.jpg"
              alt="Monumento de Crateús"
              className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/95 via-emerald-700/65 to-transparent" />
            <div className="relative z-10 flex h-full items-center px-5 sm:px-8">
              <div className="flex items-center gap-4">
                <img
                  src="/brasao.png"
                  alt="Brasão de Crateús"
                  className="h-16 w-auto object-contain drop-shadow-lg sm:h-20"
                />
                <div className="text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest sm:text-sm">
                    Governo de
                  </p>
                  <h1 className="text-3xl font-black tracking-tight drop-shadow-md sm:text-5xl">
                    CRATEÚS
                  </h1>
                </div>
              </div>
            </div>
          </section>

          {/* MÉTRICAS PRINCIPAIS */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fleetMetrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                iconColor={metric.iconColor}
              />
            ))}
          </section>

          {/* AÇÕES RÁPIDAS */}
          <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => handleQuickAction(action.title)}
                  className="flex min-h-[110px] items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                >
                  <Icon size={39} strokeWidth={2.5} className="shrink-0 text-green-600" />
                  <span className="max-w-[145px] text-sm font-bold leading-snug text-emerald-800">
                    {action.title}
                  </span>
                </button>
              );
            })}
          </section>

          {/* RESUMO GERAL */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-emerald-800">
              Resumo Geral
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {operationalMetrics.map((metric) => (
                <div
                  key={metric.title}
                  className="flex min-h-[135px] flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold text-slate-600">
                    {metric.title}
                  </p>
                  <p className="my-3 text-2xl font-bold text-green-600 sm:text-3xl">
                    {metric.value}
                  </p>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${
                    metric.positive ? "text-emerald-500" : "text-red-500"
                  }`}>
                    {metric.positive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    <span>vs mês anterior</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
