import React from 'react'
import Image from 'next/image'
import {
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  Play,
} from 'lucide-react'

import RichText from '@/components/RichText'
import type { Event, Media, TeamMember, User } from '@/payload-types'

const mediaUrl = (value: unknown): string | null => {
  if (!value || typeof value !== 'object') return null
  return 'url' in value ? ((value as Media).url ?? null) : null
}

const mediaAlt = (value: unknown, fallback: string): string => {
  if (value && typeof value === 'object' && 'alt' in value && (value as Media).alt) {
    return (value as Media).alt as string
  }
  return fallback
}

// The site is authored from Europe; `timezoneLabel` is only a display string
// (e.g. "CET"), so map the common abbreviations to an IANA zone and fall back
// to Berlin. All date/time output is rendered in that zone so it stays correct
// regardless of the server's timezone (UTC on Vercel).
const ZONE_BY_LABEL: Record<string, string> = {
  UTC: 'UTC',
  GMT: 'UTC',
  CET: 'Europe/Berlin',
  CEST: 'Europe/Berlin',
  BST: 'Europe/London',
  EST: 'America/New_York',
  EDT: 'America/New_York',
  PST: 'America/Los_Angeles',
  PDT: 'America/Los_Angeles',
  IST: 'Asia/Kolkata',
}

const zoneFor = (label?: string | null): string =>
  (label && ZONE_BY_LABEL[label.trim().toUpperCase()]) || 'Europe/Berlin'

const parse = (value?: string | null): Date | null => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

// e.g. "November 2, 2025, 1:07 PM"
const formatByline = (value: string | null | undefined, timeZone: string): string => {
  const date = parse(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone,
  }).format(date)
}

// e.g. "13:07"
const formatTime = (value: string | null | undefined, timeZone: string): string => {
  const date = parse(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date)
}

// e.g. "Sunday, 02/11/2025"
const formatDetailDate = (value: string | null | undefined, timeZone: string): string => {
  const date = parse(value)
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone,
  }).format(date)
}

const authorName = (author: Event['author']): string | null => {
  if (!author || typeof author !== 'object') return null
  const user = author as User
  return user.name || user.email || null
}

const contributorList = (value: Event['contributors']): TeamMember[] => {
  if (!Array.isArray(value)) return []
  return value.filter((c): c is TeamMember => typeof c === 'object' && c !== null)
}

// Minimal RFC 5545 calendar file, delivered as a data URI download.
const buildIcsHref = (event: Event): string => {
  const toIcs = (value?: string | null): string | null => {
    if (!value) return null
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  }

  const start = toIcs(event.startDate)
  const end = toIcs(event.endDate) || start
  const escape = (text: string) =>
    text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Open Energy Transition//Events//EN',
    'BEGIN:VEVENT',
    `UID:event-${event.id}@openenergytransition.org`,
    start ? `DTSTART:${start}` : '',
    end ? `DTEND:${end}` : '',
    `SUMMARY:${escape(event.title)}`,
    event.location ? `LOCATION:${escape(event.location)}` : '',
    event.registrationUrl ? `URL:${escape(event.registrationUrl)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
}

const Badge: React.FC<{ children: React.ReactNode; accent?: boolean }> = ({ children, accent }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
      accent
        ? 'border-[#F5C0C8] bg-[#FDECEE] text-[#E31937]'
        : 'border-[#D9DCDA] bg-[#F4F5F4] text-gray-black-300 dark:border-dark-blue-gray dark:bg-transparent dark:text-white'
    }`}
  >
    {children}
  </span>
)

export const EventDetail: React.FC<{ event: Event }> = ({ event }) => {
  const isUpcoming = event.startDate ? new Date(event.startDate).getTime() >= Date.now() : true

  const heroUrl = mediaUrl(event.heroImage)
  const categories = Array.isArray(event.categories)
    ? event.categories.filter((c): c is NonNullable<typeof c> & object => typeof c === 'object')
    : []
  const contributors = contributorList(event.contributors)
  const by = authorName(event.author)

  const documentation = event.documentation
  const docFeaturedUrl = mediaUrl(documentation?.featuredImage)
  const gallery = (documentation?.gallery || [])
    .map((item) => ({ url: mediaUrl(item.image), alt: mediaAlt(item.image, event.title) }))
    .filter((item): item is { url: string; alt: string } => Boolean(item.url))

  const tz = zoneFor(event.timezoneLabel)

  const timeDisplay = isUpcoming
    ? [formatTime(event.startDate, tz), event.endDate ? formatTime(event.endDate, tz) : null]
        .filter(Boolean)
        .join(' – ') + (event.durationLabel ? ` (${event.durationLabel})` : '')
    : event.durationLabel || ''

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge>{isUpcoming ? 'Upcoming Events' : 'Event Highlights'}</Badge>
          {categories.map((category) => (
            <Badge key={category.id}>{category.title}</Badge>
          ))}
        </div>

        <h1 className="font-oxanium text-4xl font-semibold leading-tight text-gray-black-500 dark:text-white lg:text-6xl">
          {event.title}
        </h1>

        {(by || event.publishedAt) && (
          <p className="mt-4 text-sm text-gray-black-300 dark:text-gray-300">
            {by && (
              <>
                By <span className="font-medium text-[#E31937]">{by}</span>
              </>
            )}
            {by && event.publishedAt && <span className="mx-2">·</span>}
            {event.publishedAt && <>Published {formatByline(event.publishedAt, tz)}</>}
            {event.publishedAt && event.timezoneLabel ? ` ${event.timezoneLabel}` : ''}
          </p>
        )}
      </header>

      {/* Hero */}
      {heroUrl && (
        <div className="relative mb-12 overflow-hidden rounded-2xl">
          <Image
            src={heroUrl}
            alt={mediaAlt(event.heroImage, event.title)}
            width={1200}
            height={620}
            className="h-auto w-full object-cover"
            priority
          />
          {!isUpcoming && event.videoUrl && (
            <a
              href={event.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E31937] px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#c31530]">
                Watch Event
                <Play className="h-4 w-4 fill-current" />
              </span>
            </a>
          )}
        </div>
      )}

      {/* Body */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left column */}
        <div>
          {!isUpcoming && (docFeaturedUrl || gallery.length > 0) && (
            <section className="mb-12">
              <h2 className="mb-4 font-oxanium text-2xl font-semibold text-gray-black-500 dark:text-white">
                {documentation?.heading || 'Event Documentation'}
              </h2>
              {docFeaturedUrl && (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={docFeaturedUrl}
                    alt={mediaAlt(documentation?.featuredImage, event.title)}
                    width={800}
                    height={480}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              {gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {gallery.map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <Image
                        src={item.url}
                        alt={item.alt}
                        width={160}
                        height={160}
                        className="aspect-square h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {event.about && (
            <section>
              <h2 className="mb-4 font-oxanium text-2xl font-semibold text-gray-black-500 dark:text-white">
                About Event
              </h2>
              <div className="prose max-w-none dark:prose-invert">
                <RichText data={event.about} enableGutter={false} enableProse={false} />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:pl-4">
          <div className="rounded-2xl border border-[#E0E2E7] p-6 dark:border-dark-blue-gray">
            <h2 className="mb-4 font-oxanium text-xl font-semibold text-gray-black-500 dark:text-white">
              Details
            </h2>
            <ul className="space-y-4 text-sm text-gray-black-400 dark:text-gray-200">
              {event.startDate && (
                <li className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gray-black-300" />
                  <span>{formatDetailDate(event.startDate, tz)}</span>
                </li>
              )}
              {event.location && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E31937]" />
                  <span className="whitespace-pre-line">{event.location}</span>
                </li>
              )}
              {timeDisplay && (
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gray-black-300" />
                  <span>{timeDisplay}</span>
                </li>
              )}
            </ul>

            <div className="mt-6 space-y-3">
              {!isUpcoming && event.recapUrl && (
                <a
                  href={event.recapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E31937] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c31530]"
                >
                  Watch Event Recap
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {isUpcoming && (
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  {event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E31937] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c31530]"
                    >
                      Join This Event
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {event.startDate && (
                    <a
                      href={buildIcsHref(event)}
                      download={`${event.slug || 'event'}.ics`}
                      className="flex flex-1 items-center justify-center rounded-full border border-[#E31937] px-5 py-3 text-sm font-medium text-[#E31937] transition-colors hover:bg-[#FDECEE]"
                    >
                      Mark Calendar
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {contributors.length > 0 && (
            <div className="mt-8 rounded-2xl border border-[#E0E2E7] p-6 dark:border-dark-blue-gray">
              <h2 className="mb-4 font-oxanium text-xl font-semibold text-gray-black-500 dark:text-white">
                Contributors
              </h2>
              <ul className="space-y-5">
                {contributors.map((person) => {
                  const avatar = mediaUrl(person.image)
                  const name = [person.firstName, person.lastName].filter(Boolean).join(' ')
                  return (
                    <li key={person.id} className="flex items-start gap-3">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt={name}
                          width={44}
                          height={44}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECEFF3] text-sm font-medium text-gray-black-300">
                          {(person.firstName?.[0] || '') + (person.lastName?.[0] || '')}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-black-500 dark:text-white">
                          {name}
                        </p>
                        {person.jobTitle && (
                          <p className="text-xs text-gray-black-300 dark:text-gray-300">
                            {person.jobTitle}
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
