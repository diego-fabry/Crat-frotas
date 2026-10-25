
import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  indicator?: string;
};

export default function MetricCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-emerald-600",
  indicator = "+ vs mês anterior",
}: MetricCardProps) {
  return (
    <div className="flex min-h-[145px] flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <Icon size={27} strokeWidth={2.5} className={iconColor} />
        <h3 className="text-sm font-bold text-emerald-800">{title}</h3>
      </div>

      <div>
        <p className="text-4xl font-bold text-slate-700">{value}</p>
        <p className="mt-1 text-xs font-semibold text-emerald-500">
          {indicator}
        </p>
      </div>
    </div>
  );
}
