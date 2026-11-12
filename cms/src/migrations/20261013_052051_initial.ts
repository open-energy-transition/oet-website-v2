import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en');
  CREATE TYPE "public"."enum_projects_cta_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_projects_project_status" AS ENUM('completed', 'in-progress');
  CREATE TYPE "public"."enum_projects_frame" AS ENUM('bright', 'brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900', 'neutral-800', 'neutral-900', 'neutral-950');
  CREATE TYPE "public"."enum_projects_contact_kind" AS ENUM('team-member', 'external');
  CREATE TYPE "public"."enum_projects_home_title_lines" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_cta_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__projects_v_version_project_status" AS ENUM('completed', 'in-progress');
  CREATE TYPE "public"."enum__projects_v_version_frame" AS ENUM('bright', 'brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900', 'neutral-800', 'neutral-900', 'neutral-950');
  CREATE TYPE "public"."enum__projects_v_version_contact_kind" AS ENUM('team-member', 'external');
  CREATE TYPE "public"."enum__projects_v_version_home_title_lines" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_publications_authors_kind" AS ENUM('team-member', 'external');
  CREATE TYPE "public"."enum_publications_blocks_stats_items_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_publications_cta_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_publications_type" AS ENUM('academic', 'blogs', 'policy-briefs', 'reports');
  CREATE TYPE "public"."enum_publications_frame" AS ENUM('bright', 'brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900', 'neutral-800', 'neutral-900', 'neutral-950');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_version_authors_kind" AS ENUM('team-member', 'external');
  CREATE TYPE "public"."enum__publications_v_blocks_stats_items_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__publications_v_version_cta_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__publications_v_version_type" AS ENUM('academic', 'blogs', 'policy-briefs', 'reports');
  CREATE TYPE "public"."enum__publications_v_version_frame" AS ENUM('bright', 'brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900', 'neutral-800', 'neutral-900', 'neutral-950');
  CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_services_offerings_items_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_services_offerings_items_accent" AS ENUM('brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum_services_hero_background" AS ENUM('brand-600', 'brand-700', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum_services_values_columns" AS ENUM('5', '6');
  CREATE TYPE "public"."enum_services_cta_background" AS ENUM('brand-600', 'brand-700', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum_services_cta_collage" AS ENUM('wind', 'thermalpower', 'biz');
  CREATE TYPE "public"."enum_services_cta_card_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_services_cta_card_icon_tone" AS ENUM('brand-500', 'brand-600', 'brand-700', 'brand-800');
  CREATE TYPE "public"."enum_services_cta_card_frame" AS ENUM('brand-500', 'brand-600');
  CREATE TYPE "public"."enum_services_navigation_icon" AS ENUM('pylon', 'government', 'engineer', 'column', 'research', 'monitor');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_offerings_items_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__services_v_version_offerings_items_accent" AS ENUM('brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum__services_v_version_hero_background" AS ENUM('brand-600', 'brand-700', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum__services_v_version_values_columns" AS ENUM('5', '6');
  CREATE TYPE "public"."enum__services_v_version_cta_background" AS ENUM('brand-600', 'brand-700', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum__services_v_version_cta_collage" AS ENUM('wind', 'thermalpower', 'biz');
  CREATE TYPE "public"."enum__services_v_version_cta_card_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__services_v_version_cta_card_icon_tone" AS ENUM('brand-500', 'brand-600', 'brand-700', 'brand-800');
  CREATE TYPE "public"."enum__services_v_version_cta_card_frame" AS ENUM('brand-500', 'brand-600');
  CREATE TYPE "public"."enum__services_v_version_navigation_icon" AS ENUM('pylon', 'government', 'engineer', 'column', 'research', 'monitor');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_tools_role" AS ENUM('maintainer', 'co-maintainer', 'maintainers');
  CREATE TYPE "public"."enum_tool_categories_tone" AS ENUM('brand', 'brand-700', 'neutral-900', 'neutral-700', 'brand-900');
  CREATE TYPE "public"."enum_cta_banners_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_cta_banners_tone" AS ENUM('brand-600', 'brand-700', 'brand-800', 'brand-900', 'light');
  CREATE TYPE "public"."enum_cta_banners_collage" AS ENUM('wind', 'thermalpower', 'biz');
  CREATE TYPE "public"."enum_events_poster_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_poster_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_redirects_status_code" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_team_members_social_links_kind" AS ENUM('email', 'github', 'linkedin', 'message');
  CREATE TYPE "public"."enum_team_members_glow" AS ENUM('center', 'right');
  CREATE TYPE "public"."enum_departments_detail_topics_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_departments_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_departments_accent" AS ENUM('red', 'dark-red', 'charcoal', 'plum');
  CREATE TYPE "public"."enum_departments_detail_hero_background" AS ENUM('brand-600', 'brand-900', 'neutral-900');
  CREATE TYPE "public"."enum_departments_detail_hero_ornament" AS ENUM('department', 'department-inverse');
  CREATE TYPE "public"."enum_departments_detail_mobile_column" AS ENUM('326', '332');
  CREATE TYPE "public"."enum_departments_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__departments_v_version_detail_topics_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__departments_v_version_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__departments_v_version_accent" AS ENUM('red', 'dark-red', 'charcoal', 'plum');
  CREATE TYPE "public"."enum__departments_v_version_detail_hero_background" AS ENUM('brand-600', 'brand-900', 'neutral-900');
  CREATE TYPE "public"."enum__departments_v_version_detail_hero_ornament" AS ENUM('department', 'department-inverse');
  CREATE TYPE "public"."enum__departments_v_version_detail_mobile_column" AS ENUM('326', '332');
  CREATE TYPE "public"."enum__departments_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__departments_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_countries_continent" AS ENUM('africa', 'antarctica', 'asia', 'europe', 'north-america', 'south-america', 'oceania');
  CREATE TYPE "public"."enum_partners_group" AS ENUM('trusted-partner', 'network-affiliation');
  CREATE TYPE "public"."enum_jobs_theme" AS ENUM('finance', 'people-and-culture', 'software-engineering', 'research-and-market-development', 'modeling-tools-and-data', 'energy-system-modeling', 'grid-data', 'miscellaneous');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_home_page_intro_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_home_page_stats_icon" AS ENUM('blueprint', 'handshake', 'employees', 'world', 'folder-edit', 'license');
  CREATE TYPE "public"."enum_site_header_blocks_link_group_desktop" AS ENUM('menu', 'hidden');
  CREATE TYPE "public"."enum_site_header_blocks_link_group_mobile" AS ENUM('menu', 'link', 'hidden');
  CREATE TYPE "public"."enum_site_settings_social_links_kind" AS ENUM('linkedin', 'github', 'x', 'youtube', 'bluesky', 'mastodon');
  CREATE TYPE "public"."enum_services_page_cta_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_about_page_intro_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_departments_page_hero_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_team_page_hero_stats_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_team_page_hero_stats_tone" AS ENUM('brand', 'light');
  CREATE TYPE "public"."enum_team_page_intro_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_partners_page_hero_stats_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_partners_page_hero_stats_tone" AS ENUM('brand', 'light');
  CREATE TYPE "public"."enum_career_page_hiring_steps_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_career_page_hero_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum_theory_of_change_page_outcomes_columns_icon" AS ENUM('medical-star', 'employees', 'referral-alt', 'book-open-reader');
  CREATE TYPE "public"."enum_theory_of_change_page_outcomes_columns_tone" AS ENUM('brand-400', 'brand-500', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum_theory_of_change_page_globe_pins_icon" AS ENUM('code-merge', 'code-fork', 'people-group', 'link-horizontal', 'box-connection', 'tools');
  CREATE TABLE "projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_link_groups_links_parts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"underline" boolean DEFAULT false
  );
  
  CREATE TABLE "projects_link_groups_links_parts_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_link_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"truncate" boolean DEFAULT false,
  	"new_tab" boolean DEFAULT false,
  	"disabled" boolean DEFAULT false
  );
  
  CREATE TABLE "projects_link_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_link_groups_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"emphasis" "enum_projects_cta_actions_emphasis"
  );
  
  CREATE TABLE "projects_cta_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"project_status" "enum_projects_project_status",
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"thumbnail_id" integer,
  	"frame" "enum_projects_frame",
  	"partner_tag_id" integer,
  	"partner_link_href" varchar,
  	"region_id" integer,
  	"hero_id" integer,
  	"body_html" varchar,
  	"testimonial_id" integer,
  	"contact_kind" "enum_projects_contact_kind",
  	"contact_member_id" integer,
  	"contact_name" varchar,
  	"contact_photo_id" integer,
  	"contact_profile_href" varchar,
  	"contact_github_href" varchar,
  	"contact_linkedin_href" varchar,
  	"cta_service_id" integer,
  	"home_show_on_home" boolean DEFAULT false,
  	"home_order" numeric,
  	"home_title_lines" "enum_projects_home_title_lines",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"partner_link_label" varchar,
  	"body" jsonb,
  	"contact_role" varchar,
  	"contact_title" varchar,
  	"cta_heading" varchar,
  	"cta_primary" varchar,
  	"cta_secondary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"tools_id" integer,
  	"services_id" integer,
  	"departments_id" integer,
  	"projects_id" integer,
  	"partners_id" integer
  );
  
  CREATE TABLE "_projects_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_link_groups_links_parts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"underline" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_link_groups_links_parts_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_link_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"truncate" boolean DEFAULT false,
  	"new_tab" boolean DEFAULT false,
  	"disabled" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_link_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_link_groups_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"emphasis" "enum__projects_v_version_cta_actions_emphasis",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_cta_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_project_status" "enum__projects_v_version_project_status",
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_thumbnail_id" integer,
  	"version_frame" "enum__projects_v_version_frame",
  	"version_partner_tag_id" integer,
  	"version_partner_link_href" varchar,
  	"version_region_id" integer,
  	"version_hero_id" integer,
  	"version_body_html" varchar,
  	"version_testimonial_id" integer,
  	"version_contact_kind" "enum__projects_v_version_contact_kind",
  	"version_contact_member_id" integer,
  	"version_contact_name" varchar,
  	"version_contact_photo_id" integer,
  	"version_contact_profile_href" varchar,
  	"version_contact_github_href" varchar,
  	"version_contact_linkedin_href" varchar,
  	"version_cta_service_id" integer,
  	"version_home_show_on_home" boolean DEFAULT false,
  	"version_home_order" numeric,
  	"version_home_title_lines" "enum__projects_v_version_home_title_lines",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_partner_link_label" varchar,
  	"version_body" jsonb,
  	"version_contact_role" varchar,
  	"version_contact_title" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_primary" varchar,
  	"version_cta_secondary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"tools_id" integer,
  	"services_id" integer,
  	"departments_id" integer,
  	"projects_id" integer,
  	"partners_id" integer
  );
  
  CREATE TABLE "publications_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_publications_authors_kind",
  	"member_id" integer,
  	"name" varchar,
  	"photo_id" integer,
  	"profile_href" varchar,
  	"github_href" varchar,
  	"linkedin_href" varchar
  );
  
  CREATE TABLE "publications_authors_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "publications_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum_publications_blocks_stats_items_icon"
  );
  
  CREATE TABLE "publications_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "publications_blocks_stats_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "publications_link_groups_links_parts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"underline" boolean DEFAULT false
  );
  
  CREATE TABLE "publications_link_groups_links_parts_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications_link_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"truncate" boolean DEFAULT false,
  	"new_tab" boolean DEFAULT false,
  	"disabled" boolean DEFAULT false
  );
  
  CREATE TABLE "publications_link_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "publications_link_groups_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"emphasis" "enum_publications_cta_actions_emphasis"
  );
  
  CREATE TABLE "publications_cta_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"type" "enum_publications_type",
  	"category_id" integer,
  	"date" timestamp(3) with time zone,
  	"preprint" boolean DEFAULT false,
  	"thumbnail_id" integer,
  	"frame" "enum_publications_frame",
  	"show_in_outputs" boolean DEFAULT false,
  	"region_id" integer,
  	"hero_id" integer,
  	"cta_service_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "publications_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"highlight" varchar,
  	"citation" varchar,
  	"cta_heading" varchar,
  	"cta_primary" varchar,
  	"cta_secondary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "_publications_v_version_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__publications_v_version_authors_kind",
  	"member_id" integer,
  	"name" varchar,
  	"photo_id" integer,
  	"profile_href" varchar,
  	"github_href" varchar,
  	"linkedin_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v_version_authors_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_publications_v_blocks_rich_text_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum__publications_v_blocks_stats_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_publications_v_blocks_stats_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_publications_v_version_link_groups_links_parts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"underline" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v_version_link_groups_links_parts_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_version_link_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"truncate" boolean DEFAULT false,
  	"new_tab" boolean DEFAULT false,
  	"disabled" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v_version_link_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v_version_link_groups_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_version_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"emphasis" "enum__publications_v_version_cta_actions_emphasis",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_publications_v_version_cta_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_type" "enum__publications_v_version_type",
  	"version_category_id" integer,
  	"version_date" timestamp(3) with time zone,
  	"version_preprint" boolean DEFAULT false,
  	"version_thumbnail_id" integer,
  	"version_frame" "enum__publications_v_version_frame",
  	"version_show_in_outputs" boolean DEFAULT false,
  	"version_region_id" integer,
  	"version_hero_id" integer,
  	"version_cta_service_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__publications_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_publications_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_highlight" varchar,
  	"version_citation" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_primary" varchar,
  	"version_cta_secondary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "testimonials_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"portrait_id" integer NOT NULL,
  	"company" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "regions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "regions_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publication_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publication_categories_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_paragraph_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_offerings_items_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_offerings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_offerings_items_icon",
  	"accent" "enum_services_offerings_items_accent",
  	"link_href" varchar
  );
  
  CREATE TABLE "services_offerings_items_locales" (
  	"title" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer,
  	"thumbnail_mobile_id" integer
  );
  
  CREATE TABLE "services_values_items_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_approach_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_card_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_cta_card_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_home_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric,
  	"hero_image_id" integer,
  	"hero_image_mobile_id" integer,
  	"hero_background" "enum_services_hero_background",
  	"intro_image_id" integer,
  	"values_columns" "enum_services_values_columns",
  	"approach_show" boolean DEFAULT false,
  	"cta_background" "enum_services_cta_background",
  	"cta_collage" "enum_services_cta_collage",
  	"card_image_id" integer,
  	"card_image_mobile_id" integer,
  	"cta_card_icon" "enum_services_cta_card_icon",
  	"cta_card_icon_tone" "enum_services_cta_card_icon_tone",
  	"cta_card_frame" "enum_services_cta_card_frame",
  	"cta_card_image_id" integer,
  	"cta_card_image_mobile_id" integer,
  	"home_image_id" integer,
  	"navigation_icon" "enum_services_navigation_icon",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"name" varchar,
  	"hero_title" varchar,
  	"hero_title_mobile" varchar,
  	"hero_lead" varchar,
  	"intro_tag" varchar,
  	"intro_title" varchar,
  	"offerings_tag" varchar,
  	"offerings_title" varchar,
  	"values_tag" varchar,
  	"values_title" varchar,
  	"approach_tag" varchar,
  	"approach_title" varchar,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"card_title" varchar,
  	"card_link_label" varchar,
  	"cta_card_title" varchar,
  	"cta_card_link_label" varchar,
  	"home_title" varchar,
  	"navigation_label" varchar,
  	"navigation_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_paragraph_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_version_offerings_items_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_offerings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__services_v_version_offerings_items_icon",
  	"accent" "enum__services_v_version_offerings_items_accent",
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_offerings_items_locales" (
  	"title" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer,
  	"thumbnail_mobile_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_values_items_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_approach_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_card_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_cta_card_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_home_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric,
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_hero_background" "enum__services_v_version_hero_background",
  	"version_intro_image_id" integer,
  	"version_values_columns" "enum__services_v_version_values_columns",
  	"version_approach_show" boolean DEFAULT false,
  	"version_cta_background" "enum__services_v_version_cta_background",
  	"version_cta_collage" "enum__services_v_version_cta_collage",
  	"version_card_image_id" integer,
  	"version_card_image_mobile_id" integer,
  	"version_cta_card_icon" "enum__services_v_version_cta_card_icon",
  	"version_cta_card_icon_tone" "enum__services_v_version_cta_card_icon_tone",
  	"version_cta_card_frame" "enum__services_v_version_cta_card_frame",
  	"version_cta_card_image_id" integer,
  	"version_cta_card_image_mobile_id" integer,
  	"version_home_image_id" integer,
  	"version_navigation_icon" "enum__services_v_version_navigation_icon",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_name" varchar,
  	"version_hero_title" varchar,
  	"version_hero_title_mobile" varchar,
  	"version_hero_lead" varchar,
  	"version_intro_tag" varchar,
  	"version_intro_title" varchar,
  	"version_offerings_tag" varchar,
  	"version_offerings_title" varchar,
  	"version_values_tag" varchar,
  	"version_values_title" varchar,
  	"version_approach_tag" varchar,
  	"version_approach_title" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_card_title" varchar,
  	"version_card_link_label" varchar,
  	"version_cta_card_title" varchar,
  	"version_cta_card_link_label" varchar,
  	"version_home_title" varchar,
  	"version_navigation_label" varchar,
  	"version_navigation_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_tools_role",
  	"source_href" varchar NOT NULL,
  	"website_href" varchar NOT NULL,
  	"github_href" varchar NOT NULL,
  	"order" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tools_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tool_categories_id" integer
  );
  
  CREATE TABLE "tool_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum_tool_categories_tone" NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tool_categories_locales" (
  	"label" varchar NOT NULL,
  	"tab_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cta_banners_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"emphasis" "enum_cta_banners_actions_emphasis" NOT NULL,
  	"new_tab" boolean DEFAULT false NOT NULL
  );
  
  CREATE TABLE "cta_banners_actions_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cta_banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"tone" "enum_cta_banners_tone" NOT NULL,
  	"collage" "enum_cta_banners_collage" NOT NULL,
  	"breakout" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cta_banners_locales" (
  	"heading" varchar NOT NULL,
  	"lead" varchar,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_blocks_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"member_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_external" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_external_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "events_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"type_id" integer,
  	"description_html" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"time_zone" varchar,
  	"published_at" timestamp(3) with time zone,
  	"registration_closes_at" timestamp(3) with time zone,
  	"featured_as_highlight" boolean DEFAULT false,
  	"map_href" varchar,
  	"calendar_href" varchar,
  	"join_href" varchar,
  	"poster_id" integer,
  	"poster_fit" "enum_events_poster_fit",
  	"highlight_image_id" integer,
  	"highlight_video_embed_url" varchar,
  	"highlight_video_watch_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"brief" varchar,
  	"description" jsonb,
  	"location_region" varchar,
  	"location_address" varchar,
  	"highlight_video_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_blocks_member" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_external" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_external_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_type_id" integer,
  	"version_description_html" varchar,
  	"version_start" timestamp(3) with time zone,
  	"version_end" timestamp(3) with time zone,
  	"version_time_zone" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_registration_closes_at" timestamp(3) with time zone,
  	"version_featured_as_highlight" boolean DEFAULT false,
  	"version_map_href" varchar,
  	"version_calendar_href" varchar,
  	"version_join_href" varchar,
  	"version_poster_id" integer,
  	"version_poster_fit" "enum__events_v_version_poster_fit",
  	"version_highlight_image_id" integer,
  	"version_highlight_video_embed_url" varchar,
  	"version_highlight_video_watch_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_brief" varchar,
  	"version_description" jsonb,
  	"version_location_region" varchar,
  	"version_location_address" varchar,
  	"version_highlight_video_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "event_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "event_types_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"body_html" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"tag" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_body_html" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_tag" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"status_code" "enum_redirects_status_code" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form" varchar NOT NULL,
  	"locale" varchar NOT NULL,
  	"payload" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_team_members_social_links_kind" NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"country_id" integer,
  	"profile_href" varchar NOT NULL,
  	"portrait_id" integer NOT NULL,
  	"portrait_desktop_x" numeric NOT NULL,
  	"portrait_desktop_y" numeric NOT NULL,
  	"portrait_desktop_width" numeric NOT NULL,
  	"portrait_desktop_height" numeric NOT NULL,
  	"portrait_mobile_x" numeric NOT NULL,
  	"portrait_mobile_y" numeric NOT NULL,
  	"portrait_mobile_width" numeric NOT NULL,
  	"portrait_mobile_height" numeric NOT NULL,
  	"portrait_rotation" numeric NOT NULL,
  	"glow" "enum_team_members_glow" NOT NULL,
  	"senior_leadership" boolean,
  	"order" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"role" varchar NOT NULL,
  	"profile_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "departments_detail_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_departments_detail_topics_icon"
  );
  
  CREATE TABLE "departments_detail_topics_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "departments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"head_id" integer,
  	"icon" "enum_departments_icon",
  	"accent" "enum_departments_accent",
  	"team_order" numeric,
  	"detail_card_image_desktop_id" integer,
  	"detail_card_image_mobile_id" integer,
  	"detail_hero_image_desktop_id" integer,
  	"detail_hero_image_mobile_id" integer,
  	"detail_hero_people_count" varchar,
  	"detail_hero_background" "enum_departments_detail_hero_background",
  	"detail_hero_ornament" "enum_departments_detail_hero_ornament",
  	"detail_about_html" varchar,
  	"detail_works_intro_html" varchar,
  	"detail_works_outro_html" varchar,
  	"detail_mobile_column" "enum_departments_detail_mobile_column",
  	"slug" varchar,
  	"has_detail_page" boolean,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_departments_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "departments_locales" (
  	"name" varchar,
  	"lead" varchar,
  	"summary" varchar,
  	"team_label" varchar,
  	"detail_hero_title" varchar,
  	"detail_hero_lead" varchar,
  	"detail_about" jsonb,
  	"detail_works_intro" jsonb,
  	"detail_works_outro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_departments_v_version_detail_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__departments_v_version_detail_topics_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_departments_v_version_detail_topics_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_departments_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_head_id" integer,
  	"version_icon" "enum__departments_v_version_icon",
  	"version_accent" "enum__departments_v_version_accent",
  	"version_team_order" numeric,
  	"version_detail_card_image_desktop_id" integer,
  	"version_detail_card_image_mobile_id" integer,
  	"version_detail_hero_image_desktop_id" integer,
  	"version_detail_hero_image_mobile_id" integer,
  	"version_detail_hero_people_count" varchar,
  	"version_detail_hero_background" "enum__departments_v_version_detail_hero_background",
  	"version_detail_hero_ornament" "enum__departments_v_version_detail_hero_ornament",
  	"version_detail_about_html" varchar,
  	"version_detail_works_intro_html" varchar,
  	"version_detail_works_outro_html" varchar,
  	"version_detail_mobile_column" "enum__departments_v_version_detail_mobile_column",
  	"version_slug" varchar,
  	"version_has_detail_page" boolean,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__departments_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__departments_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_departments_v_locales" (
  	"version_name" varchar,
  	"version_lead" varchar,
  	"version_summary" varchar,
  	"version_team_label" varchar,
  	"version_detail_hero_title" varchar,
  	"version_detail_hero_lead" varchar,
  	"version_detail_about" jsonb,
  	"version_detail_works_intro" jsonb,
  	"version_detail_works_outro" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"continent" "enum_countries_continent",
  	"longitude" numeric NOT NULL,
  	"latitude" numeric NOT NULL,
  	"teammates" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"website" varchar,
  	"group" "enum_partners_group",
  	"is_funder" boolean,
  	"is_partner" boolean,
  	"show_on_partners_page" boolean,
  	"show_on_home" boolean,
  	"order" numeric,
  	"home_order" numeric,
  	"logo_id" integer,
  	"logo_desktop_width" numeric,
  	"logo_desktop_height" numeric,
  	"logo_mobile_width" numeric,
  	"logo_mobile_height" numeric,
  	"tag_logo_id" integer,
  	"tag_size_width" numeric,
  	"tag_size_height" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"theme" "enum_jobs_theme" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs_locales" (
  	"title" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"languages" varchar NOT NULL,
  	"work_mode" varchar NOT NULL,
  	"employment_type" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"publications_id" integer,
  	"testimonials_id" integer,
  	"regions_id" integer,
  	"tags_id" integer,
  	"publication_categories_id" integer,
  	"services_id" integer,
  	"tools_id" integer,
  	"tool_categories_id" integer,
  	"cta_banners_id" integer,
  	"events_id" integer,
  	"event_types_id" integer,
  	"pages_id" integer,
  	"redirects_id" integer,
  	"form_submissions_id" integer,
  	"team_members_id" integer,
  	"departments_id" integer,
  	"countries_id" integer,
  	"partners_id" integer,
  	"jobs_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_mobile_id" integer NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"pattern_image_id" integer NOT NULL,
  	"pattern_left" numeric NOT NULL,
  	"pattern_top" numeric NOT NULL
  );
  
  CREATE TABLE "home_page_hero_slides_locales" (
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"statement" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_intro_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_home_page_intro_actions_variant" NOT NULL,
  	"arrow" boolean DEFAULT false NOT NULL
  );
  
  CREATE TABLE "home_page_intro_actions_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon" "enum_home_page_stats_icon" NOT NULL
  );
  
  CREATE TABLE "home_page_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_tools_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_tools_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"width" numeric NOT NULL,
  	"height" numeric NOT NULL
  );
  
  CREATE TABLE "home_page_steps_items_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_steps_items_locales" (
  	"title" varchar NOT NULL,
  	"note" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_primary_action_href" varchar NOT NULL,
  	"hero_secondary_action_href" varchar NOT NULL,
  	"intro_image_id" integer NOT NULL,
  	"tools_action_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_primary_action_label" varchar NOT NULL,
  	"hero_secondary_action_label" varchar NOT NULL,
  	"intro_tag" varchar NOT NULL,
  	"intro_title" varchar NOT NULL,
  	"services_tag" varchar NOT NULL,
  	"services_title" varchar NOT NULL,
  	"tools_tag" varchar NOT NULL,
  	"tools_title" varchar NOT NULL,
  	"tools_action_label" varchar NOT NULL,
  	"steps_tag" varchar NOT NULL,
  	"steps_title" varchar NOT NULL,
  	"partners_trusted_partners_label" varchar NOT NULL,
  	"partners_networks_label" varchar NOT NULL,
  	"projects_tag" varchar NOT NULL,
  	"projects_title" varchar NOT NULL,
  	"projects_carousel_label" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_header_blocks_link_group_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_header_blocks_link_group_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_header_blocks_link_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop" "enum_site_header_blocks_link_group_desktop" DEFAULT 'menu' NOT NULL,
  	"mobile" "enum_site_header_blocks_link_group_mobile" DEFAULT 'menu' NOT NULL,
  	"mobile_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_header_blocks_link_group_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_header_blocks_services_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"more_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_header_blocks_services_group_locales" (
  	"label" varchar NOT NULL,
  	"more_label" varchar NOT NULL,
  	"more_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_header_locales" (
  	"contact_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_footer_cta_headline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_blocks_link_column_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_blocks_link_column_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_blocks_link_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_footer_blocks_link_column_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_blocks_services_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_footer_blocks_services_column_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_legal_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_action_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_footer_locales" (
  	"cta_action_label" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"consent_label" varchar NOT NULL,
  	"consent_label_compact" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_site_settings_social_links_kind" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"google_tag_manager_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "success_stories_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "success_stories_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_link_label" varchar NOT NULL,
  	"listing_title" varchar NOT NULL,
  	"listing_description" varchar NOT NULL,
  	"listing_tabs_completed" varchar NOT NULL,
  	"listing_tabs_in_progress" varchar NOT NULL,
  	"testimonials_heading" varchar NOT NULL,
  	"testimonials_subline" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "success_stories_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "publications_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "publications_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_chips_academic" varchar NOT NULL,
  	"hero_chips_blogs" varchar NOT NULL,
  	"hero_chips_policy_briefs" varchar NOT NULL,
  	"hero_chips_reports" varchar NOT NULL,
  	"listing_title" varchar NOT NULL,
  	"listing_tabs_academic" varchar NOT NULL,
  	"listing_tabs_blogs" varchar NOT NULL,
  	"listing_tabs_policy_briefs" varchar NOT NULL,
  	"listing_tabs_reports" varchar NOT NULL,
  	"outputs_title" varchar NOT NULL,
  	"outputs_description" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_page_intro_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "services_page_approach_steps_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"thumbnail_mobile_id" integer NOT NULL
  );
  
  CREATE TABLE "services_page_values_items_locales" (
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"emphasis" "enum_services_page_cta_actions_emphasis" NOT NULL,
  	"new_tab" boolean DEFAULT false NOT NULL
  );
  
  CREATE TABLE "services_page_cta_actions_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"approach_illustration_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_link_label" varchar NOT NULL,
  	"intro_tag" varchar NOT NULL,
  	"intro_title" varchar NOT NULL,
  	"approach_tag" varchar NOT NULL,
  	"approach_title" varchar NOT NULL,
  	"values_tag" varchar NOT NULL,
  	"values_title" varchar NOT NULL,
  	"cta_heading" varchar NOT NULL,
  	"cta_text" varchar NOT NULL,
  	"detail_eyebrow" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_page_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tools_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"cta_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tools_page_locales" (
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_link_label" varchar NOT NULL,
  	"intro_title" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_events_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"cta_support_id" integer NOT NULL,
  	"cta_discuss_id" integer NOT NULL,
  	"cta_updates_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "news_events_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_link_label" varchar NOT NULL,
  	"listing_title" varchar NOT NULL,
  	"listing_description" varchar NOT NULL,
  	"listing_state_labels_all" varchar NOT NULL,
  	"listing_state_labels_highlighted" varchar NOT NULL,
  	"listing_state_labels_upcoming" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_hero_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_intro_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_about_page_intro_actions_variant" NOT NULL,
  	"arrow" boolean
  );
  
  CREATE TABLE "about_page_intro_actions_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_info_cards_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"action_href" varchar
  );
  
  CREATE TABLE "about_page_info_cards_locales" (
  	"title" varchar NOT NULL,
  	"action_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"thumbnail_mobile_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_values_items_locales" (
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_desktop_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"intro_statement" varchar NOT NULL,
  	"departments_tag" varchar NOT NULL,
  	"departments_title" varchar NOT NULL,
  	"values_tag" varchar NOT NULL,
  	"values_title" varchar NOT NULL,
  	"values_subline" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "departments_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_desktop_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"hero_count_value" varchar NOT NULL,
  	"hero_icon" "enum_departments_page_hero_icon" NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "departments_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_lead" varchar NOT NULL,
  	"hero_count_label" varchar NOT NULL,
  	"listing_tag" varchar NOT NULL,
  	"listing_title" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_page_hero_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "team_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon" "enum_team_page_hero_stats_icon" NOT NULL,
  	"tone" "enum_team_page_hero_stats_tone" NOT NULL
  );
  
  CREATE TABLE "team_page_hero_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "team_page_intro_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_team_page_intro_actions_variant" NOT NULL,
  	"arrow" boolean
  );
  
  CREATE TABLE "team_page_intro_actions_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "team_page_continents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "team_page_continents_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "team_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_desktop_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"globe_view_longitude" numeric NOT NULL,
  	"globe_view_latitude" numeric NOT NULL,
  	"globe_selected_country_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "team_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"intro_tag" varchar NOT NULL,
  	"intro_title" varchar NOT NULL,
  	"intro_subline" varchar NOT NULL,
  	"continents_label" varchar NOT NULL,
  	"listing_title" varchar NOT NULL,
  	"listing_mobile_description" varchar NOT NULL,
  	"listing_senior_leadership_label" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"icon" "enum_partners_page_hero_stats_icon" NOT NULL,
  	"tone" "enum_partners_page_hero_stats_tone" NOT NULL
  );
  
  CREATE TABLE "partners_page_hero_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "partners_page_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "partners_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_desktop_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partners_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"intro_statement" varchar NOT NULL,
  	"filter_funders_label" varchar NOT NULL,
  	"filter_partners_label" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "career_page_hero_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "career_page_roles_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_html" varchar
  );
  
  CREATE TABLE "career_page_roles_columns_locales" (
  	"text" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "career_page_hiring_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "career_page_hiring_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_career_page_hiring_steps_icon" NOT NULL
  );
  
  CREATE TABLE "career_page_hiring_steps_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "career_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_desktop_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"hero_icon" "enum_career_page_hero_icon" NOT NULL,
  	"hero_count_value" varchar NOT NULL,
  	"hero_action_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "career_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_count_label" varchar NOT NULL,
  	"hero_action_label" varchar NOT NULL,
  	"roles_tag" varchar NOT NULL,
  	"roles_title" varchar NOT NULL,
  	"hiring_title" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_hero_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_hero_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_scene_challenge_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_scene_goal_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_scene_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "theory_of_change_page_approach_steps_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_outcomes_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_theory_of_change_page_outcomes_columns_icon" NOT NULL,
  	"tone" "enum_theory_of_change_page_outcomes_columns_tone" NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_outcomes_columns_locales" (
  	"output" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"outcome" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page_globe_pins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_theory_of_change_page_globe_pins_icon" NOT NULL,
  	"longitude" numeric NOT NULL,
  	"latitude" numeric NOT NULL,
  	"scale" numeric NOT NULL
  );
  
  CREATE TABLE "theory_of_change_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_desktop_id" integer NOT NULL,
  	"hero_image_mobile_id" integer NOT NULL,
  	"globe_view_longitude" numeric NOT NULL,
  	"globe_view_latitude" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "theory_of_change_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"scene_challenge_label" varchar NOT NULL,
  	"scene_challenge_statement" varchar NOT NULL,
  	"scene_challenge_emphasis" varchar,
  	"scene_goal_label" varchar NOT NULL,
  	"scene_goal_statement" varchar NOT NULL,
  	"scene_goal_emphasis" varchar,
  	"approach_mobile_tag" varchar NOT NULL,
  	"approach_title" varchar NOT NULL,
  	"approach_subline" varchar NOT NULL,
  	"outcomes_title" varchar NOT NULL,
  	"impact_title" varchar NOT NULL,
  	"impact_text" varchar NOT NULL,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "projects_highlights" ADD CONSTRAINT "projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_link_groups_links_parts" ADD CONSTRAINT "projects_link_groups_links_parts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_link_groups_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_link_groups_links_parts_locales" ADD CONSTRAINT "projects_link_groups_links_parts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_link_groups_links_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_link_groups_links" ADD CONSTRAINT "projects_link_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_link_groups" ADD CONSTRAINT "projects_link_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_link_groups_locales" ADD CONSTRAINT "projects_link_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_cta_actions" ADD CONSTRAINT "projects_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_cta_actions_locales" ADD CONSTRAINT "projects_cta_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_cta_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_partner_tag_id_partners_id_fk" FOREIGN KEY ("partner_tag_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_contact_member_id_team_members_id_fk" FOREIGN KEY ("contact_member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_contact_photo_id_media_id_fk" FOREIGN KEY ("contact_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cta_service_id_services_id_fk" FOREIGN KEY ("cta_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights" ADD CONSTRAINT "_projects_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_link_groups_links_parts" ADD CONSTRAINT "_projects_v_version_link_groups_links_parts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_link_groups_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_link_groups_links_parts_locales" ADD CONSTRAINT "_projects_v_version_link_groups_links_parts_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_link_groups_links_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_link_groups_links" ADD CONSTRAINT "_projects_v_version_link_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_link_groups" ADD CONSTRAINT "_projects_v_version_link_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_link_groups_locales" ADD CONSTRAINT "_projects_v_version_link_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_cta_actions" ADD CONSTRAINT "_projects_v_version_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_cta_actions_locales" ADD CONSTRAINT "_projects_v_version_cta_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_cta_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_partner_tag_id_partners_id_fk" FOREIGN KEY ("version_partner_tag_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_region_id_regions_id_fk" FOREIGN KEY ("version_region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_id_media_id_fk" FOREIGN KEY ("version_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_contact_member_id_team_members_id_fk" FOREIGN KEY ("version_contact_member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_contact_photo_id_media_id_fk" FOREIGN KEY ("version_contact_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cta_service_id_services_id_fk" FOREIGN KEY ("version_cta_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_authors" ADD CONSTRAINT "publications_authors_member_id_team_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_authors" ADD CONSTRAINT "publications_authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_authors" ADD CONSTRAINT "publications_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_authors_locales" ADD CONSTRAINT "publications_authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_rich_text" ADD CONSTRAINT "publications_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_rich_text_locales" ADD CONSTRAINT "publications_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_stats_items" ADD CONSTRAINT "publications_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_stats_items_locales" ADD CONSTRAINT "publications_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_stats" ADD CONSTRAINT "publications_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_stats_locales" ADD CONSTRAINT "publications_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_blocks_image" ADD CONSTRAINT "publications_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_blocks_image" ADD CONSTRAINT "publications_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_link_groups_links_parts" ADD CONSTRAINT "publications_link_groups_links_parts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_link_groups_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_link_groups_links_parts_locales" ADD CONSTRAINT "publications_link_groups_links_parts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_link_groups_links_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_link_groups_links" ADD CONSTRAINT "publications_link_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_link_groups" ADD CONSTRAINT "publications_link_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_link_groups_locales" ADD CONSTRAINT "publications_link_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_cta_actions" ADD CONSTRAINT "publications_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_cta_actions_locales" ADD CONSTRAINT "publications_cta_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_cta_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_category_id_publication_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."publication_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_hero_id_media_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_cta_service_id_services_id_fk" FOREIGN KEY ("cta_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_authors" ADD CONSTRAINT "_publications_v_version_authors_member_id_team_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_version_authors" ADD CONSTRAINT "_publications_v_version_authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_version_authors" ADD CONSTRAINT "_publications_v_version_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_authors_locales" ADD CONSTRAINT "_publications_v_version_authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_rich_text" ADD CONSTRAINT "_publications_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_rich_text_locales" ADD CONSTRAINT "_publications_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_stats_items" ADD CONSTRAINT "_publications_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_stats_items_locales" ADD CONSTRAINT "_publications_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_stats" ADD CONSTRAINT "_publications_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_stats_locales" ADD CONSTRAINT "_publications_v_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_image" ADD CONSTRAINT "_publications_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_blocks_image" ADD CONSTRAINT "_publications_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_link_groups_links_parts" ADD CONSTRAINT "_publications_v_version_link_groups_links_parts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_link_groups_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_link_groups_links_parts_locales" ADD CONSTRAINT "_publications_v_version_link_groups_links_parts_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_link_groups_links_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_link_groups_links" ADD CONSTRAINT "_publications_v_version_link_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_link_groups" ADD CONSTRAINT "_publications_v_version_link_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_link_groups_locales" ADD CONSTRAINT "_publications_v_version_link_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_cta_actions" ADD CONSTRAINT "_publications_v_version_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_version_cta_actions_locales" ADD CONSTRAINT "_publications_v_version_cta_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v_version_cta_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_category_id_publication_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."publication_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_region_id_regions_id_fk" FOREIGN KEY ("version_region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_hero_id_media_id_fk" FOREIGN KEY ("version_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_cta_service_id_services_id_fk" FOREIGN KEY ("version_cta_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_paragraphs" ADD CONSTRAINT "testimonials_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regions_locales" ADD CONSTRAINT "regions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publication_categories_locales" ADD CONSTRAINT "publication_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publication_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_intro_paragraphs" ADD CONSTRAINT "services_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_paragraph" ADD CONSTRAINT "services_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_paragraph_locales" ADD CONSTRAINT "services_blocks_paragraph_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_paragraph"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_list_items" ADD CONSTRAINT "services_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_list" ADD CONSTRAINT "services_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_offerings_items_deliverables" ADD CONSTRAINT "services_offerings_items_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_offerings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_offerings_items" ADD CONSTRAINT "services_offerings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_offerings_items_locales" ADD CONSTRAINT "services_offerings_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_offerings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_values_items" ADD CONSTRAINT "services_values_items_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_values_items" ADD CONSTRAINT "services_values_items_thumbnail_mobile_id_media_id_fk" FOREIGN KEY ("thumbnail_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_values_items" ADD CONSTRAINT "services_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_values_items_locales" ADD CONSTRAINT "services_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_approach_paragraphs" ADD CONSTRAINT "services_approach_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_card_paragraphs" ADD CONSTRAINT "services_card_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_cta_card_paragraphs" ADD CONSTRAINT "services_cta_card_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_home_paragraphs" ADD CONSTRAINT "services_home_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_card_image_mobile_id_media_id_fk" FOREIGN KEY ("card_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cta_card_image_id_media_id_fk" FOREIGN KEY ("cta_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_cta_card_image_mobile_id_media_id_fk" FOREIGN KEY ("cta_card_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_home_image_id_media_id_fk" FOREIGN KEY ("home_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_intro_paragraphs" ADD CONSTRAINT "_services_v_version_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_paragraph" ADD CONSTRAINT "_services_v_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_paragraph_locales" ADD CONSTRAINT "_services_v_blocks_paragraph_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_paragraph"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_list_items" ADD CONSTRAINT "_services_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_list" ADD CONSTRAINT "_services_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_offerings_items_deliverables" ADD CONSTRAINT "_services_v_version_offerings_items_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_offerings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_offerings_items" ADD CONSTRAINT "_services_v_version_offerings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_offerings_items_locales" ADD CONSTRAINT "_services_v_version_offerings_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_offerings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_values_items" ADD CONSTRAINT "_services_v_version_values_items_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_values_items" ADD CONSTRAINT "_services_v_version_values_items_thumbnail_mobile_id_media_id_fk" FOREIGN KEY ("thumbnail_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_values_items" ADD CONSTRAINT "_services_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_values_items_locales" ADD CONSTRAINT "_services_v_version_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_approach_paragraphs" ADD CONSTRAINT "_services_v_version_approach_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_card_paragraphs" ADD CONSTRAINT "_services_v_version_card_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_cta_card_paragraphs" ADD CONSTRAINT "_services_v_version_cta_card_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_home_paragraphs" ADD CONSTRAINT "_services_v_version_home_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_intro_image_id_media_id_fk" FOREIGN KEY ("version_intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_card_image_id_media_id_fk" FOREIGN KEY ("version_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_card_image_mobile_id_media_id_fk" FOREIGN KEY ("version_card_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_cta_card_image_id_media_id_fk" FOREIGN KEY ("version_cta_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_cta_card_image_mobile_id_media_id_fk" FOREIGN KEY ("version_cta_card_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_home_image_id_media_id_fk" FOREIGN KEY ("version_home_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_description" ADD CONSTRAINT "tools_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_rels" ADD CONSTRAINT "tools_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_rels" ADD CONSTRAINT "tools_rels_tool_categories_fk" FOREIGN KEY ("tool_categories_id") REFERENCES "public"."tool_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tool_categories_locales" ADD CONSTRAINT "tool_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tool_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_banners_actions" ADD CONSTRAINT "cta_banners_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_banners_actions_locales" ADD CONSTRAINT "cta_banners_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_banners_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_banners_locales" ADD CONSTRAINT "cta_banners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_member" ADD CONSTRAINT "events_blocks_member_member_id_team_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_member" ADD CONSTRAINT "events_blocks_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_external" ADD CONSTRAINT "events_blocks_external_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_external" ADD CONSTRAINT "events_blocks_external_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_external_locales" ADD CONSTRAINT "events_blocks_external_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_external"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_gallery" ADD CONSTRAINT "events_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_gallery" ADD CONSTRAINT "events_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_type_id_event_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."event_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_highlight_image_id_media_id_fk" FOREIGN KEY ("highlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_member" ADD CONSTRAINT "_events_v_blocks_member_member_id_team_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_member" ADD CONSTRAINT "_events_v_blocks_member_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_external" ADD CONSTRAINT "_events_v_blocks_external_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_external" ADD CONSTRAINT "_events_v_blocks_external_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_external_locales" ADD CONSTRAINT "_events_v_blocks_external_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_external"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_gallery" ADD CONSTRAINT "_events_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_gallery" ADD CONSTRAINT "_events_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_type_id_event_types_id_fk" FOREIGN KEY ("version_type_id") REFERENCES "public"."event_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_poster_id_media_id_fk" FOREIGN KEY ("version_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_highlight_image_id_media_id_fk" FOREIGN KEY ("version_highlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_types_locales" ADD CONSTRAINT "event_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_social_links" ADD CONSTRAINT "team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_rels" ADD CONSTRAINT "team_members_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_rels" ADD CONSTRAINT "team_members_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_detail_topics" ADD CONSTRAINT "departments_detail_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_detail_topics_locales" ADD CONSTRAINT "departments_detail_topics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments_detail_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_head_id_team_members_id_fk" FOREIGN KEY ("head_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_detail_card_image_desktop_id_media_id_fk" FOREIGN KEY ("detail_card_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_detail_card_image_mobile_id_media_id_fk" FOREIGN KEY ("detail_card_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_detail_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("detail_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_detail_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("detail_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments_locales" ADD CONSTRAINT "departments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_v_version_detail_topics" ADD CONSTRAINT "_departments_v_version_detail_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_v_version_detail_topics_locales" ADD CONSTRAINT "_departments_v_version_detail_topics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_v_version_detail_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_parent_id_departments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_version_head_id_team_members_id_fk" FOREIGN KEY ("version_head_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_version_detail_card_image_desktop_id_media_id_fk" FOREIGN KEY ("version_detail_card_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_version_detail_card_image_mobile_id_media_id_fk" FOREIGN KEY ("version_detail_card_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_version_detail_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_detail_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v" ADD CONSTRAINT "_departments_v_version_detail_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_detail_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_v_locales" ADD CONSTRAINT "_departments_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries" ADD CONSTRAINT "countries_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_tag_logo_id_media_id_fk" FOREIGN KEY ("tag_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publication_categories_fk" FOREIGN KEY ("publication_categories_id") REFERENCES "public"."publication_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tool_categories_fk" FOREIGN KEY ("tool_categories_id") REFERENCES "public"."tool_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cta_banners_fk" FOREIGN KEY ("cta_banners_id") REFERENCES "public"."cta_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_types_fk" FOREIGN KEY ("event_types_id") REFERENCES "public"."event_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_pattern_image_id_media_id_fk" FOREIGN KEY ("pattern_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides" ADD CONSTRAINT "home_page_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_slides_locales" ADD CONSTRAINT "home_page_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_intro_paragraphs" ADD CONSTRAINT "home_page_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_intro_actions" ADD CONSTRAINT "home_page_intro_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_intro_actions_locales" ADD CONSTRAINT "home_page_intro_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_intro_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_stats" ADD CONSTRAINT "home_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_stats_locales" ADD CONSTRAINT "home_page_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_tools_paragraphs" ADD CONSTRAINT "home_page_tools_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_tools_logos" ADD CONSTRAINT "home_page_tools_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_tools_logos" ADD CONSTRAINT "home_page_tools_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_steps_items_paragraphs" ADD CONSTRAINT "home_page_steps_items_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_steps_items" ADD CONSTRAINT "home_page_steps_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_steps_items" ADD CONSTRAINT "home_page_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_steps_items_locales" ADD CONSTRAINT "home_page_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_blocks_link_group_links" ADD CONSTRAINT "site_header_blocks_link_group_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_blocks_link_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_blocks_link_group_links_locales" ADD CONSTRAINT "site_header_blocks_link_group_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_blocks_link_group_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_blocks_link_group" ADD CONSTRAINT "site_header_blocks_link_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_blocks_link_group_locales" ADD CONSTRAINT "site_header_blocks_link_group_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_blocks_link_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_blocks_services_group" ADD CONSTRAINT "site_header_blocks_services_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_blocks_services_group_locales" ADD CONSTRAINT "site_header_blocks_services_group_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_blocks_services_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_header_locales" ADD CONSTRAINT "site_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_cta_headline" ADD CONSTRAINT "site_footer_cta_headline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_blocks_link_column_links" ADD CONSTRAINT "site_footer_blocks_link_column_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_blocks_link_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_blocks_link_column_links_locales" ADD CONSTRAINT "site_footer_blocks_link_column_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_blocks_link_column_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_blocks_link_column" ADD CONSTRAINT "site_footer_blocks_link_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_blocks_link_column_locales" ADD CONSTRAINT "site_footer_blocks_link_column_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_blocks_link_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_blocks_services_column" ADD CONSTRAINT "site_footer_blocks_services_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_blocks_services_column_locales" ADD CONSTRAINT "site_footer_blocks_services_column_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_blocks_services_column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_legal" ADD CONSTRAINT "site_footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_legal_locales" ADD CONSTRAINT "site_footer_legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_locales" ADD CONSTRAINT "site_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page" ADD CONSTRAINT "success_stories_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_page" ADD CONSTRAINT "success_stories_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_page_locales" ADD CONSTRAINT "success_stories_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page_rels" ADD CONSTRAINT "success_stories_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."success_stories_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_page_rels" ADD CONSTRAINT "success_stories_page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_page" ADD CONSTRAINT "publications_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_page" ADD CONSTRAINT "publications_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_page_locales" ADD CONSTRAINT "publications_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_intro_columns" ADD CONSTRAINT "services_page_intro_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_approach_steps" ADD CONSTRAINT "services_page_approach_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_approach_steps" ADD CONSTRAINT "services_page_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_approach_steps_locales" ADD CONSTRAINT "services_page_approach_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_approach_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_values_items" ADD CONSTRAINT "services_page_values_items_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_values_items" ADD CONSTRAINT "services_page_values_items_thumbnail_mobile_id_media_id_fk" FOREIGN KEY ("thumbnail_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_values_items" ADD CONSTRAINT "services_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_values_items_locales" ADD CONSTRAINT "services_page_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_cta_actions" ADD CONSTRAINT "services_page_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_cta_actions_locales" ADD CONSTRAINT "services_page_cta_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_cta_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_approach_illustration_id_media_id_fk" FOREIGN KEY ("approach_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_page_intro_paragraphs" ADD CONSTRAINT "tools_page_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_page" ADD CONSTRAINT "tools_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_page" ADD CONSTRAINT "tools_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_page" ADD CONSTRAINT "tools_page_cta_id_cta_banners_id_fk" FOREIGN KEY ("cta_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_page_locales" ADD CONSTRAINT "tools_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_events_page" ADD CONSTRAINT "news_events_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_events_page" ADD CONSTRAINT "news_events_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_events_page" ADD CONSTRAINT "news_events_page_cta_support_id_cta_banners_id_fk" FOREIGN KEY ("cta_support_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_events_page" ADD CONSTRAINT "news_events_page_cta_discuss_id_cta_banners_id_fk" FOREIGN KEY ("cta_discuss_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_events_page" ADD CONSTRAINT "news_events_page_cta_updates_id_cta_banners_id_fk" FOREIGN KEY ("cta_updates_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_events_page_locales" ADD CONSTRAINT "news_events_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_hero_links" ADD CONSTRAINT "about_page_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_hero_links_locales" ADD CONSTRAINT "about_page_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_intro_paragraphs" ADD CONSTRAINT "about_page_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_intro_actions" ADD CONSTRAINT "about_page_intro_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_intro_actions_locales" ADD CONSTRAINT "about_page_intro_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_intro_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_info_cards_paragraphs" ADD CONSTRAINT "about_page_info_cards_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_info_cards" ADD CONSTRAINT "about_page_info_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_info_cards" ADD CONSTRAINT "about_page_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_info_cards_locales" ADD CONSTRAINT "about_page_info_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_thumbnail_mobile_id_media_id_fk" FOREIGN KEY ("thumbnail_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_items_locales" ADD CONSTRAINT "about_page_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_page" ADD CONSTRAINT "departments_page_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments_page" ADD CONSTRAINT "departments_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments_page_locales" ADD CONSTRAINT "departments_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_hero_lead" ADD CONSTRAINT "team_page_hero_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_hero_stats" ADD CONSTRAINT "team_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_hero_stats_locales" ADD CONSTRAINT "team_page_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_intro_actions" ADD CONSTRAINT "team_page_intro_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_intro_actions_locales" ADD CONSTRAINT "team_page_intro_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page_intro_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_continents_items" ADD CONSTRAINT "team_page_continents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_continents_items_locales" ADD CONSTRAINT "team_page_continents_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page_continents_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page" ADD CONSTRAINT "team_page_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_page" ADD CONSTRAINT "team_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_page" ADD CONSTRAINT "team_page_globe_selected_country_id_countries_id_fk" FOREIGN KEY ("globe_selected_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_page_locales" ADD CONSTRAINT "team_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_page_hero_stats" ADD CONSTRAINT "partners_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_page_hero_stats_locales" ADD CONSTRAINT "partners_page_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_page_intro_paragraphs" ADD CONSTRAINT "partners_page_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_page" ADD CONSTRAINT "partners_page_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_page" ADD CONSTRAINT "partners_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_page_locales" ADD CONSTRAINT "partners_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page_hero_lead" ADD CONSTRAINT "career_page_hero_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page_roles_columns" ADD CONSTRAINT "career_page_roles_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page_roles_columns_locales" ADD CONSTRAINT "career_page_roles_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page_roles_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page_hiring_paragraphs" ADD CONSTRAINT "career_page_hiring_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page_hiring_steps" ADD CONSTRAINT "career_page_hiring_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page_hiring_steps_locales" ADD CONSTRAINT "career_page_hiring_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page_hiring_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_page" ADD CONSTRAINT "career_page_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_page" ADD CONSTRAINT "career_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_page_locales" ADD CONSTRAINT "career_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_hero_lead" ADD CONSTRAINT "theory_of_change_page_hero_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_hero_links" ADD CONSTRAINT "theory_of_change_page_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_hero_links_locales" ADD CONSTRAINT "theory_of_change_page_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_scene_challenge_details" ADD CONSTRAINT "theory_of_change_page_scene_challenge_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_scene_goal_details" ADD CONSTRAINT "theory_of_change_page_scene_goal_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_scene_values" ADD CONSTRAINT "theory_of_change_page_scene_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_approach_steps" ADD CONSTRAINT "theory_of_change_page_approach_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_approach_steps" ADD CONSTRAINT "theory_of_change_page_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_approach_steps_locales" ADD CONSTRAINT "theory_of_change_page_approach_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page_approach_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_outcomes_columns" ADD CONSTRAINT "theory_of_change_page_outcomes_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ADD CONSTRAINT "theory_of_change_page_outcomes_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page_outcomes_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_globe_pins" ADD CONSTRAINT "theory_of_change_page_globe_pins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_of_change_page" ADD CONSTRAINT "theory_of_change_page_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "theory_of_change_page" ADD CONSTRAINT "theory_of_change_page_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "theory_of_change_page_locales" ADD CONSTRAINT "theory_of_change_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_of_change_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_highlights_order_idx" ON "projects_highlights" USING btree ("_order");
  CREATE INDEX "projects_highlights_parent_id_idx" ON "projects_highlights" USING btree ("_parent_id");
  CREATE INDEX "projects_highlights_locale_idx" ON "projects_highlights" USING btree ("_locale");
  CREATE INDEX "projects_link_groups_links_parts_order_idx" ON "projects_link_groups_links_parts" USING btree ("_order");
  CREATE INDEX "projects_link_groups_links_parts_parent_id_idx" ON "projects_link_groups_links_parts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_link_groups_links_parts_locales_locale_parent_id_un" ON "projects_link_groups_links_parts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_link_groups_links_order_idx" ON "projects_link_groups_links" USING btree ("_order");
  CREATE INDEX "projects_link_groups_links_parent_id_idx" ON "projects_link_groups_links" USING btree ("_parent_id");
  CREATE INDEX "projects_link_groups_order_idx" ON "projects_link_groups" USING btree ("_order");
  CREATE INDEX "projects_link_groups_parent_id_idx" ON "projects_link_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_link_groups_locales_locale_parent_id_unique" ON "projects_link_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_cta_actions_order_idx" ON "projects_cta_actions" USING btree ("_order");
  CREATE INDEX "projects_cta_actions_parent_id_idx" ON "projects_cta_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_cta_actions_locales_locale_parent_id_unique" ON "projects_cta_actions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_thumbnail_idx" ON "projects" USING btree ("thumbnail_id");
  CREATE INDEX "projects_partner_tag_idx" ON "projects" USING btree ("partner_tag_id");
  CREATE INDEX "projects_region_idx" ON "projects" USING btree ("region_id");
  CREATE INDEX "projects_hero_idx" ON "projects" USING btree ("hero_id");
  CREATE INDEX "projects_testimonial_idx" ON "projects" USING btree ("testimonial_id");
  CREATE INDEX "projects_contact_contact_member_idx" ON "projects" USING btree ("contact_member_id");
  CREATE INDEX "projects_contact_contact_photo_idx" ON "projects" USING btree ("contact_photo_id");
  CREATE INDEX "projects_cta_service_idx" ON "projects" USING btree ("cta_service_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_tags_id_idx" ON "projects_rels" USING btree ("tags_id");
  CREATE INDEX "projects_rels_tools_id_idx" ON "projects_rels" USING btree ("tools_id");
  CREATE INDEX "projects_rels_services_id_idx" ON "projects_rels" USING btree ("services_id");
  CREATE INDEX "projects_rels_departments_id_idx" ON "projects_rels" USING btree ("departments_id");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id");
  CREATE INDEX "_projects_v_version_highlights_order_idx" ON "_projects_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_projects_v_version_highlights_parent_id_idx" ON "_projects_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_highlights_locale_idx" ON "_projects_v_version_highlights" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_link_groups_links_parts_order_idx" ON "_projects_v_version_link_groups_links_parts" USING btree ("_order");
  CREATE INDEX "_projects_v_version_link_groups_links_parts_parent_id_idx" ON "_projects_v_version_link_groups_links_parts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_link_groups_links_parts_locales_locale_p" ON "_projects_v_version_link_groups_links_parts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_link_groups_links_order_idx" ON "_projects_v_version_link_groups_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_link_groups_links_parent_id_idx" ON "_projects_v_version_link_groups_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_link_groups_order_idx" ON "_projects_v_version_link_groups" USING btree ("_order");
  CREATE INDEX "_projects_v_version_link_groups_parent_id_idx" ON "_projects_v_version_link_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_link_groups_locales_locale_parent_id_uni" ON "_projects_v_version_link_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_cta_actions_order_idx" ON "_projects_v_version_cta_actions" USING btree ("_order");
  CREATE INDEX "_projects_v_version_cta_actions_parent_id_idx" ON "_projects_v_version_cta_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_cta_actions_locales_locale_parent_id_uni" ON "_projects_v_version_cta_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_thumbnail_idx" ON "_projects_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_projects_v_version_version_partner_tag_idx" ON "_projects_v" USING btree ("version_partner_tag_id");
  CREATE INDEX "_projects_v_version_version_region_idx" ON "_projects_v" USING btree ("version_region_id");
  CREATE INDEX "_projects_v_version_version_hero_idx" ON "_projects_v" USING btree ("version_hero_id");
  CREATE INDEX "_projects_v_version_version_testimonial_idx" ON "_projects_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_projects_v_version_contact_version_contact_member_idx" ON "_projects_v" USING btree ("version_contact_member_id");
  CREATE INDEX "_projects_v_version_contact_version_contact_photo_idx" ON "_projects_v" USING btree ("version_contact_photo_id");
  CREATE INDEX "_projects_v_version_version_cta_service_idx" ON "_projects_v" USING btree ("version_cta_service_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_tags_id_idx" ON "_projects_v_rels" USING btree ("tags_id");
  CREATE INDEX "_projects_v_rels_tools_id_idx" ON "_projects_v_rels" USING btree ("tools_id");
  CREATE INDEX "_projects_v_rels_services_id_idx" ON "_projects_v_rels" USING btree ("services_id");
  CREATE INDEX "_projects_v_rels_departments_id_idx" ON "_projects_v_rels" USING btree ("departments_id");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_rels_partners_id_idx" ON "_projects_v_rels" USING btree ("partners_id");
  CREATE INDEX "publications_authors_order_idx" ON "publications_authors" USING btree ("_order");
  CREATE INDEX "publications_authors_parent_id_idx" ON "publications_authors" USING btree ("_parent_id");
  CREATE INDEX "publications_authors_member_idx" ON "publications_authors" USING btree ("member_id");
  CREATE INDEX "publications_authors_photo_idx" ON "publications_authors" USING btree ("photo_id");
  CREATE UNIQUE INDEX "publications_authors_locales_locale_parent_id_unique" ON "publications_authors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_blocks_rich_text_order_idx" ON "publications_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "publications_blocks_rich_text_parent_id_idx" ON "publications_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "publications_blocks_rich_text_path_idx" ON "publications_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "publications_blocks_rich_text_locales_locale_parent_id_uniqu" ON "publications_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_blocks_stats_items_order_idx" ON "publications_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "publications_blocks_stats_items_parent_id_idx" ON "publications_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "publications_blocks_stats_items_locales_locale_parent_id_uni" ON "publications_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_blocks_stats_order_idx" ON "publications_blocks_stats" USING btree ("_order");
  CREATE INDEX "publications_blocks_stats_parent_id_idx" ON "publications_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "publications_blocks_stats_path_idx" ON "publications_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "publications_blocks_stats_locales_locale_parent_id_unique" ON "publications_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_blocks_image_order_idx" ON "publications_blocks_image" USING btree ("_order");
  CREATE INDEX "publications_blocks_image_parent_id_idx" ON "publications_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "publications_blocks_image_path_idx" ON "publications_blocks_image" USING btree ("_path");
  CREATE INDEX "publications_blocks_image_image_idx" ON "publications_blocks_image" USING btree ("image_id");
  CREATE INDEX "publications_link_groups_links_parts_order_idx" ON "publications_link_groups_links_parts" USING btree ("_order");
  CREATE INDEX "publications_link_groups_links_parts_parent_id_idx" ON "publications_link_groups_links_parts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "publications_link_groups_links_parts_locales_locale_parent_i" ON "publications_link_groups_links_parts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_link_groups_links_order_idx" ON "publications_link_groups_links" USING btree ("_order");
  CREATE INDEX "publications_link_groups_links_parent_id_idx" ON "publications_link_groups_links" USING btree ("_parent_id");
  CREATE INDEX "publications_link_groups_order_idx" ON "publications_link_groups" USING btree ("_order");
  CREATE INDEX "publications_link_groups_parent_id_idx" ON "publications_link_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "publications_link_groups_locales_locale_parent_id_unique" ON "publications_link_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_cta_actions_order_idx" ON "publications_cta_actions" USING btree ("_order");
  CREATE INDEX "publications_cta_actions_parent_id_idx" ON "publications_cta_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "publications_cta_actions_locales_locale_parent_id_unique" ON "publications_cta_actions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_category_idx" ON "publications" USING btree ("category_id");
  CREATE INDEX "publications_thumbnail_idx" ON "publications" USING btree ("thumbnail_id");
  CREATE INDEX "publications_region_idx" ON "publications" USING btree ("region_id");
  CREATE INDEX "publications_hero_idx" ON "publications" USING btree ("hero_id");
  CREATE INDEX "publications_cta_service_idx" ON "publications" USING btree ("cta_service_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
  CREATE UNIQUE INDEX "publications_locales_locale_parent_id_unique" ON "publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_tags_id_idx" ON "publications_rels" USING btree ("tags_id");
  CREATE INDEX "publications_rels_publications_id_idx" ON "publications_rels" USING btree ("publications_id");
  CREATE INDEX "_publications_v_version_authors_order_idx" ON "_publications_v_version_authors" USING btree ("_order");
  CREATE INDEX "_publications_v_version_authors_parent_id_idx" ON "_publications_v_version_authors" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_version_authors_member_idx" ON "_publications_v_version_authors" USING btree ("member_id");
  CREATE INDEX "_publications_v_version_authors_photo_idx" ON "_publications_v_version_authors" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_publications_v_version_authors_locales_locale_parent_id_uni" ON "_publications_v_version_authors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_blocks_rich_text_order_idx" ON "_publications_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_publications_v_blocks_rich_text_parent_id_idx" ON "_publications_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_blocks_rich_text_path_idx" ON "_publications_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_publications_v_blocks_rich_text_locales_locale_parent_id_un" ON "_publications_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_blocks_stats_items_order_idx" ON "_publications_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_publications_v_blocks_stats_items_parent_id_idx" ON "_publications_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_publications_v_blocks_stats_items_locales_locale_parent_id_" ON "_publications_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_blocks_stats_order_idx" ON "_publications_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_publications_v_blocks_stats_parent_id_idx" ON "_publications_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_blocks_stats_path_idx" ON "_publications_v_blocks_stats" USING btree ("_path");
  CREATE UNIQUE INDEX "_publications_v_blocks_stats_locales_locale_parent_id_unique" ON "_publications_v_blocks_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_blocks_image_order_idx" ON "_publications_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_publications_v_blocks_image_parent_id_idx" ON "_publications_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_blocks_image_path_idx" ON "_publications_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_publications_v_blocks_image_image_idx" ON "_publications_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_publications_v_version_link_groups_links_parts_order_idx" ON "_publications_v_version_link_groups_links_parts" USING btree ("_order");
  CREATE INDEX "_publications_v_version_link_groups_links_parts_parent_id_idx" ON "_publications_v_version_link_groups_links_parts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_publications_v_version_link_groups_links_parts_locales_loca" ON "_publications_v_version_link_groups_links_parts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_version_link_groups_links_order_idx" ON "_publications_v_version_link_groups_links" USING btree ("_order");
  CREATE INDEX "_publications_v_version_link_groups_links_parent_id_idx" ON "_publications_v_version_link_groups_links" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_version_link_groups_order_idx" ON "_publications_v_version_link_groups" USING btree ("_order");
  CREATE INDEX "_publications_v_version_link_groups_parent_id_idx" ON "_publications_v_version_link_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_publications_v_version_link_groups_locales_locale_parent_id" ON "_publications_v_version_link_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_version_cta_actions_order_idx" ON "_publications_v_version_cta_actions" USING btree ("_order");
  CREATE INDEX "_publications_v_version_cta_actions_parent_id_idx" ON "_publications_v_version_cta_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_publications_v_version_cta_actions_locales_locale_parent_id" ON "_publications_v_version_cta_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v" USING btree ("version_slug");
  CREATE INDEX "_publications_v_version_version_category_idx" ON "_publications_v" USING btree ("version_category_id");
  CREATE INDEX "_publications_v_version_version_thumbnail_idx" ON "_publications_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_publications_v_version_version_region_idx" ON "_publications_v" USING btree ("version_region_id");
  CREATE INDEX "_publications_v_version_version_hero_idx" ON "_publications_v" USING btree ("version_hero_id");
  CREATE INDEX "_publications_v_version_version_cta_service_idx" ON "_publications_v" USING btree ("version_cta_service_id");
  CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
  CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
  CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
  CREATE INDEX "_publications_v_snapshot_idx" ON "_publications_v" USING btree ("snapshot");
  CREATE INDEX "_publications_v_published_locale_idx" ON "_publications_v" USING btree ("published_locale");
  CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_publications_v_locales_locale_parent_id_unique" ON "_publications_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_rels_order_idx" ON "_publications_v_rels" USING btree ("order");
  CREATE INDEX "_publications_v_rels_parent_idx" ON "_publications_v_rels" USING btree ("parent_id");
  CREATE INDEX "_publications_v_rels_path_idx" ON "_publications_v_rels" USING btree ("path");
  CREATE INDEX "_publications_v_rels_tags_id_idx" ON "_publications_v_rels" USING btree ("tags_id");
  CREATE INDEX "_publications_v_rels_publications_id_idx" ON "_publications_v_rels" USING btree ("publications_id");
  CREATE INDEX "testimonials_paragraphs_order_idx" ON "testimonials_paragraphs" USING btree ("_order");
  CREATE INDEX "testimonials_paragraphs_parent_id_idx" ON "testimonials_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "testimonials_paragraphs_locale_idx" ON "testimonials_paragraphs" USING btree ("_locale");
  CREATE INDEX "testimonials_portrait_idx" ON "testimonials" USING btree ("portrait_id");
  CREATE INDEX "testimonials_logo_idx" ON "testimonials" USING btree ("logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "regions_slug_idx" ON "regions" USING btree ("slug");
  CREATE INDEX "regions_updated_at_idx" ON "regions" USING btree ("updated_at");
  CREATE INDEX "regions_created_at_idx" ON "regions" USING btree ("created_at");
  CREATE UNIQUE INDEX "regions_locales_locale_parent_id_unique" ON "regions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "publication_categories_slug_idx" ON "publication_categories" USING btree ("slug");
  CREATE INDEX "publication_categories_updated_at_idx" ON "publication_categories" USING btree ("updated_at");
  CREATE INDEX "publication_categories_created_at_idx" ON "publication_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "publication_categories_locales_locale_parent_id_unique" ON "publication_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_intro_paragraphs_order_idx" ON "services_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "services_intro_paragraphs_parent_id_idx" ON "services_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "services_intro_paragraphs_locale_idx" ON "services_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "services_blocks_paragraph_order_idx" ON "services_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "services_blocks_paragraph_parent_id_idx" ON "services_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_paragraph_path_idx" ON "services_blocks_paragraph" USING btree ("_path");
  CREATE UNIQUE INDEX "services_blocks_paragraph_locales_locale_parent_id_unique" ON "services_blocks_paragraph_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_blocks_list_items_order_idx" ON "services_blocks_list_items" USING btree ("_order");
  CREATE INDEX "services_blocks_list_items_parent_id_idx" ON "services_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_list_items_locale_idx" ON "services_blocks_list_items" USING btree ("_locale");
  CREATE INDEX "services_blocks_list_order_idx" ON "services_blocks_list" USING btree ("_order");
  CREATE INDEX "services_blocks_list_parent_id_idx" ON "services_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_list_path_idx" ON "services_blocks_list" USING btree ("_path");
  CREATE INDEX "services_offerings_items_deliverables_order_idx" ON "services_offerings_items_deliverables" USING btree ("_order");
  CREATE INDEX "services_offerings_items_deliverables_parent_id_idx" ON "services_offerings_items_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_offerings_items_deliverables_locale_idx" ON "services_offerings_items_deliverables" USING btree ("_locale");
  CREATE INDEX "services_offerings_items_order_idx" ON "services_offerings_items" USING btree ("_order");
  CREATE INDEX "services_offerings_items_parent_id_idx" ON "services_offerings_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_offerings_items_locales_locale_parent_id_unique" ON "services_offerings_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_values_items_order_idx" ON "services_values_items" USING btree ("_order");
  CREATE INDEX "services_values_items_parent_id_idx" ON "services_values_items" USING btree ("_parent_id");
  CREATE INDEX "services_values_items_thumbnail_idx" ON "services_values_items" USING btree ("thumbnail_id");
  CREATE INDEX "services_values_items_thumbnail_mobile_idx" ON "services_values_items" USING btree ("thumbnail_mobile_id");
  CREATE UNIQUE INDEX "services_values_items_locales_locale_parent_id_unique" ON "services_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_approach_paragraphs_order_idx" ON "services_approach_paragraphs" USING btree ("_order");
  CREATE INDEX "services_approach_paragraphs_parent_id_idx" ON "services_approach_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "services_approach_paragraphs_locale_idx" ON "services_approach_paragraphs" USING btree ("_locale");
  CREATE INDEX "services_card_paragraphs_order_idx" ON "services_card_paragraphs" USING btree ("_order");
  CREATE INDEX "services_card_paragraphs_parent_id_idx" ON "services_card_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "services_card_paragraphs_locale_idx" ON "services_card_paragraphs" USING btree ("_locale");
  CREATE INDEX "services_cta_card_paragraphs_order_idx" ON "services_cta_card_paragraphs" USING btree ("_order");
  CREATE INDEX "services_cta_card_paragraphs_parent_id_idx" ON "services_cta_card_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "services_cta_card_paragraphs_locale_idx" ON "services_cta_card_paragraphs" USING btree ("_locale");
  CREATE INDEX "services_home_paragraphs_order_idx" ON "services_home_paragraphs" USING btree ("_order");
  CREATE INDEX "services_home_paragraphs_parent_id_idx" ON "services_home_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "services_home_paragraphs_locale_idx" ON "services_home_paragraphs" USING btree ("_locale");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_order_idx" ON "services" USING btree ("order");
  CREATE INDEX "services_hero_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_hero_hero_image_mobile_idx" ON "services" USING btree ("hero_image_mobile_id");
  CREATE INDEX "services_intro_intro_image_idx" ON "services" USING btree ("intro_image_id");
  CREATE INDEX "services_card_card_image_idx" ON "services" USING btree ("card_image_id");
  CREATE INDEX "services_card_card_image_mobile_idx" ON "services" USING btree ("card_image_mobile_id");
  CREATE INDEX "services_cta_card_cta_card_image_idx" ON "services" USING btree ("cta_card_image_id");
  CREATE INDEX "services_cta_card_cta_card_image_mobile_idx" ON "services" USING btree ("cta_card_image_mobile_id");
  CREATE INDEX "services_home_home_image_idx" ON "services" USING btree ("home_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_intro_paragraphs_order_idx" ON "_services_v_version_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "_services_v_version_intro_paragraphs_parent_id_idx" ON "_services_v_version_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_intro_paragraphs_locale_idx" ON "_services_v_version_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_paragraph_order_idx" ON "_services_v_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_paragraph_parent_id_idx" ON "_services_v_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_paragraph_path_idx" ON "_services_v_blocks_paragraph" USING btree ("_path");
  CREATE UNIQUE INDEX "_services_v_blocks_paragraph_locales_locale_parent_id_unique" ON "_services_v_blocks_paragraph_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_blocks_list_items_order_idx" ON "_services_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_list_items_parent_id_idx" ON "_services_v_blocks_list_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_list_items_locale_idx" ON "_services_v_blocks_list_items" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_list_order_idx" ON "_services_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_list_parent_id_idx" ON "_services_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_list_path_idx" ON "_services_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_services_v_version_offerings_items_deliverables_order_idx" ON "_services_v_version_offerings_items_deliverables" USING btree ("_order");
  CREATE INDEX "_services_v_version_offerings_items_deliverables_parent_id_idx" ON "_services_v_version_offerings_items_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_offerings_items_deliverables_locale_idx" ON "_services_v_version_offerings_items_deliverables" USING btree ("_locale");
  CREATE INDEX "_services_v_version_offerings_items_order_idx" ON "_services_v_version_offerings_items" USING btree ("_order");
  CREATE INDEX "_services_v_version_offerings_items_parent_id_idx" ON "_services_v_version_offerings_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_offerings_items_locales_locale_parent_id" ON "_services_v_version_offerings_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_values_items_order_idx" ON "_services_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_services_v_version_values_items_parent_id_idx" ON "_services_v_version_values_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_values_items_thumbnail_idx" ON "_services_v_version_values_items" USING btree ("thumbnail_id");
  CREATE INDEX "_services_v_version_values_items_thumbnail_mobile_idx" ON "_services_v_version_values_items" USING btree ("thumbnail_mobile_id");
  CREATE UNIQUE INDEX "_services_v_version_values_items_locales_locale_parent_id_un" ON "_services_v_version_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_approach_paragraphs_order_idx" ON "_services_v_version_approach_paragraphs" USING btree ("_order");
  CREATE INDEX "_services_v_version_approach_paragraphs_parent_id_idx" ON "_services_v_version_approach_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_approach_paragraphs_locale_idx" ON "_services_v_version_approach_paragraphs" USING btree ("_locale");
  CREATE INDEX "_services_v_version_card_paragraphs_order_idx" ON "_services_v_version_card_paragraphs" USING btree ("_order");
  CREATE INDEX "_services_v_version_card_paragraphs_parent_id_idx" ON "_services_v_version_card_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_card_paragraphs_locale_idx" ON "_services_v_version_card_paragraphs" USING btree ("_locale");
  CREATE INDEX "_services_v_version_cta_card_paragraphs_order_idx" ON "_services_v_version_cta_card_paragraphs" USING btree ("_order");
  CREATE INDEX "_services_v_version_cta_card_paragraphs_parent_id_idx" ON "_services_v_version_cta_card_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_cta_card_paragraphs_locale_idx" ON "_services_v_version_cta_card_paragraphs" USING btree ("_locale");
  CREATE INDEX "_services_v_version_home_paragraphs_order_idx" ON "_services_v_version_home_paragraphs" USING btree ("_order");
  CREATE INDEX "_services_v_version_home_paragraphs_parent_id_idx" ON "_services_v_version_home_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_home_paragraphs_locale_idx" ON "_services_v_version_home_paragraphs" USING btree ("_locale");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_order_idx" ON "_services_v" USING btree ("version_order");
  CREATE INDEX "_services_v_version_hero_version_hero_image_idx" ON "_services_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_v_version_hero_version_hero_image_mobile_idx" ON "_services_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_services_v_version_intro_version_intro_image_idx" ON "_services_v" USING btree ("version_intro_image_id");
  CREATE INDEX "_services_v_version_card_version_card_image_idx" ON "_services_v" USING btree ("version_card_image_id");
  CREATE INDEX "_services_v_version_card_version_card_image_mobile_idx" ON "_services_v" USING btree ("version_card_image_mobile_id");
  CREATE INDEX "_services_v_version_cta_card_version_cta_card_image_idx" ON "_services_v" USING btree ("version_cta_card_image_id");
  CREATE INDEX "_services_v_version_cta_card_version_cta_card_image_mobi_idx" ON "_services_v" USING btree ("version_cta_card_image_mobile_id");
  CREATE INDEX "_services_v_version_home_version_home_image_idx" ON "_services_v" USING btree ("version_home_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tools_description_order_idx" ON "tools_description" USING btree ("_order");
  CREATE INDEX "tools_description_parent_id_idx" ON "tools_description" USING btree ("_parent_id");
  CREATE INDEX "tools_description_locale_idx" ON "tools_description" USING btree ("_locale");
  CREATE INDEX "tools_order_idx" ON "tools" USING btree ("order");
  CREATE INDEX "tools_updated_at_idx" ON "tools" USING btree ("updated_at");
  CREATE INDEX "tools_created_at_idx" ON "tools" USING btree ("created_at");
  CREATE INDEX "tools_rels_order_idx" ON "tools_rels" USING btree ("order");
  CREATE INDEX "tools_rels_parent_idx" ON "tools_rels" USING btree ("parent_id");
  CREATE INDEX "tools_rels_path_idx" ON "tools_rels" USING btree ("path");
  CREATE INDEX "tools_rels_tool_categories_id_idx" ON "tools_rels" USING btree ("tool_categories_id");
  CREATE UNIQUE INDEX "tool_categories_slug_idx" ON "tool_categories" USING btree ("slug");
  CREATE INDEX "tool_categories_order_idx" ON "tool_categories" USING btree ("order");
  CREATE INDEX "tool_categories_updated_at_idx" ON "tool_categories" USING btree ("updated_at");
  CREATE INDEX "tool_categories_created_at_idx" ON "tool_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "tool_categories_locales_locale_parent_id_unique" ON "tool_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cta_banners_actions_order_idx" ON "cta_banners_actions" USING btree ("_order");
  CREATE INDEX "cta_banners_actions_parent_id_idx" ON "cta_banners_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cta_banners_actions_locales_locale_parent_id_unique" ON "cta_banners_actions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "cta_banners_key_idx" ON "cta_banners" USING btree ("key");
  CREATE INDEX "cta_banners_updated_at_idx" ON "cta_banners" USING btree ("updated_at");
  CREATE INDEX "cta_banners_created_at_idx" ON "cta_banners" USING btree ("created_at");
  CREATE UNIQUE INDEX "cta_banners_locales_locale_parent_id_unique" ON "cta_banners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_blocks_member_order_idx" ON "events_blocks_member" USING btree ("_order");
  CREATE INDEX "events_blocks_member_parent_id_idx" ON "events_blocks_member" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_member_path_idx" ON "events_blocks_member" USING btree ("_path");
  CREATE INDEX "events_blocks_member_member_idx" ON "events_blocks_member" USING btree ("member_id");
  CREATE INDEX "events_blocks_external_order_idx" ON "events_blocks_external" USING btree ("_order");
  CREATE INDEX "events_blocks_external_parent_id_idx" ON "events_blocks_external" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_external_path_idx" ON "events_blocks_external" USING btree ("_path");
  CREATE INDEX "events_blocks_external_photo_idx" ON "events_blocks_external" USING btree ("photo_id");
  CREATE UNIQUE INDEX "events_blocks_external_locales_locale_parent_id_unique" ON "events_blocks_external_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_gallery_order_idx" ON "events_gallery" USING btree ("_order");
  CREATE INDEX "events_gallery_parent_id_idx" ON "events_gallery" USING btree ("_parent_id");
  CREATE INDEX "events_gallery_image_idx" ON "events_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_type_idx" ON "events" USING btree ("type_id");
  CREATE INDEX "events_poster_idx" ON "events" USING btree ("poster_id");
  CREATE INDEX "events_highlight_highlight_image_idx" ON "events" USING btree ("highlight_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_blocks_member_order_idx" ON "_events_v_blocks_member" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_member_parent_id_idx" ON "_events_v_blocks_member" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_member_path_idx" ON "_events_v_blocks_member" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_member_member_idx" ON "_events_v_blocks_member" USING btree ("member_id");
  CREATE INDEX "_events_v_blocks_external_order_idx" ON "_events_v_blocks_external" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_external_parent_id_idx" ON "_events_v_blocks_external" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_external_path_idx" ON "_events_v_blocks_external" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_external_photo_idx" ON "_events_v_blocks_external" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_events_v_blocks_external_locales_locale_parent_id_unique" ON "_events_v_blocks_external_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_version_gallery_order_idx" ON "_events_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_events_v_version_gallery_parent_id_idx" ON "_events_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_gallery_image_idx" ON "_events_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_type_idx" ON "_events_v" USING btree ("version_type_id");
  CREATE INDEX "_events_v_version_version_poster_idx" ON "_events_v" USING btree ("version_poster_id");
  CREATE INDEX "_events_v_version_highlight_version_highlight_image_idx" ON "_events_v" USING btree ("version_highlight_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "event_types_slug_idx" ON "event_types" USING btree ("slug");
  CREATE INDEX "event_types_order_idx" ON "event_types" USING btree ("order");
  CREATE INDEX "event_types_updated_at_idx" ON "event_types" USING btree ("updated_at");
  CREATE INDEX "event_types_created_at_idx" ON "event_types" USING btree ("created_at");
  CREATE UNIQUE INDEX "event_types_locales_locale_parent_id_unique" ON "event_types_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "team_members_social_links_order_idx" ON "team_members_social_links" USING btree ("_order");
  CREATE INDEX "team_members_social_links_parent_id_idx" ON "team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_country_idx" ON "team_members" USING btree ("country_id");
  CREATE INDEX "team_members_portrait_idx" ON "team_members" USING btree ("portrait_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_members_rels_order_idx" ON "team_members_rels" USING btree ("order");
  CREATE INDEX "team_members_rels_parent_idx" ON "team_members_rels" USING btree ("parent_id");
  CREATE INDEX "team_members_rels_path_idx" ON "team_members_rels" USING btree ("path");
  CREATE INDEX "team_members_rels_departments_id_idx" ON "team_members_rels" USING btree ("departments_id");
  CREATE INDEX "departments_detail_topics_order_idx" ON "departments_detail_topics" USING btree ("_order");
  CREATE INDEX "departments_detail_topics_parent_id_idx" ON "departments_detail_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "departments_detail_topics_locales_locale_parent_id_unique" ON "departments_detail_topics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "departments_head_idx" ON "departments" USING btree ("head_id");
  CREATE INDEX "departments_detail_card_image_detail_card_image_desktop_idx" ON "departments" USING btree ("detail_card_image_desktop_id");
  CREATE INDEX "departments_detail_card_image_detail_card_image_mobile_idx" ON "departments" USING btree ("detail_card_image_mobile_id");
  CREATE INDEX "departments_detail_hero_image_detail_hero_image_desktop_idx" ON "departments" USING btree ("detail_hero_image_desktop_id");
  CREATE INDEX "departments_detail_hero_image_detail_hero_image_mobile_idx" ON "departments" USING btree ("detail_hero_image_mobile_id");
  CREATE UNIQUE INDEX "departments_slug_idx" ON "departments" USING btree ("slug");
  CREATE INDEX "departments_updated_at_idx" ON "departments" USING btree ("updated_at");
  CREATE INDEX "departments_created_at_idx" ON "departments" USING btree ("created_at");
  CREATE INDEX "departments__status_idx" ON "departments" USING btree ("_status");
  CREATE UNIQUE INDEX "departments_locales_locale_parent_id_unique" ON "departments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_departments_v_version_detail_topics_order_idx" ON "_departments_v_version_detail_topics" USING btree ("_order");
  CREATE INDEX "_departments_v_version_detail_topics_parent_id_idx" ON "_departments_v_version_detail_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_departments_v_version_detail_topics_locales_locale_parent_i" ON "_departments_v_version_detail_topics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_departments_v_parent_idx" ON "_departments_v" USING btree ("parent_id");
  CREATE INDEX "_departments_v_version_version_head_idx" ON "_departments_v" USING btree ("version_head_id");
  CREATE INDEX "_departments_v_version_detail_card_image_version_detail__idx" ON "_departments_v" USING btree ("version_detail_card_image_desktop_id");
  CREATE INDEX "_departments_v_version_detail_card_image_version_detai_1_idx" ON "_departments_v" USING btree ("version_detail_card_image_mobile_id");
  CREATE INDEX "_departments_v_version_detail_hero_image_version_detail__idx" ON "_departments_v" USING btree ("version_detail_hero_image_desktop_id");
  CREATE INDEX "_departments_v_version_detail_hero_image_version_detai_1_idx" ON "_departments_v" USING btree ("version_detail_hero_image_mobile_id");
  CREATE INDEX "_departments_v_version_version_slug_idx" ON "_departments_v" USING btree ("version_slug");
  CREATE INDEX "_departments_v_version_version_updated_at_idx" ON "_departments_v" USING btree ("version_updated_at");
  CREATE INDEX "_departments_v_version_version_created_at_idx" ON "_departments_v" USING btree ("version_created_at");
  CREATE INDEX "_departments_v_version_version__status_idx" ON "_departments_v" USING btree ("version__status");
  CREATE INDEX "_departments_v_created_at_idx" ON "_departments_v" USING btree ("created_at");
  CREATE INDEX "_departments_v_updated_at_idx" ON "_departments_v" USING btree ("updated_at");
  CREATE INDEX "_departments_v_snapshot_idx" ON "_departments_v" USING btree ("snapshot");
  CREATE INDEX "_departments_v_published_locale_idx" ON "_departments_v" USING btree ("published_locale");
  CREATE INDEX "_departments_v_latest_idx" ON "_departments_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_departments_v_locales_locale_parent_id_unique" ON "_departments_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "countries_code_idx" ON "countries" USING btree ("code");
  CREATE INDEX "countries_photo_idx" ON "countries" USING btree ("photo_id");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE UNIQUE INDEX "countries_locales_locale_parent_id_unique" ON "countries_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "partners_name_idx" ON "partners" USING btree ("name");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_tag_logo_idx" ON "partners" USING btree ("tag_logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE UNIQUE INDEX "jobs_locales_locale_parent_id_unique" ON "jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_regions_id_idx" ON "payload_locked_documents_rels" USING btree ("regions_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_publication_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("publication_categories_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_tools_id_idx" ON "payload_locked_documents_rels" USING btree ("tools_id");
  CREATE INDEX "payload_locked_documents_rels_tool_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("tool_categories_id");
  CREATE INDEX "payload_locked_documents_rels_cta_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("cta_banners_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_event_types_id_idx" ON "payload_locked_documents_rels" USING btree ("event_types_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("departments_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_slides_order_idx" ON "home_page_hero_slides" USING btree ("_order");
  CREATE INDEX "home_page_hero_slides_parent_id_idx" ON "home_page_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_slides_image_idx" ON "home_page_hero_slides" USING btree ("image_id");
  CREATE INDEX "home_page_hero_slides_image_mobile_idx" ON "home_page_hero_slides" USING btree ("image_mobile_id");
  CREATE INDEX "home_page_hero_slides_thumbnail_idx" ON "home_page_hero_slides" USING btree ("thumbnail_id");
  CREATE INDEX "home_page_hero_slides_pattern_pattern_image_idx" ON "home_page_hero_slides" USING btree ("pattern_image_id");
  CREATE UNIQUE INDEX "home_page_hero_slides_locales_locale_parent_id_unique" ON "home_page_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_intro_paragraphs_order_idx" ON "home_page_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "home_page_intro_paragraphs_parent_id_idx" ON "home_page_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "home_page_intro_paragraphs_locale_idx" ON "home_page_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "home_page_intro_actions_order_idx" ON "home_page_intro_actions" USING btree ("_order");
  CREATE INDEX "home_page_intro_actions_parent_id_idx" ON "home_page_intro_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_intro_actions_locales_locale_parent_id_unique" ON "home_page_intro_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_stats_order_idx" ON "home_page_stats" USING btree ("_order");
  CREATE INDEX "home_page_stats_parent_id_idx" ON "home_page_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_stats_locales_locale_parent_id_unique" ON "home_page_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_tools_paragraphs_order_idx" ON "home_page_tools_paragraphs" USING btree ("_order");
  CREATE INDEX "home_page_tools_paragraphs_parent_id_idx" ON "home_page_tools_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "home_page_tools_paragraphs_locale_idx" ON "home_page_tools_paragraphs" USING btree ("_locale");
  CREATE INDEX "home_page_tools_logos_order_idx" ON "home_page_tools_logos" USING btree ("_order");
  CREATE INDEX "home_page_tools_logos_parent_id_idx" ON "home_page_tools_logos" USING btree ("_parent_id");
  CREATE INDEX "home_page_tools_logos_logo_idx" ON "home_page_tools_logos" USING btree ("logo_id");
  CREATE INDEX "home_page_steps_items_paragraphs_order_idx" ON "home_page_steps_items_paragraphs" USING btree ("_order");
  CREATE INDEX "home_page_steps_items_paragraphs_parent_id_idx" ON "home_page_steps_items_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "home_page_steps_items_paragraphs_locale_idx" ON "home_page_steps_items_paragraphs" USING btree ("_locale");
  CREATE INDEX "home_page_steps_items_order_idx" ON "home_page_steps_items" USING btree ("_order");
  CREATE INDEX "home_page_steps_items_parent_id_idx" ON "home_page_steps_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_steps_items_image_idx" ON "home_page_steps_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_page_steps_items_locales_locale_parent_id_unique" ON "home_page_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_intro_intro_image_idx" ON "home_page" USING btree ("intro_image_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_header_blocks_link_group_links_order_idx" ON "site_header_blocks_link_group_links" USING btree ("_order");
  CREATE INDEX "site_header_blocks_link_group_links_parent_id_idx" ON "site_header_blocks_link_group_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_header_blocks_link_group_links_locales_locale_parent_id" ON "site_header_blocks_link_group_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_header_blocks_link_group_order_idx" ON "site_header_blocks_link_group" USING btree ("_order");
  CREATE INDEX "site_header_blocks_link_group_parent_id_idx" ON "site_header_blocks_link_group" USING btree ("_parent_id");
  CREATE INDEX "site_header_blocks_link_group_path_idx" ON "site_header_blocks_link_group" USING btree ("_path");
  CREATE UNIQUE INDEX "site_header_blocks_link_group_locales_locale_parent_id_uniqu" ON "site_header_blocks_link_group_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_header_blocks_services_group_order_idx" ON "site_header_blocks_services_group" USING btree ("_order");
  CREATE INDEX "site_header_blocks_services_group_parent_id_idx" ON "site_header_blocks_services_group" USING btree ("_parent_id");
  CREATE INDEX "site_header_blocks_services_group_path_idx" ON "site_header_blocks_services_group" USING btree ("_path");
  CREATE UNIQUE INDEX "site_header_blocks_services_group_locales_locale_parent_id_u" ON "site_header_blocks_services_group_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_header_locales_locale_parent_id_unique" ON "site_header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_footer_cta_headline_order_idx" ON "site_footer_cta_headline" USING btree ("_order");
  CREATE INDEX "site_footer_cta_headline_parent_id_idx" ON "site_footer_cta_headline" USING btree ("_parent_id");
  CREATE INDEX "site_footer_cta_headline_locale_idx" ON "site_footer_cta_headline" USING btree ("_locale");
  CREATE INDEX "site_footer_blocks_link_column_links_order_idx" ON "site_footer_blocks_link_column_links" USING btree ("_order");
  CREATE INDEX "site_footer_blocks_link_column_links_parent_id_idx" ON "site_footer_blocks_link_column_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_footer_blocks_link_column_links_locales_locale_parent_i" ON "site_footer_blocks_link_column_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_footer_blocks_link_column_order_idx" ON "site_footer_blocks_link_column" USING btree ("_order");
  CREATE INDEX "site_footer_blocks_link_column_parent_id_idx" ON "site_footer_blocks_link_column" USING btree ("_parent_id");
  CREATE INDEX "site_footer_blocks_link_column_path_idx" ON "site_footer_blocks_link_column" USING btree ("_path");
  CREATE UNIQUE INDEX "site_footer_blocks_link_column_locales_locale_parent_id_uniq" ON "site_footer_blocks_link_column_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_footer_blocks_services_column_order_idx" ON "site_footer_blocks_services_column" USING btree ("_order");
  CREATE INDEX "site_footer_blocks_services_column_parent_id_idx" ON "site_footer_blocks_services_column" USING btree ("_parent_id");
  CREATE INDEX "site_footer_blocks_services_column_path_idx" ON "site_footer_blocks_services_column" USING btree ("_path");
  CREATE UNIQUE INDEX "site_footer_blocks_services_column_locales_locale_parent_id_" ON "site_footer_blocks_services_column_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_footer_legal_order_idx" ON "site_footer_legal" USING btree ("_order");
  CREATE INDEX "site_footer_legal_parent_id_idx" ON "site_footer_legal" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_footer_legal_locales_locale_parent_id_unique" ON "site_footer_legal_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_footer_locales_locale_parent_id_unique" ON "site_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "success_stories_page_hero_hero_image_idx" ON "success_stories_page" USING btree ("hero_image_id");
  CREATE INDEX "success_stories_page_hero_hero_image_mobile_idx" ON "success_stories_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "success_stories_page_locales_locale_parent_id_unique" ON "success_stories_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "success_stories_page_rels_order_idx" ON "success_stories_page_rels" USING btree ("order");
  CREATE INDEX "success_stories_page_rels_parent_idx" ON "success_stories_page_rels" USING btree ("parent_id");
  CREATE INDEX "success_stories_page_rels_path_idx" ON "success_stories_page_rels" USING btree ("path");
  CREATE INDEX "success_stories_page_rels_testimonials_id_idx" ON "success_stories_page_rels" USING btree ("testimonials_id");
  CREATE INDEX "publications_page_hero_hero_image_idx" ON "publications_page" USING btree ("hero_image_id");
  CREATE INDEX "publications_page_hero_hero_image_mobile_idx" ON "publications_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "publications_page_locales_locale_parent_id_unique" ON "publications_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_intro_columns_order_idx" ON "services_page_intro_columns" USING btree ("_order");
  CREATE INDEX "services_page_intro_columns_parent_id_idx" ON "services_page_intro_columns" USING btree ("_parent_id");
  CREATE INDEX "services_page_intro_columns_locale_idx" ON "services_page_intro_columns" USING btree ("_locale");
  CREATE INDEX "services_page_approach_steps_order_idx" ON "services_page_approach_steps" USING btree ("_order");
  CREATE INDEX "services_page_approach_steps_parent_id_idx" ON "services_page_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "services_page_approach_steps_image_idx" ON "services_page_approach_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_page_approach_steps_locales_locale_parent_id_unique" ON "services_page_approach_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_values_items_order_idx" ON "services_page_values_items" USING btree ("_order");
  CREATE INDEX "services_page_values_items_parent_id_idx" ON "services_page_values_items" USING btree ("_parent_id");
  CREATE INDEX "services_page_values_items_thumbnail_idx" ON "services_page_values_items" USING btree ("thumbnail_id");
  CREATE INDEX "services_page_values_items_thumbnail_mobile_idx" ON "services_page_values_items" USING btree ("thumbnail_mobile_id");
  CREATE UNIQUE INDEX "services_page_values_items_locales_locale_parent_id_unique" ON "services_page_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_cta_actions_order_idx" ON "services_page_cta_actions" USING btree ("_order");
  CREATE INDEX "services_page_cta_actions_parent_id_idx" ON "services_page_cta_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_page_cta_actions_locales_locale_parent_id_unique" ON "services_page_cta_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_hero_hero_image_idx" ON "services_page" USING btree ("hero_image_id");
  CREATE INDEX "services_page_hero_hero_image_mobile_idx" ON "services_page" USING btree ("hero_image_mobile_id");
  CREATE INDEX "services_page_approach_approach_illustration_idx" ON "services_page" USING btree ("approach_illustration_id");
  CREATE UNIQUE INDEX "services_page_locales_locale_parent_id_unique" ON "services_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tools_page_intro_paragraphs_order_idx" ON "tools_page_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "tools_page_intro_paragraphs_parent_id_idx" ON "tools_page_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "tools_page_intro_paragraphs_locale_idx" ON "tools_page_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "tools_page_hero_hero_image_idx" ON "tools_page" USING btree ("hero_image_id");
  CREATE INDEX "tools_page_hero_hero_image_mobile_idx" ON "tools_page" USING btree ("hero_image_mobile_id");
  CREATE INDEX "tools_page_cta_idx" ON "tools_page" USING btree ("cta_id");
  CREATE UNIQUE INDEX "tools_page_locales_locale_parent_id_unique" ON "tools_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_events_page_hero_hero_image_idx" ON "news_events_page" USING btree ("hero_image_id");
  CREATE INDEX "news_events_page_hero_hero_image_mobile_idx" ON "news_events_page" USING btree ("hero_image_mobile_id");
  CREATE INDEX "news_events_page_cta_cta_support_idx" ON "news_events_page" USING btree ("cta_support_id");
  CREATE INDEX "news_events_page_cta_cta_discuss_idx" ON "news_events_page" USING btree ("cta_discuss_id");
  CREATE INDEX "news_events_page_cta_cta_updates_idx" ON "news_events_page" USING btree ("cta_updates_id");
  CREATE UNIQUE INDEX "news_events_page_locales_locale_parent_id_unique" ON "news_events_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_hero_links_order_idx" ON "about_page_hero_links" USING btree ("_order");
  CREATE INDEX "about_page_hero_links_parent_id_idx" ON "about_page_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_hero_links_locales_locale_parent_id_unique" ON "about_page_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_intro_paragraphs_order_idx" ON "about_page_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_intro_paragraphs_parent_id_idx" ON "about_page_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_intro_paragraphs_locale_idx" ON "about_page_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "about_page_intro_actions_order_idx" ON "about_page_intro_actions" USING btree ("_order");
  CREATE INDEX "about_page_intro_actions_parent_id_idx" ON "about_page_intro_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_intro_actions_locales_locale_parent_id_unique" ON "about_page_intro_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_info_cards_paragraphs_order_idx" ON "about_page_info_cards_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_info_cards_paragraphs_parent_id_idx" ON "about_page_info_cards_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_info_cards_paragraphs_locale_idx" ON "about_page_info_cards_paragraphs" USING btree ("_locale");
  CREATE INDEX "about_page_info_cards_order_idx" ON "about_page_info_cards" USING btree ("_order");
  CREATE INDEX "about_page_info_cards_parent_id_idx" ON "about_page_info_cards" USING btree ("_parent_id");
  CREATE INDEX "about_page_info_cards_image_idx" ON "about_page_info_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_page_info_cards_locales_locale_parent_id_unique" ON "about_page_info_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
  CREATE INDEX "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_items_thumbnail_idx" ON "about_page_values_items" USING btree ("thumbnail_id");
  CREATE INDEX "about_page_values_items_thumbnail_mobile_idx" ON "about_page_values_items" USING btree ("thumbnail_mobile_id");
  CREATE UNIQUE INDEX "about_page_values_items_locales_locale_parent_id_unique" ON "about_page_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_hero_image_hero_image_desktop_idx" ON "about_page" USING btree ("hero_image_desktop_id");
  CREATE INDEX "about_page_hero_image_hero_image_mobile_idx" ON "about_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
  CREATE INDEX "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
  CREATE INDEX "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
  CREATE INDEX "about_page_rels_departments_id_idx" ON "about_page_rels" USING btree ("departments_id");
  CREATE INDEX "departments_page_hero_image_hero_image_desktop_idx" ON "departments_page" USING btree ("hero_image_desktop_id");
  CREATE INDEX "departments_page_hero_image_hero_image_mobile_idx" ON "departments_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "departments_page_locales_locale_parent_id_unique" ON "departments_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_page_hero_lead_order_idx" ON "team_page_hero_lead" USING btree ("_order");
  CREATE INDEX "team_page_hero_lead_parent_id_idx" ON "team_page_hero_lead" USING btree ("_parent_id");
  CREATE INDEX "team_page_hero_lead_locale_idx" ON "team_page_hero_lead" USING btree ("_locale");
  CREATE INDEX "team_page_hero_stats_order_idx" ON "team_page_hero_stats" USING btree ("_order");
  CREATE INDEX "team_page_hero_stats_parent_id_idx" ON "team_page_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "team_page_hero_stats_locales_locale_parent_id_unique" ON "team_page_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_page_intro_actions_order_idx" ON "team_page_intro_actions" USING btree ("_order");
  CREATE INDEX "team_page_intro_actions_parent_id_idx" ON "team_page_intro_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "team_page_intro_actions_locales_locale_parent_id_unique" ON "team_page_intro_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_page_continents_items_order_idx" ON "team_page_continents_items" USING btree ("_order");
  CREATE INDEX "team_page_continents_items_parent_id_idx" ON "team_page_continents_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "team_page_continents_items_locales_locale_parent_id_unique" ON "team_page_continents_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_page_hero_image_hero_image_desktop_idx" ON "team_page" USING btree ("hero_image_desktop_id");
  CREATE INDEX "team_page_hero_image_hero_image_mobile_idx" ON "team_page" USING btree ("hero_image_mobile_id");
  CREATE INDEX "team_page_globe_globe_selected_country_idx" ON "team_page" USING btree ("globe_selected_country_id");
  CREATE UNIQUE INDEX "team_page_locales_locale_parent_id_unique" ON "team_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_page_hero_stats_order_idx" ON "partners_page_hero_stats" USING btree ("_order");
  CREATE INDEX "partners_page_hero_stats_parent_id_idx" ON "partners_page_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "partners_page_hero_stats_locales_locale_parent_id_unique" ON "partners_page_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_page_intro_paragraphs_order_idx" ON "partners_page_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "partners_page_intro_paragraphs_parent_id_idx" ON "partners_page_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "partners_page_intro_paragraphs_locale_idx" ON "partners_page_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "partners_page_hero_image_hero_image_desktop_idx" ON "partners_page" USING btree ("hero_image_desktop_id");
  CREATE INDEX "partners_page_hero_image_hero_image_mobile_idx" ON "partners_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "partners_page_locales_locale_parent_id_unique" ON "partners_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "career_page_hero_lead_order_idx" ON "career_page_hero_lead" USING btree ("_order");
  CREATE INDEX "career_page_hero_lead_parent_id_idx" ON "career_page_hero_lead" USING btree ("_parent_id");
  CREATE INDEX "career_page_hero_lead_locale_idx" ON "career_page_hero_lead" USING btree ("_locale");
  CREATE INDEX "career_page_roles_columns_order_idx" ON "career_page_roles_columns" USING btree ("_order");
  CREATE INDEX "career_page_roles_columns_parent_id_idx" ON "career_page_roles_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "career_page_roles_columns_locales_locale_parent_id_unique" ON "career_page_roles_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "career_page_hiring_paragraphs_order_idx" ON "career_page_hiring_paragraphs" USING btree ("_order");
  CREATE INDEX "career_page_hiring_paragraphs_parent_id_idx" ON "career_page_hiring_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "career_page_hiring_paragraphs_locale_idx" ON "career_page_hiring_paragraphs" USING btree ("_locale");
  CREATE INDEX "career_page_hiring_steps_order_idx" ON "career_page_hiring_steps" USING btree ("_order");
  CREATE INDEX "career_page_hiring_steps_parent_id_idx" ON "career_page_hiring_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "career_page_hiring_steps_locales_locale_parent_id_unique" ON "career_page_hiring_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "career_page_hero_image_hero_image_desktop_idx" ON "career_page" USING btree ("hero_image_desktop_id");
  CREATE INDEX "career_page_hero_image_hero_image_mobile_idx" ON "career_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "career_page_locales_locale_parent_id_unique" ON "career_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "theory_of_change_page_hero_lead_order_idx" ON "theory_of_change_page_hero_lead" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_hero_lead_parent_id_idx" ON "theory_of_change_page_hero_lead" USING btree ("_parent_id");
  CREATE INDEX "theory_of_change_page_hero_lead_locale_idx" ON "theory_of_change_page_hero_lead" USING btree ("_locale");
  CREATE INDEX "theory_of_change_page_hero_links_order_idx" ON "theory_of_change_page_hero_links" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_hero_links_parent_id_idx" ON "theory_of_change_page_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "theory_of_change_page_hero_links_locales_locale_parent_id_un" ON "theory_of_change_page_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "theory_of_change_page_scene_challenge_details_order_idx" ON "theory_of_change_page_scene_challenge_details" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_scene_challenge_details_parent_id_idx" ON "theory_of_change_page_scene_challenge_details" USING btree ("_parent_id");
  CREATE INDEX "theory_of_change_page_scene_challenge_details_locale_idx" ON "theory_of_change_page_scene_challenge_details" USING btree ("_locale");
  CREATE INDEX "theory_of_change_page_scene_goal_details_order_idx" ON "theory_of_change_page_scene_goal_details" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_scene_goal_details_parent_id_idx" ON "theory_of_change_page_scene_goal_details" USING btree ("_parent_id");
  CREATE INDEX "theory_of_change_page_scene_goal_details_locale_idx" ON "theory_of_change_page_scene_goal_details" USING btree ("_locale");
  CREATE INDEX "theory_of_change_page_scene_values_order_idx" ON "theory_of_change_page_scene_values" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_scene_values_parent_id_idx" ON "theory_of_change_page_scene_values" USING btree ("_parent_id");
  CREATE INDEX "theory_of_change_page_scene_values_locale_idx" ON "theory_of_change_page_scene_values" USING btree ("_locale");
  CREATE INDEX "theory_of_change_page_approach_steps_order_idx" ON "theory_of_change_page_approach_steps" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_approach_steps_parent_id_idx" ON "theory_of_change_page_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "theory_of_change_page_approach_steps_image_idx" ON "theory_of_change_page_approach_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "theory_of_change_page_approach_steps_locales_locale_parent_i" ON "theory_of_change_page_approach_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "theory_of_change_page_outcomes_columns_order_idx" ON "theory_of_change_page_outcomes_columns" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_outcomes_columns_parent_id_idx" ON "theory_of_change_page_outcomes_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "theory_of_change_page_outcomes_columns_locales_locale_parent" ON "theory_of_change_page_outcomes_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "theory_of_change_page_globe_pins_order_idx" ON "theory_of_change_page_globe_pins" USING btree ("_order");
  CREATE INDEX "theory_of_change_page_globe_pins_parent_id_idx" ON "theory_of_change_page_globe_pins" USING btree ("_parent_id");
  CREATE INDEX "theory_of_change_page_hero_image_hero_image_desktop_idx" ON "theory_of_change_page" USING btree ("hero_image_desktop_id");
  CREATE INDEX "theory_of_change_page_hero_image_hero_image_mobile_idx" ON "theory_of_change_page" USING btree ("hero_image_mobile_id");
  CREATE UNIQUE INDEX "theory_of_change_page_locales_locale_parent_id_unique" ON "theory_of_change_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_highlights" CASCADE;
  DROP TABLE "projects_link_groups_links_parts" CASCADE;
  DROP TABLE "projects_link_groups_links_parts_locales" CASCADE;
  DROP TABLE "projects_link_groups_links" CASCADE;
  DROP TABLE "projects_link_groups" CASCADE;
  DROP TABLE "projects_link_groups_locales" CASCADE;
  DROP TABLE "projects_cta_actions" CASCADE;
  DROP TABLE "projects_cta_actions_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_highlights" CASCADE;
  DROP TABLE "_projects_v_version_link_groups_links_parts" CASCADE;
  DROP TABLE "_projects_v_version_link_groups_links_parts_locales" CASCADE;
  DROP TABLE "_projects_v_version_link_groups_links" CASCADE;
  DROP TABLE "_projects_v_version_link_groups" CASCADE;
  DROP TABLE "_projects_v_version_link_groups_locales" CASCADE;
  DROP TABLE "_projects_v_version_cta_actions" CASCADE;
  DROP TABLE "_projects_v_version_cta_actions_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "publications_authors" CASCADE;
  DROP TABLE "publications_authors_locales" CASCADE;
  DROP TABLE "publications_blocks_rich_text" CASCADE;
  DROP TABLE "publications_blocks_rich_text_locales" CASCADE;
  DROP TABLE "publications_blocks_stats_items" CASCADE;
  DROP TABLE "publications_blocks_stats_items_locales" CASCADE;
  DROP TABLE "publications_blocks_stats" CASCADE;
  DROP TABLE "publications_blocks_stats_locales" CASCADE;
  DROP TABLE "publications_blocks_image" CASCADE;
  DROP TABLE "publications_link_groups_links_parts" CASCADE;
  DROP TABLE "publications_link_groups_links_parts_locales" CASCADE;
  DROP TABLE "publications_link_groups_links" CASCADE;
  DROP TABLE "publications_link_groups" CASCADE;
  DROP TABLE "publications_link_groups_locales" CASCADE;
  DROP TABLE "publications_cta_actions" CASCADE;
  DROP TABLE "publications_cta_actions_locales" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "publications_locales" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "_publications_v_version_authors" CASCADE;
  DROP TABLE "_publications_v_version_authors_locales" CASCADE;
  DROP TABLE "_publications_v_blocks_rich_text" CASCADE;
  DROP TABLE "_publications_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_publications_v_blocks_stats_items" CASCADE;
  DROP TABLE "_publications_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_publications_v_blocks_stats" CASCADE;
  DROP TABLE "_publications_v_blocks_stats_locales" CASCADE;
  DROP TABLE "_publications_v_blocks_image" CASCADE;
  DROP TABLE "_publications_v_version_link_groups_links_parts" CASCADE;
  DROP TABLE "_publications_v_version_link_groups_links_parts_locales" CASCADE;
  DROP TABLE "_publications_v_version_link_groups_links" CASCADE;
  DROP TABLE "_publications_v_version_link_groups" CASCADE;
  DROP TABLE "_publications_v_version_link_groups_locales" CASCADE;
  DROP TABLE "_publications_v_version_cta_actions" CASCADE;
  DROP TABLE "_publications_v_version_cta_actions_locales" CASCADE;
  DROP TABLE "_publications_v" CASCADE;
  DROP TABLE "_publications_v_locales" CASCADE;
  DROP TABLE "_publications_v_rels" CASCADE;
  DROP TABLE "testimonials_paragraphs" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "regions" CASCADE;
  DROP TABLE "regions_locales" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "publication_categories" CASCADE;
  DROP TABLE "publication_categories_locales" CASCADE;
  DROP TABLE "services_intro_paragraphs" CASCADE;
  DROP TABLE "services_blocks_paragraph" CASCADE;
  DROP TABLE "services_blocks_paragraph_locales" CASCADE;
  DROP TABLE "services_blocks_list_items" CASCADE;
  DROP TABLE "services_blocks_list" CASCADE;
  DROP TABLE "services_offerings_items_deliverables" CASCADE;
  DROP TABLE "services_offerings_items" CASCADE;
  DROP TABLE "services_offerings_items_locales" CASCADE;
  DROP TABLE "services_values_items" CASCADE;
  DROP TABLE "services_values_items_locales" CASCADE;
  DROP TABLE "services_approach_paragraphs" CASCADE;
  DROP TABLE "services_card_paragraphs" CASCADE;
  DROP TABLE "services_cta_card_paragraphs" CASCADE;
  DROP TABLE "services_home_paragraphs" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v_version_intro_paragraphs" CASCADE;
  DROP TABLE "_services_v_blocks_paragraph" CASCADE;
  DROP TABLE "_services_v_blocks_paragraph_locales" CASCADE;
  DROP TABLE "_services_v_blocks_list_items" CASCADE;
  DROP TABLE "_services_v_blocks_list" CASCADE;
  DROP TABLE "_services_v_version_offerings_items_deliverables" CASCADE;
  DROP TABLE "_services_v_version_offerings_items" CASCADE;
  DROP TABLE "_services_v_version_offerings_items_locales" CASCADE;
  DROP TABLE "_services_v_version_values_items" CASCADE;
  DROP TABLE "_services_v_version_values_items_locales" CASCADE;
  DROP TABLE "_services_v_version_approach_paragraphs" CASCADE;
  DROP TABLE "_services_v_version_card_paragraphs" CASCADE;
  DROP TABLE "_services_v_version_cta_card_paragraphs" CASCADE;
  DROP TABLE "_services_v_version_home_paragraphs" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "tools_description" CASCADE;
  DROP TABLE "tools" CASCADE;
  DROP TABLE "tools_rels" CASCADE;
  DROP TABLE "tool_categories" CASCADE;
  DROP TABLE "tool_categories_locales" CASCADE;
  DROP TABLE "cta_banners_actions" CASCADE;
  DROP TABLE "cta_banners_actions_locales" CASCADE;
  DROP TABLE "cta_banners" CASCADE;
  DROP TABLE "cta_banners_locales" CASCADE;
  DROP TABLE "events_blocks_member" CASCADE;
  DROP TABLE "events_blocks_external" CASCADE;
  DROP TABLE "events_blocks_external_locales" CASCADE;
  DROP TABLE "events_gallery" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v_blocks_member" CASCADE;
  DROP TABLE "_events_v_blocks_external" CASCADE;
  DROP TABLE "_events_v_blocks_external_locales" CASCADE;
  DROP TABLE "_events_v_version_gallery" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "event_types" CASCADE;
  DROP TABLE "event_types_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "team_members_social_links" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "team_members_rels" CASCADE;
  DROP TABLE "departments_detail_topics" CASCADE;
  DROP TABLE "departments_detail_topics_locales" CASCADE;
  DROP TABLE "departments" CASCADE;
  DROP TABLE "departments_locales" CASCADE;
  DROP TABLE "_departments_v_version_detail_topics" CASCADE;
  DROP TABLE "_departments_v_version_detail_topics_locales" CASCADE;
  DROP TABLE "_departments_v" CASCADE;
  DROP TABLE "_departments_v_locales" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "countries_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_slides" CASCADE;
  DROP TABLE "home_page_hero_slides_locales" CASCADE;
  DROP TABLE "home_page_intro_paragraphs" CASCADE;
  DROP TABLE "home_page_intro_actions" CASCADE;
  DROP TABLE "home_page_intro_actions_locales" CASCADE;
  DROP TABLE "home_page_stats" CASCADE;
  DROP TABLE "home_page_stats_locales" CASCADE;
  DROP TABLE "home_page_tools_paragraphs" CASCADE;
  DROP TABLE "home_page_tools_logos" CASCADE;
  DROP TABLE "home_page_steps_items_paragraphs" CASCADE;
  DROP TABLE "home_page_steps_items" CASCADE;
  DROP TABLE "home_page_steps_items_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "site_header_blocks_link_group_links" CASCADE;
  DROP TABLE "site_header_blocks_link_group_links_locales" CASCADE;
  DROP TABLE "site_header_blocks_link_group" CASCADE;
  DROP TABLE "site_header_blocks_link_group_locales" CASCADE;
  DROP TABLE "site_header_blocks_services_group" CASCADE;
  DROP TABLE "site_header_blocks_services_group_locales" CASCADE;
  DROP TABLE "site_header" CASCADE;
  DROP TABLE "site_header_locales" CASCADE;
  DROP TABLE "site_footer_cta_headline" CASCADE;
  DROP TABLE "site_footer_blocks_link_column_links" CASCADE;
  DROP TABLE "site_footer_blocks_link_column_links_locales" CASCADE;
  DROP TABLE "site_footer_blocks_link_column" CASCADE;
  DROP TABLE "site_footer_blocks_link_column_locales" CASCADE;
  DROP TABLE "site_footer_blocks_services_column" CASCADE;
  DROP TABLE "site_footer_blocks_services_column_locales" CASCADE;
  DROP TABLE "site_footer_legal" CASCADE;
  DROP TABLE "site_footer_legal_locales" CASCADE;
  DROP TABLE "site_footer" CASCADE;
  DROP TABLE "site_footer_locales" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "success_stories_page" CASCADE;
  DROP TABLE "success_stories_page_locales" CASCADE;
  DROP TABLE "success_stories_page_rels" CASCADE;
  DROP TABLE "publications_page" CASCADE;
  DROP TABLE "publications_page_locales" CASCADE;
  DROP TABLE "services_page_intro_columns" CASCADE;
  DROP TABLE "services_page_approach_steps" CASCADE;
  DROP TABLE "services_page_approach_steps_locales" CASCADE;
  DROP TABLE "services_page_values_items" CASCADE;
  DROP TABLE "services_page_values_items_locales" CASCADE;
  DROP TABLE "services_page_cta_actions" CASCADE;
  DROP TABLE "services_page_cta_actions_locales" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "services_page_locales" CASCADE;
  DROP TABLE "tools_page_intro_paragraphs" CASCADE;
  DROP TABLE "tools_page" CASCADE;
  DROP TABLE "tools_page_locales" CASCADE;
  DROP TABLE "news_events_page" CASCADE;
  DROP TABLE "news_events_page_locales" CASCADE;
  DROP TABLE "about_page_hero_links" CASCADE;
  DROP TABLE "about_page_hero_links_locales" CASCADE;
  DROP TABLE "about_page_intro_paragraphs" CASCADE;
  DROP TABLE "about_page_intro_actions" CASCADE;
  DROP TABLE "about_page_intro_actions_locales" CASCADE;
  DROP TABLE "about_page_info_cards_paragraphs" CASCADE;
  DROP TABLE "about_page_info_cards" CASCADE;
  DROP TABLE "about_page_info_cards_locales" CASCADE;
  DROP TABLE "about_page_values_items" CASCADE;
  DROP TABLE "about_page_values_items_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "about_page_rels" CASCADE;
  DROP TABLE "departments_page" CASCADE;
  DROP TABLE "departments_page_locales" CASCADE;
  DROP TABLE "team_page_hero_lead" CASCADE;
  DROP TABLE "team_page_hero_stats" CASCADE;
  DROP TABLE "team_page_hero_stats_locales" CASCADE;
  DROP TABLE "team_page_intro_actions" CASCADE;
  DROP TABLE "team_page_intro_actions_locales" CASCADE;
  DROP TABLE "team_page_continents_items" CASCADE;
  DROP TABLE "team_page_continents_items_locales" CASCADE;
  DROP TABLE "team_page" CASCADE;
  DROP TABLE "team_page_locales" CASCADE;
  DROP TABLE "partners_page_hero_stats" CASCADE;
  DROP TABLE "partners_page_hero_stats_locales" CASCADE;
  DROP TABLE "partners_page_intro_paragraphs" CASCADE;
  DROP TABLE "partners_page" CASCADE;
  DROP TABLE "partners_page_locales" CASCADE;
  DROP TABLE "career_page_hero_lead" CASCADE;
  DROP TABLE "career_page_roles_columns" CASCADE;
  DROP TABLE "career_page_roles_columns_locales" CASCADE;
  DROP TABLE "career_page_hiring_paragraphs" CASCADE;
  DROP TABLE "career_page_hiring_steps" CASCADE;
  DROP TABLE "career_page_hiring_steps_locales" CASCADE;
  DROP TABLE "career_page" CASCADE;
  DROP TABLE "career_page_locales" CASCADE;
  DROP TABLE "theory_of_change_page_hero_lead" CASCADE;
  DROP TABLE "theory_of_change_page_hero_links" CASCADE;
  DROP TABLE "theory_of_change_page_hero_links_locales" CASCADE;
  DROP TABLE "theory_of_change_page_scene_challenge_details" CASCADE;
  DROP TABLE "theory_of_change_page_scene_goal_details" CASCADE;
  DROP TABLE "theory_of_change_page_scene_values" CASCADE;
  DROP TABLE "theory_of_change_page_approach_steps" CASCADE;
  DROP TABLE "theory_of_change_page_approach_steps_locales" CASCADE;
  DROP TABLE "theory_of_change_page_outcomes_columns" CASCADE;
  DROP TABLE "theory_of_change_page_outcomes_columns_locales" CASCADE;
  DROP TABLE "theory_of_change_page_globe_pins" CASCADE;
  DROP TABLE "theory_of_change_page" CASCADE;
  DROP TABLE "theory_of_change_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_projects_cta_actions_emphasis";
  DROP TYPE "public"."enum_projects_project_status";
  DROP TYPE "public"."enum_projects_frame";
  DROP TYPE "public"."enum_projects_contact_kind";
  DROP TYPE "public"."enum_projects_home_title_lines";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_cta_actions_emphasis";
  DROP TYPE "public"."enum__projects_v_version_project_status";
  DROP TYPE "public"."enum__projects_v_version_frame";
  DROP TYPE "public"."enum__projects_v_version_contact_kind";
  DROP TYPE "public"."enum__projects_v_version_home_title_lines";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_publications_authors_kind";
  DROP TYPE "public"."enum_publications_blocks_stats_items_icon";
  DROP TYPE "public"."enum_publications_cta_actions_emphasis";
  DROP TYPE "public"."enum_publications_type";
  DROP TYPE "public"."enum_publications_frame";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum__publications_v_version_authors_kind";
  DROP TYPE "public"."enum__publications_v_blocks_stats_items_icon";
  DROP TYPE "public"."enum__publications_v_version_cta_actions_emphasis";
  DROP TYPE "public"."enum__publications_v_version_type";
  DROP TYPE "public"."enum__publications_v_version_frame";
  DROP TYPE "public"."enum__publications_v_version_status";
  DROP TYPE "public"."enum__publications_v_published_locale";
  DROP TYPE "public"."enum_services_offerings_items_icon";
  DROP TYPE "public"."enum_services_offerings_items_accent";
  DROP TYPE "public"."enum_services_hero_background";
  DROP TYPE "public"."enum_services_values_columns";
  DROP TYPE "public"."enum_services_cta_background";
  DROP TYPE "public"."enum_services_cta_collage";
  DROP TYPE "public"."enum_services_cta_card_icon";
  DROP TYPE "public"."enum_services_cta_card_icon_tone";
  DROP TYPE "public"."enum_services_cta_card_frame";
  DROP TYPE "public"."enum_services_navigation_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_offerings_items_icon";
  DROP TYPE "public"."enum__services_v_version_offerings_items_accent";
  DROP TYPE "public"."enum__services_v_version_hero_background";
  DROP TYPE "public"."enum__services_v_version_values_columns";
  DROP TYPE "public"."enum__services_v_version_cta_background";
  DROP TYPE "public"."enum__services_v_version_cta_collage";
  DROP TYPE "public"."enum__services_v_version_cta_card_icon";
  DROP TYPE "public"."enum__services_v_version_cta_card_icon_tone";
  DROP TYPE "public"."enum__services_v_version_cta_card_frame";
  DROP TYPE "public"."enum__services_v_version_navigation_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_tools_role";
  DROP TYPE "public"."enum_tool_categories_tone";
  DROP TYPE "public"."enum_cta_banners_actions_emphasis";
  DROP TYPE "public"."enum_cta_banners_tone";
  DROP TYPE "public"."enum_cta_banners_collage";
  DROP TYPE "public"."enum_events_poster_fit";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_poster_fit";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_redirects_status_code";
  DROP TYPE "public"."enum_team_members_social_links_kind";
  DROP TYPE "public"."enum_team_members_glow";
  DROP TYPE "public"."enum_departments_detail_topics_icon";
  DROP TYPE "public"."enum_departments_icon";
  DROP TYPE "public"."enum_departments_accent";
  DROP TYPE "public"."enum_departments_detail_hero_background";
  DROP TYPE "public"."enum_departments_detail_hero_ornament";
  DROP TYPE "public"."enum_departments_detail_mobile_column";
  DROP TYPE "public"."enum_departments_status";
  DROP TYPE "public"."enum__departments_v_version_detail_topics_icon";
  DROP TYPE "public"."enum__departments_v_version_icon";
  DROP TYPE "public"."enum__departments_v_version_accent";
  DROP TYPE "public"."enum__departments_v_version_detail_hero_background";
  DROP TYPE "public"."enum__departments_v_version_detail_hero_ornament";
  DROP TYPE "public"."enum__departments_v_version_detail_mobile_column";
  DROP TYPE "public"."enum__departments_v_version_status";
  DROP TYPE "public"."enum__departments_v_published_locale";
  DROP TYPE "public"."enum_countries_continent";
  DROP TYPE "public"."enum_partners_group";
  DROP TYPE "public"."enum_jobs_theme";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_home_page_intro_actions_variant";
  DROP TYPE "public"."enum_home_page_stats_icon";
  DROP TYPE "public"."enum_site_header_blocks_link_group_desktop";
  DROP TYPE "public"."enum_site_header_blocks_link_group_mobile";
  DROP TYPE "public"."enum_site_settings_social_links_kind";
  DROP TYPE "public"."enum_services_page_cta_actions_emphasis";
  DROP TYPE "public"."enum_about_page_intro_actions_variant";
  DROP TYPE "public"."enum_departments_page_hero_icon";
  DROP TYPE "public"."enum_team_page_hero_stats_icon";
  DROP TYPE "public"."enum_team_page_hero_stats_tone";
  DROP TYPE "public"."enum_team_page_intro_actions_variant";
  DROP TYPE "public"."enum_partners_page_hero_stats_icon";
  DROP TYPE "public"."enum_partners_page_hero_stats_tone";
  DROP TYPE "public"."enum_career_page_hiring_steps_icon";
  DROP TYPE "public"."enum_career_page_hero_icon";
  DROP TYPE "public"."enum_theory_of_change_page_outcomes_columns_icon";
  DROP TYPE "public"."enum_theory_of_change_page_outcomes_columns_tone";
  DROP TYPE "public"."enum_theory_of_change_page_globe_pins_icon";`)
}
