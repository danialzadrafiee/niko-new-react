import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, DollarSign, Clock } from "lucide-react";

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const statusConfig = {
    active: { icon: CheckCircle, text: 'فعال', color: 'green' },
    canceled: { icon: XCircle, text: 'لغو شده', color: 'red' },
    failed: { icon: AlertTriangle, text: 'ناموفق', color: 'red' },
    completed: { icon: CheckCircle, text: 'تکمیل شده', color: 'green' },
    'withdraw-requested': { icon: DollarSign, text: 'درخواست برداشت', color: 'blue' },
    withdrawn: { icon: DollarSign, text: 'برداشت شده', color: 'green' },
    dead: { icon: Clock, text: 'منقضی شده', color: 'red' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  const Icon = config.icon;

  return (
    <span className={`flex items-center gap-1 text-${config.color}-500 bg-${config.color}-100 px-2 py-1 rounded`}>
      <Icon size={16} />
      {config.text}
    </span>
  );
};

export default Status;