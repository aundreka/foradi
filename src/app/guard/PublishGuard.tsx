import { PropsWithChildren } from 'react';
import { usePlanContext } from '../hooks/usePlanContext';

export default function PublishGuard({ children }: PropsWithChildren) {
  const { plan } = usePlanContext(); // {status, hasDates, hasQuotas, hasCurriculum}
  const ok = plan?.hasDates && plan?.hasQuotas && plan?.hasCurriculum;
  if (!ok) return <div className="p-6">Complete dates, quotas, and curriculum upload to publish.</div>;
  return <>{children}</>;
}
