import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const LinkScanRuns: CollectionConfig<'link-scan-runs'> = {
  slug: 'link-scan-runs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: [
      'status',
      'trigger',
      'startedAt',
      'finishedAt',
      'totalChecked',
      'totalSucceeded',
      'totalFailed',
    ],
    useAsTitle: 'status',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'running',
      options: [
        {
          label: 'Running',
          value: 'running',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
      required: true,
    },
    {
      name: 'trigger',
      type: 'select',
      defaultValue: 'cron',
      options: [
        {
          label: 'Cron',
          value: 'cron',
        },
        {
          label: 'Manual',
          value: 'manual',
        },
      ],
      required: true,
    },
    {
      name: 'startedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'finishedAt',
      type: 'date',
    },
    {
      name: 'durationMs',
      type: 'number',
      min: 0,
    },
    {
      name: 'totalChecked',
      type: 'number',
      defaultValue: 0,
      min: 0,
      required: true,
    },
    {
      name: 'totalFailed',
      type: 'number',
      defaultValue: 0,
      min: 0,
      required: true,
    },
    {
      name: 'totalSucceeded',
      type: 'number',
      defaultValue: 0,
      min: 0,
      required: true,
    },
    {
      name: 'failedResults',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      labels: {
        plural: 'Failed Results',
        singular: 'Failed Result',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'finalUrl',
          type: 'text',
        },
        {
          name: 'statusCode',
          type: 'number',
          min: 0,
        },
        {
          name: 'durationMs',
          type: 'number',
          min: 0,
        },
        {
          name: 'sourceCollection',
          type: 'text',
        },
        {
          name: 'sourceId',
          type: 'text',
        },
        {
          name: 'sourceTitle',
          type: 'text',
        },
        {
          name: 'sourcePath',
          type: 'text',
        },
        {
          name: 'error',
          type: 'textarea',
        },
      ],
    },
  ],
}
