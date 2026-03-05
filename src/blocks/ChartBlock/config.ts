import type { Block } from 'payload'

export const Chart: Block = {
  slug: 'chart',
  interfaceName: 'ChartBlock',
  labels: {
    singular: 'Chart',
    plural: 'Charts',
  },
  fields: [
    {
      name: 'chartType',
      type: 'select',
      required: true,
      defaultValue: 'line',
      options: [
        {
          label: 'Line Chart',
          value: 'line',
        },
        {
          label: 'Bar Chart',
          value: 'bar',
        },
        {
          label: 'Area Chart',
          value: 'area',
        },
        {
          label: 'Pie Chart',
          value: 'pie',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Chart Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Chart Description',
    },
    {
      name: 'series',
      type: 'array',
      label: 'Series (grouped data)',
      admin: {
        description:
          'Optional: define multiple series. Each series has its own label and points. If provided, this takes precedence over the flat `data` array.',
      },
      fields: [
        {
          name: 'seriesLabel',
          type: 'text',
          required: true,
          label: 'Series Label',
        },
        {
          name: 'points',
          type: 'array',
          label: 'Points',
          minRows: 1,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label (X-axis)',
            },
            {
              name: 'value',
              type: 'number',
              required: true,
              label: 'Value (Y-axis)',
            },
          ],
        },
      ],
    },
    {
      name: 'xAxisLabel',
      type: 'text',
      label: 'X-Axis Label',
    },
    {
      name: 'yAxisLabel',
      type: 'text',
      label: 'Y-Axis Label',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Primary Color',
      defaultValue: 'blue',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
      ],
    },
    {
      name: 'showGrid',
      type: 'checkbox',
      label: 'Show Grid',
      defaultValue: true,
    },
    {
      name: 'showLegend',
      type: 'checkbox',
      label: 'Show Legend',
      defaultValue: true,
    },
    {
      name: 'valueLabel',
      type: 'text',
      label: 'Primary series label',
      defaultValue: 'Value',
      admin: {
        description: 'Label used in tooltip and legend for the primary `value` field',
      },
    },
    {
      name: 'value2Label',
      type: 'text',
      label: 'Secondary series label',
      defaultValue: 'Value 2',
      admin: {
        description: 'Label used in tooltip and legend for the optional `value2` field',
      },
    },
  ],
}
