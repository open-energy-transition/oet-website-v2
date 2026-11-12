import type { Payload } from 'payload'

import { ensureRegions, loadTeam } from './context'
import { migratePartners } from './partners'
import { linkRelatedProjects, migrateProjects } from './projects'
import { linkRelatedPublications, migratePublications } from './publications'
import { renderReport, resetReport } from './report'
import { migrateSite } from './site'
import { migrateTeam } from './team'
import {
  fetchAll,
  fetchFooter,
  type LegacyPartner,
  type LegacyPost,
  type LegacyProject,
  type LegacyStaffMember,
} from './source'

export const runOldSiteImport = async (payload: Payload) => {
  resetReport()
  const [partners, projects, posts, staff, footer] = await Promise.all([
    fetchAll<LegacyPartner>('partners'),
    fetchAll<LegacyProject>('projects'),
    fetchAll<LegacyPost>('posts'),
    fetchAll<LegacyStaffMember>('team-members'),
    fetchFooter(),
  ])

  payload.logger.info(
    `Old site: ${partners.length} partners, ${projects.length} projects, ${posts.length} posts`,
  )

  const region = await ensureRegions(payload)

  payload.logger.info('Importing new team members')
  await migrateTeam(payload, staff)
  const team = await loadTeam(payload)

  payload.logger.info('Importing partners and funders')
  const partnerIds = await migratePartners(payload, partners)

  payload.logger.info('Importing projects')
  const projectIds = await migrateProjects(payload, projects, partnerIds, team, region)
  await linkRelatedProjects(payload, projects, projectIds)

  payload.logger.info('Importing publications')
  const publicationIds = await migratePublications(payload, posts, team, region)
  await linkRelatedPublications(payload, posts, publicationIds)

  payload.logger.info('Updating site settings, navigation and redirects')
  await migrateSite(payload, footer)

  return renderReport()
}

export const runTeamImport = async (payload: Payload) => {
  resetReport()
  const staff = await fetchAll<LegacyStaffMember>('team-members')
  const created = await migrateTeam(payload, staff)
  payload.logger.info(`Old site: ${staff.length} team members, ${created} new`)
  return renderReport()
}
