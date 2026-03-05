import React from 'react'
import { ChartClient, ChartData } from './Component.client'

export type ChartBlockProps = {
  chartType: 'line' | 'bar' | 'area' | 'pie'
  data?: ChartData[]
  series?: {
    seriesLabel: string
    points: { label: string; value: number }[]
  }[]
  title?: string | null
  description?: string | null
  xAxisLabel?: string | null
  yAxisLabel?: string | null
  color?: string | null
  showGrid?: boolean | null
  showLegend?: boolean | null
  valueLabel?: string | null
  value2Label?: string | null
  blockType: 'chart'
}

type Props = ChartBlockProps & {
  className?: string
}

export const ChartBlock: React.FC<Props> = ({
  className,
  chartType,
  data = [],
  title,
  description,
  xAxisLabel,
  yAxisLabel,
  color,
  showGrid,
  showLegend,
  valueLabel,
  value2Label,
  series,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={className}>
        <p className="text-gray-500 italic">No chart data available</p>
      </div>
    )
  }

  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <ChartClient
        chartType={chartType}
        data={data}
        series={series}
        title={title || undefined}
        description={description || undefined}
        xAxisLabel={xAxisLabel || undefined}
        yAxisLabel={yAxisLabel || undefined}
        color={color || undefined}
        showGrid={showGrid ?? true}
        showLegend={showLegend ?? true}
        valueLabel={valueLabel || undefined}
        value2Label={value2Label || undefined}
      />
    </div>
  )
}
