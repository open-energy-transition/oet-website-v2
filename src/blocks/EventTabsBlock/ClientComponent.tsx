'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Eye, SlidersHorizontal } from 'lucide-react'

import type { EventCategory, Event, EventTabsBlock as EventTabsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type TabKey = 'highlights' | 'upcoming'

type SortKey = 'az' | 'za' | 'date-desc' | 'date-asc'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'az', label: 'Alphabetical (A-Z)' },
  { value: 'za', label: 'Alphabetical (Z-A)' },
  { value: 'date-desc', label: 'Date (Newest first)' },
  { value: 'date-asc', label: 'Date (Oldest first)' },
]

export type EventTabsClientProps = {
  title: EventTabsBlockProps['title']
  introContent: EventTabsBlockProps['introContent']
  tabLabels: EventTabsBlockProps['tabLabels']
  defaultTab: EventTabsBlockProps['defaultTab']
  categoryOptions: { id: number; label: string }[]
  events: {
    highlights: Event[]
    upcoming: Event[]
  }
}

const getMediaUrl = (value: Event['heroImage']): string | null => {
  if (!value || typeof value !== 'object') return null
  return 'url' in value ? value.url || null : null
}

const getCategories = (value: Event['categories']): EventCategory[] => {
  if (!Array.isArray(value)) return []
  return value.filter((c): c is EventCategory => typeof c === 'object' && c !== null)
}

const formatDate = (value?: string | null): string => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const imageUrl = getMediaUrl(event.heroImage)
  const categories = getCategories(event.categories)
  const href = event.slug ? `/events/${event.slug}` : '#'

  return (
    <div className="flex flex-col items-start border border-[#D9DCDA] border-t-0 rounded-xl dark:border-dark-blue-gray">
      {imageUrl && (
        <div className="w-full min-h-[200px] lg:h-[200px] rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={event.title}
            width={400}
            height={225}
            className="rounded-xl w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 lg:p-6 w-full flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2 text-gray-black-400 dark:!text-white line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {event.startDate && (
            <span className="inline-flex items-center rounded-md border border-[#D9DCDA] dark:border-dark-blue-gray px-2 py-1 text-xs text-gray-black-300 dark:!text-white">
              {formatDate(event.startDate)}
            </span>
          )}
          {categories.map((category) => (
            <span
              key={category.id}
              className="inline-flex items-center rounded-md border border-[#D9DCDA] dark:border-dark-blue-gray px-2 py-1 text-xs text-gray-black-300 dark:!text-white"
            >
              {category.title}
            </span>
          ))}
        </div>

        {event.excerpt && (
          <p className="text-sm text-gray-black-300 dark:text-gray-300 line-clamp-3 mb-4">
            {event.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-black-500 dark:!text-white"
          >
            Event Details
            <ArrowRight className="h-4 w-4" />
          </Link>
          {event.videoUrl && (
            <a
              href={event.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E31937]"
            >
              Watch Event
              <Eye className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const EventGrid: React.FC<{ events: Event[] }> = ({ events }) => {
  if (!events.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No events found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export const EventTabsClient: React.FC<EventTabsClientProps> = ({
  title,
  introContent,
  tabLabels,
  defaultTab,
  categoryOptions,
  events,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(
    defaultTab === 'upcoming' ? 'upcoming' : 'highlights',
  )
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('az')

  const highlightEvents = useMemo(() => events.highlights || [], [events.highlights])
  const upcomingEvents = useMemo(() => events.upcoming || [], [events.upcoming])

  const tabs: { key: TabKey; label: string; events: Event[] }[] = [
    {
      key: 'highlights',
      label: tabLabels?.highlightsLabel || 'Event Highlights',
      events: highlightEvents,
    },
    {
      key: 'upcoming',
      label: tabLabels?.upcomingLabel || 'Upcoming Events',
      events: upcomingEvents,
    },
  ]

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : highlightEvents

  const visibleEvents = useMemo(() => {
    let list = currentEvents

    if (activeCategory !== 'all') {
      list = list.filter((event) =>
        getCategories(event.categories).some((category) => category.id === activeCategory),
      )
    }

    const sorted = [...list]
    sorted.sort((a, b) => {
      switch (sort) {
        case 'za':
          return (b.title || '').localeCompare(a.title || '')
        case 'date-asc':
          return new Date(a.startDate || 0).getTime() - new Date(b.startDate || 0).getTime()
        case 'date-desc':
          return new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime()
        case 'az':
        default:
          return (a.title || '').localeCompare(b.title || '')
      }
    })
    return sorted
  }, [currentEvents, activeCategory, sort])

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key)
    setActiveCategory('all')
  }

  return (
    <div className="container mx-auto px-4 -my-4 lg:py-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4">
        {title && (
          <div className="font-oxanium text-5xl font-semibold text-gray-black-500 dark:text-white mb-4 lg:w-1/2">
            {title}
          </div>
        )}
        {introContent && (
          <div className="text-heebo-medium-normal text-[#777980] dark:text-gray-300 lg:w-1/2">
            <RichText enableGutter={false} enableProse={false} data={introContent} />
          </div>
        )}
      </div>

      {/* Tab navigation */}
      <div className="mb-8 mt-14">
        <div
          className="flex border border-[#0B0C0B26] dark:border-dark-blue-gray rounded-3xl overflow-hidden w-full flex-col lg:flex-row gap-6"
          role="tablist"
          aria-label="Event tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              onClick={() => handleTabChange(tab.key)}
              className={cn(
                'transition-colors duration-200 px-8 py-6 font-poppins text-2xl font-normal leading-none w-full text-center flex-1',
                activeTab === tab.key
                  ? 'bg-gray-100 text-[#26372C] dark:bg-gray-800 dark:text-white'
                  : 'bg-transparent text-[#26372C] dark:text-white',
              )}
              aria-selected={activeTab === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter + sort row */}
      <div className="flex flex-col gap-4 border-b border-[#E0E2E7] dark:border-dark-blue-gray pb-3 mb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              'text-sm pb-1 border-b-2 transition-colors',
              activeCategory === 'all'
                ? 'border-[#E31937] text-gray-black-500 dark:text-white'
                : 'border-transparent text-gray-black-300 dark:text-gray-400',
            )}
          >
            All
          </button>
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'text-sm pb-1 border-b-2 transition-colors',
                activeCategory === category.id
                  ? 'border-[#E31937] text-gray-black-500 dark:text-white'
                  : 'border-transparent text-gray-black-300 dark:text-gray-400',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <label className="relative inline-flex items-center self-start rounded-full border border-[#E0E2E7] dark:border-dark-blue-gray px-4 py-2 text-sm text-gray-black-400 dark:text-white lg:self-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          <span className="sr-only">Sort events</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="appearance-none bg-transparent pr-6 focus:outline-none dark:bg-transparent"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4" />
        </label>
      </div>

      {/* Grid */}
      <EventGrid events={visibleEvents} />
    </div>
  )
}
