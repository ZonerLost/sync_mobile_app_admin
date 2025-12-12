import React from "react";
import { Link } from "react-router-dom";
import SectionCard from "../../shared/layout/SectionCard";

const QuickReportsSection: React.FC = () => {
  return (
    <SectionCard
      title="Reports"
      description="Jump directly to predefined admin report categories."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <QuickReportCard
          title="Locksmith Reports"
          items={[
            "Daily locksmith performance",
            "Weekly locksmith performance",
          ]}
          to="/reports/daily-locksmiths"
        />
        <QuickReportCard
          title="Companies IN / OUT"
          items={["Weekly companies joining", "Weekly companies leaving"]}
          to="/reports/weekly-companies-in"
        />
        <QuickReportCard
          title="Operators & Revenue"
          items={[
            "Operator overview (daily/weekly/monthly)",
            "Revenue breakdown",
          ]}
          to="/reports/daily-operators"
        />
      </div>
    </SectionCard>
  );
};

type QuickReportCardProps = {
  title: string;
  items: string[];
  to: string;
};

const QuickReportCard: React.FC<QuickReportCardProps> = ({
  title,
  items,
  to,
}) => {
  return (
    <Link
      to={to}
      className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-100 hover:bg-blue-50/40 sm:p-5"
    >
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <ul className="mt-2 space-y-1 text-xs text-gray-500">
          {items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
      <span className="mt-3 text-xs font-semibold text-blue-600">
        Open report -
      </span>
    </Link>
  );
};

export default QuickReportsSection;
