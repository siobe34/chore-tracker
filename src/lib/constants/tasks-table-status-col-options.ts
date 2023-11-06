import { CheckCircle2, CircleDashed, Timer } from 'lucide-react';

export const statusOptions = [
  {
    value: 'NOTSTARTED',
    label: 'Not Started',
    icon: CircleDashed,
  },
  {
    value: 'INPROGRESS',
    label: 'In Progress',
    icon: Timer,
  },
  {
    value: 'COMPLETE',
    label: 'Complete',
    icon: CheckCircle2,
  },
];
