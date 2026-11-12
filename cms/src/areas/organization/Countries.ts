import type { CollectionConfig } from 'payload'

import { publicRead } from '../../access'
import { image, plainText, text } from '../../fields'
import { choice, number } from './fields'

export const continents = [
  { label: 'Africa', value: 'africa' },
  { label: 'Antarctica', value: 'antarctica' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'North America', value: 'north-america' },
  { label: 'South America', value: 'south-america' },
  { label: 'Australia/Oceania', value: 'oceania' },
] as const

export const Countries: CollectionConfig = {
  slug: 'countries',
  access: publicRead,
  admin: {
    group: 'Organization',
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'continent', 'teammates'],
    description: 'Countries with a pin on the team page globe.',
  },
  defaultSort: 'code',
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...plainText('code', {
            required: true,
            description: 'Three-letter country code (ISO 3166-1 alpha-3), for example USA.',
          }),
          unique: true,
          index: true,
        },
        text('name', {
          required: true,
          description: 'Country name on the globe pin and the country card.',
        }),
      ],
    },
    choice('continent', continents, {
      required: false,
      description: 'Continent the country is counted under.',
    }),
    {
      type: 'row',
      fields: [
        number('longitude', {
          required: true,
          description: 'Position of the pin on the globe. Degrees east, -180 to 180.',
        }),
        number('latitude', {
          required: true,
          description: 'Position of the pin on the globe. Degrees north, -90 to 90.',
        }),
      ],
    },
    plainText('teammates', {
      required: true,
      label: 'Teammates figure',
      description:
        'Number on the country card next to "OET Team". Shown as written; not counted from the team.',
    }),
    image('photo', {
      required: true,
      label: 'Card photo',
      description: 'Photo on the country card that opens when the pin is selected.',
    }),
  ],
}
