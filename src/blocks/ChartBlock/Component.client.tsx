'use client'

import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export type ChartData = {
  label: string
  value: number
  value2?: number | null
  id?: string | null
}

export type ChartClientProps = {
  chartType: 'line' | 'bar' | 'area' | 'pie'
  data: ChartData[]
  series?: {
    seriesLabel: string
    points: { label: string; value: number }[]
  }[]
  title?: string
  description?: string
  xAxisLabel?: string
  yAxisLabel?: string
  color?: string
  showGrid?: boolean
  showLegend?: boolean
  valueLabel?: string
  value2Label?: string
}

const COLORS = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#10b981',
  purple: '#8b5cf6',
  orange: '#f97316',
}

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']

export const ChartClient: React.FC<ChartClientProps> = ({
  chartType,
  data,
  series,
  title,
  description,
  xAxisLabel,
  yAxisLabel,
  color = 'blue',
  showGrid = true,
  showLegend = true,
  valueLabel = 'Value',
  value2Label = 'Value 2',
}) => {
  const primaryColor = COLORS[color as keyof typeof COLORS] || COLORS.blue

  const hasSecondValue = data.some((point) => point.value2 != null)

  // If `series` grouped data is provided, build chartData and series metadata from it.
  const useSeries = Array.isArray(series) && series.length > 0

  const SERIES_COLORS = Object.values(COLORS)

  let chartData: any[] = []
  let renderedSeries: { key: string; name: string; color: string }[] = []

  if (useSeries) {
    // Create stable keys for series
    const seriesKeys = series!.map((_, i) => `s${i}`)

    // Collect all unique labels across series
    const labelSet = new Set<string>()
    series!.forEach((s) => s.points.forEach((p) => labelSet.add(p.label)))

    const allLabels = Array.from(labelSet)

    chartData = allLabels.map((label) => {
      const obj: any = { name: label }
      series!.forEach((s, i) => {
        const pt = s.points.find((p) => p.label === label)
        obj[seriesKeys[i]] = pt ? pt.value : null
      })
      return obj
    })

    renderedSeries = series!.map((s, i) => ({
      key: seriesKeys[i],
      name: s.seriesLabel,
      color: SERIES_COLORS[i % SERIES_COLORS.length],
    }))
  } else {
    chartData = data.map((point) => ({
      name: point.label,
      value: point.value,
      ...(point.value2 != null && { value2: point.value2 }),
    }))
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={
                  xAxisLabel
                    ? { value: xAxisLabel, position: 'insideBottom', offset: -5 }
                    : undefined
                }
              />
              <YAxis
                label={
                  yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined
                }
              />
              <Tooltip />
              {showLegend && <Legend />}
              {useSeries
                ? renderedSeries.map((s) => (
                    <Line
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      stroke={s.color}
                      strokeWidth={2}
                      name={s.name}
                    />
                  ))
                : (
                    <>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={primaryColor}
                        strokeWidth={2}
                        name={valueLabel}
                      />
                      {hasSecondValue && (
                        <Line
                          type="monotone"
                          dataKey="value2"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          name={value2Label}
                        />
                      )}
                    </>
                  )}
            </LineChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={
                  xAxisLabel
                    ? { value: xAxisLabel, position: 'insideBottom', offset: -5 }
                    : undefined
                }
              />
              <YAxis
                label={
                  yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined
                }
              />
              <Tooltip />
              {showLegend && <Legend />}
              {useSeries
                ? renderedSeries.map((s) => (
                    <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.name} />
                  ))
                : (
                    <>
                      <Bar dataKey="value" fill={primaryColor} name={valueLabel} />
                      {hasSecondValue && <Bar dataKey="value2" fill="#8b5cf6" name={value2Label} />}
                    </>
                  )}
            </BarChart>
          </ResponsiveContainer>
        )

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={
                  xAxisLabel
                    ? { value: xAxisLabel, position: 'insideBottom', offset: -5 }
                    : undefined
                }
              />
              <YAxis
                label={
                  yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined
                }
              />
              <Tooltip />
              {showLegend && <Legend />}
              {useSeries
                ? renderedSeries.map((s) => (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      stroke={s.color}
                      fill={s.color}
                      fillOpacity={0.6}
                      name={s.name}
                    />
                  ))
                : (
                    <>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={primaryColor}
                        fill={primaryColor}
                        fillOpacity={0.6}
                        name={valueLabel}
                      />
                      {hasSecondValue && (
                        <Area
                          type="monotone"
                          dataKey="value2"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                          name={value2Label}
                        />
                      )}
                    </>
                  )}
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              {/* For pie charts, if grouped `series` provided we use the first series' points */}
              <Pie
                data={useSeries ? series![0].points.map((p) => ({ name: p.label, value: p.value })) : chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={120}
                fill={primaryColor}
                dataKey="value"
              >
                {(useSeries ? series![0].points : chartData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="my-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {title && (
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      )}
      {description && <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>}
      <div className="w-full">{renderChart()}</div>
    </div>
  )
}
