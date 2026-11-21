import React from "react";

export interface AdsterraConfig {
  key?: string;
  zoneId?: string;
  enabled?: boolean;
  [key: string]: unknown;
}

export function getEffectiveAdsterraConfig(
  overrideConfig?: Partial<AdsterraConfig>
): AdsterraConfig {
  return {
    key: overrideConfig?.key ?? "",
    zoneId: overrideConfig?.zoneId ?? "",
    enabled: overrideConfig?.enabled ?? true,
    ...overrideConfig,
  };
}

export interface AdsterraAdUnitProps {
  config?: Partial<AdsterraConfig>;
  adKey?: string;
  className?: string;
}

export const AdsterraAdUnit: React.FC<AdsterraAdUnitProps> = ({
  config,
  adKey,
  className = "",
}) => {
  const effective = getEffectiveAdsterraConfig({
    ...config,
    ...(adKey ? { key: adKey } : {}),
  });

  if (!effective.enabled) return null;

  return (
    <div
      data-adsterra-zone={effective.zoneId || "default"}
      className={`rounded-xl border border-zinc-800/70 bg-zinc-900/50 p-3 text-center text-xs text-zinc-400 ${className}`}
    >
      وحدة إعلانية (Adsterra)
    </div>
  );
};

export default AdsterraAdUnit;
