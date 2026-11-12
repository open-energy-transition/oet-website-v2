import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_intro_actions_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum__home_page_v_version_stats_icon" AS ENUM('blueprint', 'handshake', 'employees', 'world', 'folder-edit', 'license');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_success_stories_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__success_stories_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__success_stories_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_publications_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_services_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_page_v_version_cta_actions_emphasis" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__services_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_tools_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tools_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tools_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_news_events_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_events_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_events_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_intro_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_departments_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__departments_page_v_version_hero_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__departments_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__departments_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_team_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_page_v_version_hero_stats_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__team_page_v_version_hero_stats_tone" AS ENUM('brand', 'light');
  CREATE TYPE "public"."enum__team_page_v_version_intro_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__team_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_partners_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_version_hero_stats_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__partners_page_v_version_hero_stats_tone" AS ENUM('brand', 'light');
  CREATE TYPE "public"."enum__partners_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_career_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__career_page_v_version_hiring_steps_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__career_page_v_version_hero_icon" AS ENUM('angle-circle-right', 'angle-double-small-up', 'angle-left', 'angle-right', 'architect-plan', 'arrow-down', 'arrow-right', 'attribution-pen', 'ballot-check', 'blueprint', 'book-open-reader', 'box-connection', 'calendars', 'check-circle', 'chevron-down', 'chevron-right', 'circle-bolt', 'circle-dashed', 'circle-user', 'clock-ten', 'close', 'close-small', 'code-fork', 'code-merge', 'comment-heart', 'compliance-document', 'data-migration', 'data-model', 'dictionary-alt', 'digital-id', 'diploma', 'discussion-idea', 'document', 'download', 'employees', 'envelope', 'family-law', 'folder-edit', 'github', 'globe', 'globe-alt', 'globe-lines', 'grid', 'handshake', 'heart-partner-handshake', 'land-location', 'laptop', 'laptop-code', 'leadership-alt', 'license', 'link-horizontal', 'linkedin', 'magnifying-glass-eye', 'map-pin', 'marker', 'medical-star', 'meeting', 'menu', 'model-cube-space', 'online-interview', 'paper-plane', 'people-group', 'person-rays', 'person-through-window', 'personal-finance', 'plan-strategy', 'play-circle', 'population-globe', 'referral-alt', 'search-alt', 'service-column', 'service-engineer', 'service-government', 'service-monitor', 'service-pylon', 'service-research', 'software-development', 'solar-system', 'sort', 'square-bolt', 'table-list', 'tags', 'tasks', 'team', 'team-check', 'time-quarter-to', 'tools', 'user-headset', 'woman-scientist', 'workshop', 'world', 'worldwide-network', 'yoga-ball');
  CREATE TYPE "public"."enum__career_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__career_page_v_published_locale" AS ENUM('en');
  CREATE TYPE "public"."enum_theory_of_change_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__theory_of_change_page_v_version_outcomes_columns_icon" AS ENUM('medical-star', 'employees', 'referral-alt', 'book-open-reader');
  CREATE TYPE "public"."enum__theory_of_change_page_v_version_outcomes_columns_tone" AS ENUM('brand-400', 'brand-500', 'brand-800', 'brand-900');
  CREATE TYPE "public"."enum__theory_of_change_page_v_version_globe_pins_icon" AS ENUM('code-merge', 'code-fork', 'people-group', 'link-horizontal', 'box-connection', 'tools');
  CREATE TYPE "public"."enum__theory_of_change_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__theory_of_change_page_v_published_locale" AS ENUM('en');
  CREATE TABLE "_home_page_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_mobile_id" integer,
  	"thumbnail_id" integer,
  	"pattern_image_id" integer,
  	"pattern_left" numeric,
  	"pattern_top" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_hero_slides_locales" (
  	"label" varchar,
  	"title" varchar,
  	"statement" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_intro_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"variant" "enum__home_page_v_version_intro_actions_variant",
  	"arrow" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_intro_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum__home_page_v_version_stats_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_tools_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_tools_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"width" numeric,
  	"height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_steps_items_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_steps_items_locales" (
  	"title" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_primary_action_href" varchar,
  	"version_hero_secondary_action_href" varchar,
  	"version_intro_image_id" integer,
  	"version_tools_action_href" varchar,
  	"version_partners_visible" boolean DEFAULT true,
  	"version_projects_visible" boolean DEFAULT true,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_page_v_locales" (
  	"version_hero_primary_action_label" varchar,
  	"version_hero_secondary_action_label" varchar,
  	"version_intro_tag" varchar,
  	"version_intro_title" varchar,
  	"version_services_tag" varchar,
  	"version_services_title" varchar,
  	"version_tools_tag" varchar,
  	"version_tools_title" varchar,
  	"version_tools_action_label" varchar,
  	"version_steps_tag" varchar,
  	"version_steps_title" varchar,
  	"version_partners_trusted_partners_label" varchar,
  	"version_partners_networks_label" varchar,
  	"version_projects_tag" varchar,
  	"version_projects_title" varchar,
  	"version_projects_carousel_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_success_stories_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version__status" "enum__success_stories_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__success_stories_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_success_stories_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_link_label" varchar,
  	"version_listing_title" varchar,
  	"version_listing_description" varchar,
  	"version_listing_tabs_completed" varchar,
  	"version_listing_tabs_in_progress" varchar,
  	"version_testimonials_heading" varchar,
  	"version_testimonials_subline" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_success_stories_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_publications_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version__status" "enum__publications_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__publications_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_publications_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_chips_academic" varchar,
  	"version_hero_chips_blogs" varchar,
  	"version_hero_chips_policy_briefs" varchar,
  	"version_hero_chips_reports" varchar,
  	"version_listing_title" varchar,
  	"version_listing_tabs_academic" varchar,
  	"version_listing_tabs_blogs" varchar,
  	"version_listing_tabs_policy_briefs" varchar,
  	"version_listing_tabs_reports" varchar,
  	"version_outputs_title" varchar,
  	"version_outputs_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_page_v_version_intro_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_page_v_version_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_page_v_version_approach_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_page_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer,
  	"thumbnail_mobile_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_page_v_version_values_items_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_page_v_version_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"emphasis" "enum__services_page_v_version_cta_actions_emphasis",
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_page_v_version_cta_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_approach_illustration_id" integer,
  	"version__status" "enum__services_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_link_label" varchar,
  	"version_intro_tag" varchar,
  	"version_intro_title" varchar,
  	"version_approach_tag" varchar,
  	"version_approach_title" varchar,
  	"version_values_tag" varchar,
  	"version_values_title" varchar,
  	"version_cta_heading" varchar,
  	"version_cta_text" varchar,
  	"version_detail_eyebrow" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_tools_page_v_version_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_cta_id" integer,
  	"version__status" "enum__tools_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__tools_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_tools_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_link_label" varchar,
  	"version_intro_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_events_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_cta_support_id" integer,
  	"version_cta_discuss_id" integer,
  	"version_cta_updates_id" integer,
  	"version__status" "enum__news_events_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_events_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_events_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_link_label" varchar,
  	"version_listing_title" varchar,
  	"version_listing_description" varchar,
  	"version_listing_state_labels_all" varchar,
  	"version_listing_state_labels_highlighted" varchar,
  	"version_listing_state_labels_upcoming" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_hero_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_intro_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"variant" "enum__about_page_v_version_intro_actions_variant",
  	"arrow" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_intro_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_info_cards_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"action_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_info_cards_locales" (
  	"title" varchar,
  	"action_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"thumbnail_id" integer,
  	"thumbnail_mobile_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_values_items_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_desktop_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_about_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_intro_statement" varchar,
  	"version_departments_tag" varchar,
  	"version_departments_title" varchar,
  	"version_values_tag" varchar,
  	"version_values_title" varchar,
  	"version_values_subline" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "_departments_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_desktop_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_hero_count_value" varchar,
  	"version_hero_icon" "enum__departments_page_v_version_hero_icon",
  	"version__status" "enum__departments_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__departments_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_departments_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_lead" varchar,
  	"version_hero_count_label" varchar,
  	"version_listing_tag" varchar,
  	"version_listing_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_team_page_v_version_hero_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_team_page_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum__team_page_v_version_hero_stats_icon",
  	"tone" "enum__team_page_v_version_hero_stats_tone",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_team_page_v_version_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_team_page_v_version_intro_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"variant" "enum__team_page_v_version_intro_actions_variant",
  	"arrow" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_team_page_v_version_intro_actions_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_team_page_v_version_continents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_team_page_v_version_continents_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_team_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_desktop_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_globe_view_longitude" numeric,
  	"version_globe_view_latitude" numeric,
  	"version_globe_selected_country_id" integer,
  	"version__status" "enum__team_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__team_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_team_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_intro_tag" varchar,
  	"version_intro_title" varchar,
  	"version_intro_subline" varchar,
  	"version_continents_label" varchar,
  	"version_listing_title" varchar,
  	"version_listing_mobile_description" varchar,
  	"version_listing_senior_leadership_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_page_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"icon" "enum__partners_page_v_version_hero_stats_icon",
  	"tone" "enum__partners_page_v_version_hero_stats_tone",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_partners_page_v_version_hero_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_page_v_version_intro_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_partners_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_desktop_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version__status" "enum__partners_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__partners_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_partners_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_intro_statement" varchar,
  	"version_filter_funders_label" varchar,
  	"version_filter_partners_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_career_page_v_version_hero_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_career_page_v_version_roles_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_html" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_career_page_v_version_roles_columns_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_career_page_v_version_hiring_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_career_page_v_version_hiring_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__career_page_v_version_hiring_steps_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_career_page_v_version_hiring_steps_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_career_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_desktop_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_hero_icon" "enum__career_page_v_version_hero_icon",
  	"version_hero_count_value" varchar,
  	"version_hero_action_href" varchar,
  	"version__status" "enum__career_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__career_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_career_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_count_label" varchar,
  	"version_hero_action_label" varchar,
  	"version_roles_tag" varchar,
  	"version_roles_title" varchar,
  	"version_hiring_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_hero_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_hero_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_scene_challenge_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_scene_goal_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_scene_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_approach_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_outcomes_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__theory_of_change_page_v_version_outcomes_columns_icon",
  	"tone" "enum__theory_of_change_page_v_version_outcomes_columns_tone",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_outcomes_columns_locales" (
  	"output" varchar,
  	"description" varchar,
  	"outcome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_theory_of_change_page_v_version_globe_pins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__theory_of_change_page_v_version_globe_pins_icon",
  	"longitude" numeric,
  	"latitude" numeric,
  	"scale" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_of_change_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_desktop_id" integer,
  	"version_hero_image_mobile_id" integer,
  	"version_globe_view_longitude" numeric,
  	"version_globe_view_latitude" numeric,
  	"version__status" "enum__theory_of_change_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__theory_of_change_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_theory_of_change_page_v_locales" (
  	"version_hero_title" varchar,
  	"version_scene_challenge_label" varchar,
  	"version_scene_challenge_statement" varchar,
  	"version_scene_challenge_emphasis" varchar,
  	"version_scene_goal_label" varchar,
  	"version_scene_goal_statement" varchar,
  	"version_scene_goal_emphasis" varchar,
  	"version_approach_mobile_tag" varchar,
  	"version_approach_title" varchar,
  	"version_approach_subline" varchar,
  	"version_outcomes_title" varchar,
  	"version_impact_title" varchar,
  	"version_impact_text" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "image_mobile_id" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "thumbnail_id" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "pattern_image_id" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "pattern_left" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "pattern_top" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "statement" DROP NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "home_page_intro_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "home_page_intro_actions" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "home_page_intro_actions" ALTER COLUMN "variant" DROP NOT NULL;
  ALTER TABLE "home_page_intro_actions" ALTER COLUMN "arrow" DROP NOT NULL;
  ALTER TABLE "home_page_intro_actions_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "home_page_stats" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "home_page_stats" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "home_page_stats_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "home_page_tools_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "width" DROP NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "height" DROP NOT NULL;
  ALTER TABLE "home_page_steps_items_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "home_page_steps_items" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "home_page_steps_items_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "home_page_steps_items_locales" ALTER COLUMN "note" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "hero_primary_action_href" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "hero_secondary_action_href" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "intro_image_id" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "tools_action_href" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "partners_visible" DROP NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "projects_visible" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "hero_primary_action_label" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "hero_secondary_action_label" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "intro_tag" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "intro_title" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "services_tag" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "services_title" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "tools_tag" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "tools_title" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "tools_action_label" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "steps_tag" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "steps_title" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "partners_trusted_partners_label" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "partners_networks_label" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "projects_tag" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "projects_title" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "projects_carousel_label" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "success_stories_page" ALTER COLUMN "hero_image_id" DROP NOT NULL;
  ALTER TABLE "success_stories_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "hero_link_label" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_title" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_description" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_tabs_completed" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_tabs_in_progress" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "testimonials_heading" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "testimonials_subline" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "publications_page" ALTER COLUMN "hero_image_id" DROP NOT NULL;
  ALTER TABLE "publications_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_academic" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_blogs" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_policy_briefs" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_reports" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_title" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_academic" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_blogs" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_policy_briefs" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_reports" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "outputs_title" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "outputs_description" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "services_page_intro_columns" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "services_page_approach_steps_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "services_page_approach_steps_locales" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "services_page_values_items" ALTER COLUMN "thumbnail_id" DROP NOT NULL;
  ALTER TABLE "services_page_values_items" ALTER COLUMN "thumbnail_mobile_id" DROP NOT NULL;
  ALTER TABLE "services_page_values_items_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "services_page_values_items_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "services_page_values_items_locales" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "services_page_cta_actions" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "services_page_cta_actions" ALTER COLUMN "emphasis" DROP NOT NULL;
  ALTER TABLE "services_page_cta_actions" ALTER COLUMN "new_tab" DROP NOT NULL;
  ALTER TABLE "services_page_cta_actions_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_image_id" DROP NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "approach_illustration_id" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "hero_link_label" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "intro_tag" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "intro_title" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "approach_tag" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "approach_title" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "values_tag" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "values_title" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "cta_heading" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "cta_text" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "detail_eyebrow" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "tools_page_intro_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "tools_page" ALTER COLUMN "hero_image_id" DROP NOT NULL;
  ALTER TABLE "tools_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "tools_page" ALTER COLUMN "cta_id" DROP NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "hero_eyebrow" DROP NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "hero_link_label" DROP NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "intro_title" DROP NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "hero_image_id" DROP NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "cta_support_id" DROP NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "cta_discuss_id" DROP NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "cta_updates_id" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "hero_link_label" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_title" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_description" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_state_labels_all" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_state_labels_highlighted" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_state_labels_upcoming" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "about_page_hero_links" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "about_page_hero_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "about_page_intro_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "about_page_intro_actions" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "about_page_intro_actions" ALTER COLUMN "variant" DROP NOT NULL;
  ALTER TABLE "about_page_intro_actions_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "about_page_info_cards_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "about_page_info_cards" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "about_page_info_cards_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "about_page_values_items" ALTER COLUMN "thumbnail_id" DROP NOT NULL;
  ALTER TABLE "about_page_values_items" ALTER COLUMN "thumbnail_mobile_id" DROP NOT NULL;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "about_page" ALTER COLUMN "hero_image_desktop_id" DROP NOT NULL;
  ALTER TABLE "about_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "intro_statement" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "departments_tag" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "departments_title" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "values_tag" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "values_title" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "values_subline" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_image_desktop_id" DROP NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_count_value" DROP NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_icon" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "hero_lead" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "hero_count_label" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "listing_tag" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "listing_title" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "team_page_hero_lead" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "team_page_hero_stats" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "team_page_hero_stats" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "team_page_hero_stats" ALTER COLUMN "tone" DROP NOT NULL;
  ALTER TABLE "team_page_hero_stats_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "team_page_intro_actions" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "team_page_intro_actions" ALTER COLUMN "variant" DROP NOT NULL;
  ALTER TABLE "team_page_intro_actions_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "team_page_continents_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "team_page_continents_items_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "hero_image_desktop_id" DROP NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "globe_view_longitude" DROP NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "globe_view_latitude" DROP NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "globe_selected_country_id" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "intro_tag" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "intro_title" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "intro_subline" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "continents_label" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "listing_title" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "listing_mobile_description" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "listing_senior_leadership_label" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "partners_page_hero_stats" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "partners_page_hero_stats" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "partners_page_hero_stats" ALTER COLUMN "tone" DROP NOT NULL;
  ALTER TABLE "partners_page_hero_stats_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "partners_page_intro_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "partners_page" ALTER COLUMN "hero_image_desktop_id" DROP NOT NULL;
  ALTER TABLE "partners_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "intro_statement" DROP NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "filter_funders_label" DROP NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "filter_partners_label" DROP NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "career_page_hero_lead" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "career_page_roles_columns_locales" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "career_page_hiring_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "career_page_hiring_steps" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "career_page_hiring_steps_locales" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_image_desktop_id" DROP NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_icon" DROP NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_count_value" DROP NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_action_href" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hero_count_label" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hero_action_label" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "roles_tag" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "roles_title" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hiring_title" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_hero_lead" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_hero_links" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_hero_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_scene_challenge_details" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_scene_goal_details" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_scene_values" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_approach_steps_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_approach_steps_locales" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns" ALTER COLUMN "tone" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ALTER COLUMN "output" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ALTER COLUMN "outcome" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "longitude" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "latitude" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "scale" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "hero_image_desktop_id" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "hero_image_mobile_id" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "globe_view_longitude" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "globe_view_latitude" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "hero_title" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_challenge_label" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_challenge_statement" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_goal_label" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_goal_statement" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "approach_mobile_tag" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "approach_title" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "approach_subline" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "outcomes_title" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "impact_title" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "impact_text" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "meta_title" DROP NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "_status" "enum_home_page_status" DEFAULT 'draft';
  ALTER TABLE "success_stories_page" ADD COLUMN "_status" "enum_success_stories_page_status" DEFAULT 'draft';
  ALTER TABLE "publications_page" ADD COLUMN "_status" "enum_publications_page_status" DEFAULT 'draft';
  ALTER TABLE "services_page" ADD COLUMN "_status" "enum_services_page_status" DEFAULT 'draft';
  ALTER TABLE "tools_page" ADD COLUMN "_status" "enum_tools_page_status" DEFAULT 'draft';
  ALTER TABLE "news_events_page" ADD COLUMN "_status" "enum_news_events_page_status" DEFAULT 'draft';
  ALTER TABLE "about_page" ADD COLUMN "_status" "enum_about_page_status" DEFAULT 'draft';
  ALTER TABLE "departments_page" ADD COLUMN "_status" "enum_departments_page_status" DEFAULT 'draft';
  ALTER TABLE "team_page" ADD COLUMN "_status" "enum_team_page_status" DEFAULT 'draft';
  ALTER TABLE "partners_page" ADD COLUMN "_status" "enum_partners_page_status" DEFAULT 'draft';
  ALTER TABLE "career_page" ADD COLUMN "_status" "enum_career_page_status" DEFAULT 'draft';
  ALTER TABLE "theory_of_change_page" ADD COLUMN "_status" "enum_theory_of_change_page_status" DEFAULT 'draft';
  UPDATE "home_page" SET "_status" = 'published';
  UPDATE "success_stories_page" SET "_status" = 'published';
  UPDATE "publications_page" SET "_status" = 'published';
  UPDATE "services_page" SET "_status" = 'published';
  UPDATE "tools_page" SET "_status" = 'published';
  UPDATE "news_events_page" SET "_status" = 'published';
  UPDATE "about_page" SET "_status" = 'published';
  UPDATE "departments_page" SET "_status" = 'published';
  UPDATE "team_page" SET "_status" = 'published';
  UPDATE "partners_page" SET "_status" = 'published';
  UPDATE "career_page" SET "_status" = 'published';
  UPDATE "theory_of_change_page" SET "_status" = 'published';
  ALTER TABLE "_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_pattern_image_id_media_id_fk" FOREIGN KEY ("pattern_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_slides" ADD CONSTRAINT "_home_page_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_slides_locales" ADD CONSTRAINT "_home_page_v_version_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_intro_paragraphs" ADD CONSTRAINT "_home_page_v_version_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_intro_actions" ADD CONSTRAINT "_home_page_v_version_intro_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_intro_actions_locales" ADD CONSTRAINT "_home_page_v_version_intro_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_intro_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_stats" ADD CONSTRAINT "_home_page_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_stats_locales" ADD CONSTRAINT "_home_page_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_tools_paragraphs" ADD CONSTRAINT "_home_page_v_version_tools_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_tools_logos" ADD CONSTRAINT "_home_page_v_version_tools_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_tools_logos" ADD CONSTRAINT "_home_page_v_version_tools_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_steps_items_paragraphs" ADD CONSTRAINT "_home_page_v_version_steps_items_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_steps_items" ADD CONSTRAINT "_home_page_v_version_steps_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_steps_items" ADD CONSTRAINT "_home_page_v_version_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_steps_items_locales" ADD CONSTRAINT "_home_page_v_version_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_intro_image_id_media_id_fk" FOREIGN KEY ("version_intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_page_v" ADD CONSTRAINT "_success_stories_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_page_v" ADD CONSTRAINT "_success_stories_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_page_v_locales" ADD CONSTRAINT "_success_stories_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_page_v_rels" ADD CONSTRAINT "_success_stories_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_success_stories_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_page_v_rels" ADD CONSTRAINT "_success_stories_page_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_page_v" ADD CONSTRAINT "_publications_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_page_v" ADD CONSTRAINT "_publications_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_page_v_locales" ADD CONSTRAINT "_publications_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_intro_columns" ADD CONSTRAINT "_services_page_v_version_intro_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_approach_steps" ADD CONSTRAINT "_services_page_v_version_approach_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_approach_steps" ADD CONSTRAINT "_services_page_v_version_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_approach_steps_locales" ADD CONSTRAINT "_services_page_v_version_approach_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v_version_approach_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_values_items" ADD CONSTRAINT "_services_page_v_version_values_items_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_values_items" ADD CONSTRAINT "_services_page_v_version_values_items_thumbnail_mobile_id_media_id_fk" FOREIGN KEY ("thumbnail_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_values_items" ADD CONSTRAINT "_services_page_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_values_items_locales" ADD CONSTRAINT "_services_page_v_version_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v_version_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_cta_actions" ADD CONSTRAINT "_services_page_v_version_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v_version_cta_actions_locales" ADD CONSTRAINT "_services_page_v_version_cta_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v_version_cta_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_approach_illustration_id_media_id_fk" FOREIGN KEY ("version_approach_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v_locales" ADD CONSTRAINT "_services_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_page_v_version_intro_paragraphs" ADD CONSTRAINT "_tools_page_v_version_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_page_v" ADD CONSTRAINT "_tools_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_page_v" ADD CONSTRAINT "_tools_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_page_v" ADD CONSTRAINT "_tools_page_v_version_cta_id_cta_banners_id_fk" FOREIGN KEY ("version_cta_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_page_v_locales" ADD CONSTRAINT "_tools_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_events_page_v" ADD CONSTRAINT "_news_events_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_events_page_v" ADD CONSTRAINT "_news_events_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_events_page_v" ADD CONSTRAINT "_news_events_page_v_version_cta_support_id_cta_banners_id_fk" FOREIGN KEY ("version_cta_support_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_events_page_v" ADD CONSTRAINT "_news_events_page_v_version_cta_discuss_id_cta_banners_id_fk" FOREIGN KEY ("version_cta_discuss_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_events_page_v" ADD CONSTRAINT "_news_events_page_v_version_cta_updates_id_cta_banners_id_fk" FOREIGN KEY ("version_cta_updates_id") REFERENCES "public"."cta_banners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_events_page_v_locales" ADD CONSTRAINT "_news_events_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_events_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_hero_links" ADD CONSTRAINT "_about_page_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_hero_links_locales" ADD CONSTRAINT "_about_page_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_intro_paragraphs" ADD CONSTRAINT "_about_page_v_version_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_intro_actions" ADD CONSTRAINT "_about_page_v_version_intro_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_intro_actions_locales" ADD CONSTRAINT "_about_page_v_version_intro_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_intro_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_info_cards_paragraphs" ADD CONSTRAINT "_about_page_v_version_info_cards_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_info_cards" ADD CONSTRAINT "_about_page_v_version_info_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_info_cards" ADD CONSTRAINT "_about_page_v_version_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_info_cards_locales" ADD CONSTRAINT "_about_page_v_version_info_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_info_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items" ADD CONSTRAINT "_about_page_v_version_values_items_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items" ADD CONSTRAINT "_about_page_v_version_values_items_thumbnail_mobile_id_media_id_fk" FOREIGN KEY ("thumbnail_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items" ADD CONSTRAINT "_about_page_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items_locales" ADD CONSTRAINT "_about_page_v_version_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_rels" ADD CONSTRAINT "_about_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_rels" ADD CONSTRAINT "_about_page_v_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_departments_page_v" ADD CONSTRAINT "_departments_page_v_version_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_page_v" ADD CONSTRAINT "_departments_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_departments_page_v_locales" ADD CONSTRAINT "_departments_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_departments_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_hero_lead" ADD CONSTRAINT "_team_page_v_version_hero_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_hero_stats" ADD CONSTRAINT "_team_page_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_hero_stats_locales" ADD CONSTRAINT "_team_page_v_version_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v_version_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_intro_actions" ADD CONSTRAINT "_team_page_v_version_intro_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_intro_actions_locales" ADD CONSTRAINT "_team_page_v_version_intro_actions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v_version_intro_actions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_continents_items" ADD CONSTRAINT "_team_page_v_version_continents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v_version_continents_items_locales" ADD CONSTRAINT "_team_page_v_version_continents_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v_version_continents_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_page_v" ADD CONSTRAINT "_team_page_v_version_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_page_v" ADD CONSTRAINT "_team_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_page_v" ADD CONSTRAINT "_team_page_v_version_globe_selected_country_id_countries_id_fk" FOREIGN KEY ("version_globe_selected_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_page_v_locales" ADD CONSTRAINT "_team_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_page_v_version_hero_stats" ADD CONSTRAINT "_partners_page_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_page_v_version_hero_stats_locales" ADD CONSTRAINT "_partners_page_v_version_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_page_v_version_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_page_v_version_intro_paragraphs" ADD CONSTRAINT "_partners_page_v_version_intro_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_page_v" ADD CONSTRAINT "_partners_page_v_version_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_page_v" ADD CONSTRAINT "_partners_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_page_v_locales" ADD CONSTRAINT "_partners_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v_version_hero_lead" ADD CONSTRAINT "_career_page_v_version_hero_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v_version_roles_columns" ADD CONSTRAINT "_career_page_v_version_roles_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v_version_roles_columns_locales" ADD CONSTRAINT "_career_page_v_version_roles_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v_version_roles_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v_version_hiring_paragraphs" ADD CONSTRAINT "_career_page_v_version_hiring_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v_version_hiring_steps" ADD CONSTRAINT "_career_page_v_version_hiring_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v_version_hiring_steps_locales" ADD CONSTRAINT "_career_page_v_version_hiring_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v_version_hiring_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_page_v" ADD CONSTRAINT "_career_page_v_version_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_page_v" ADD CONSTRAINT "_career_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_page_v_locales" ADD CONSTRAINT "_career_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_hero_lead" ADD CONSTRAINT "_theory_of_change_page_v_version_hero_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_hero_links" ADD CONSTRAINT "_theory_of_change_page_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_hero_links_locales" ADD CONSTRAINT "_theory_of_change_page_v_version_hero_links_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_scene_challenge_details" ADD CONSTRAINT "_theory_of_change_page_v_version_scene_challenge_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_scene_goal_details" ADD CONSTRAINT "_theory_of_change_page_v_version_scene_goal_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_scene_values" ADD CONSTRAINT "_theory_of_change_page_v_version_scene_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_approach_steps" ADD CONSTRAINT "_theory_of_change_page_v_version_approach_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_approach_steps" ADD CONSTRAINT "_theory_of_change_page_v_version_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_approach_steps_locales" ADD CONSTRAINT "_theory_of_change_page_v_version_approach_steps_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v_version_approach_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_outcomes_columns" ADD CONSTRAINT "_theory_of_change_page_v_version_outcomes_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_outcomes_columns_locales" ADD CONSTRAINT "_theory_of_change_page_v_version_outcomes_columns_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v_version_outcomes_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_version_globe_pins" ADD CONSTRAINT "_theory_of_change_page_v_version_globe_pins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v" ADD CONSTRAINT "_theory_of_change_page_v_version_hero_image_desktop_id_media_id_fk" FOREIGN KEY ("version_hero_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v" ADD CONSTRAINT "_theory_of_change_page_v_version_hero_image_mobile_id_media_id_fk" FOREIGN KEY ("version_hero_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_theory_of_change_page_v_locales" ADD CONSTRAINT "_theory_of_change_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_of_change_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_home_page_v_version_hero_slides_order_idx" ON "_home_page_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_slides_parent_id_idx" ON "_home_page_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_slides_image_idx" ON "_home_page_v_version_hero_slides" USING btree ("image_id");
  CREATE INDEX "_home_page_v_version_hero_slides_image_mobile_idx" ON "_home_page_v_version_hero_slides" USING btree ("image_mobile_id");
  CREATE INDEX "_home_page_v_version_hero_slides_thumbnail_idx" ON "_home_page_v_version_hero_slides" USING btree ("thumbnail_id");
  CREATE INDEX "_home_page_v_version_hero_slides_pattern_pattern_image_idx" ON "_home_page_v_version_hero_slides" USING btree ("pattern_image_id");
  CREATE UNIQUE INDEX "_home_page_v_version_hero_slides_locales_locale_parent_id_un" ON "_home_page_v_version_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_intro_paragraphs_order_idx" ON "_home_page_v_version_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_intro_paragraphs_parent_id_idx" ON "_home_page_v_version_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_intro_paragraphs_locale_idx" ON "_home_page_v_version_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "_home_page_v_version_intro_actions_order_idx" ON "_home_page_v_version_intro_actions" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_intro_actions_parent_id_idx" ON "_home_page_v_version_intro_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_intro_actions_locales_locale_parent_id_" ON "_home_page_v_version_intro_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_stats_order_idx" ON "_home_page_v_version_stats" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_stats_parent_id_idx" ON "_home_page_v_version_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_stats_locales_locale_parent_id_unique" ON "_home_page_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_tools_paragraphs_order_idx" ON "_home_page_v_version_tools_paragraphs" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_tools_paragraphs_parent_id_idx" ON "_home_page_v_version_tools_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_tools_paragraphs_locale_idx" ON "_home_page_v_version_tools_paragraphs" USING btree ("_locale");
  CREATE INDEX "_home_page_v_version_tools_logos_order_idx" ON "_home_page_v_version_tools_logos" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_tools_logos_parent_id_idx" ON "_home_page_v_version_tools_logos" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_tools_logos_logo_idx" ON "_home_page_v_version_tools_logos" USING btree ("logo_id");
  CREATE INDEX "_home_page_v_version_steps_items_paragraphs_order_idx" ON "_home_page_v_version_steps_items_paragraphs" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_steps_items_paragraphs_parent_id_idx" ON "_home_page_v_version_steps_items_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_steps_items_paragraphs_locale_idx" ON "_home_page_v_version_steps_items_paragraphs" USING btree ("_locale");
  CREATE INDEX "_home_page_v_version_steps_items_order_idx" ON "_home_page_v_version_steps_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_steps_items_parent_id_idx" ON "_home_page_v_version_steps_items" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_steps_items_image_idx" ON "_home_page_v_version_steps_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "_home_page_v_version_steps_items_locales_locale_parent_id_un" ON "_home_page_v_version_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_intro_version_intro_image_idx" ON "_home_page_v" USING btree ("version_intro_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_snapshot_idx" ON "_home_page_v" USING btree ("snapshot");
  CREATE INDEX "_home_page_v_published_locale_idx" ON "_home_page_v" USING btree ("published_locale");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_home_page_v_locales_locale_parent_id_unique" ON "_home_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_success_stories_page_v_version_hero_version_hero_image_idx" ON "_success_stories_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_success_stories_page_v_version_hero_version_hero_image__idx" ON "_success_stories_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_success_stories_page_v_version_version__status_idx" ON "_success_stories_page_v" USING btree ("version__status");
  CREATE INDEX "_success_stories_page_v_created_at_idx" ON "_success_stories_page_v" USING btree ("created_at");
  CREATE INDEX "_success_stories_page_v_updated_at_idx" ON "_success_stories_page_v" USING btree ("updated_at");
  CREATE INDEX "_success_stories_page_v_snapshot_idx" ON "_success_stories_page_v" USING btree ("snapshot");
  CREATE INDEX "_success_stories_page_v_published_locale_idx" ON "_success_stories_page_v" USING btree ("published_locale");
  CREATE INDEX "_success_stories_page_v_latest_idx" ON "_success_stories_page_v" USING btree ("latest");
  CREATE INDEX "_success_stories_page_v_autosave_idx" ON "_success_stories_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_success_stories_page_v_locales_locale_parent_id_unique" ON "_success_stories_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_success_stories_page_v_rels_order_idx" ON "_success_stories_page_v_rels" USING btree ("order");
  CREATE INDEX "_success_stories_page_v_rels_parent_idx" ON "_success_stories_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_success_stories_page_v_rels_path_idx" ON "_success_stories_page_v_rels" USING btree ("path");
  CREATE INDEX "_success_stories_page_v_rels_testimonials_id_idx" ON "_success_stories_page_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_publications_page_v_version_hero_version_hero_image_idx" ON "_publications_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_publications_page_v_version_hero_version_hero_image_mob_idx" ON "_publications_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_publications_page_v_version_version__status_idx" ON "_publications_page_v" USING btree ("version__status");
  CREATE INDEX "_publications_page_v_created_at_idx" ON "_publications_page_v" USING btree ("created_at");
  CREATE INDEX "_publications_page_v_updated_at_idx" ON "_publications_page_v" USING btree ("updated_at");
  CREATE INDEX "_publications_page_v_snapshot_idx" ON "_publications_page_v" USING btree ("snapshot");
  CREATE INDEX "_publications_page_v_published_locale_idx" ON "_publications_page_v" USING btree ("published_locale");
  CREATE INDEX "_publications_page_v_latest_idx" ON "_publications_page_v" USING btree ("latest");
  CREATE INDEX "_publications_page_v_autosave_idx" ON "_publications_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_publications_page_v_locales_locale_parent_id_unique" ON "_publications_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_page_v_version_intro_columns_order_idx" ON "_services_page_v_version_intro_columns" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_intro_columns_parent_id_idx" ON "_services_page_v_version_intro_columns" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_intro_columns_locale_idx" ON "_services_page_v_version_intro_columns" USING btree ("_locale");
  CREATE INDEX "_services_page_v_version_approach_steps_order_idx" ON "_services_page_v_version_approach_steps" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_approach_steps_parent_id_idx" ON "_services_page_v_version_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_approach_steps_image_idx" ON "_services_page_v_version_approach_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "_services_page_v_version_approach_steps_locales_locale_paren" ON "_services_page_v_version_approach_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_page_v_version_values_items_order_idx" ON "_services_page_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_values_items_parent_id_idx" ON "_services_page_v_version_values_items" USING btree ("_parent_id");
  CREATE INDEX "_services_page_v_version_values_items_thumbnail_idx" ON "_services_page_v_version_values_items" USING btree ("thumbnail_id");
  CREATE INDEX "_services_page_v_version_values_items_thumbnail_mobile_idx" ON "_services_page_v_version_values_items" USING btree ("thumbnail_mobile_id");
  CREATE UNIQUE INDEX "_services_page_v_version_values_items_locales_locale_parent_" ON "_services_page_v_version_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_page_v_version_cta_actions_order_idx" ON "_services_page_v_version_cta_actions" USING btree ("_order");
  CREATE INDEX "_services_page_v_version_cta_actions_parent_id_idx" ON "_services_page_v_version_cta_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_page_v_version_cta_actions_locales_locale_parent_i" ON "_services_page_v_version_cta_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_page_v_version_hero_version_hero_image_idx" ON "_services_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_page_v_version_hero_version_hero_image_mobile_idx" ON "_services_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_services_page_v_version_approach_version_approach_illus_idx" ON "_services_page_v" USING btree ("version_approach_illustration_id");
  CREATE INDEX "_services_page_v_version_version__status_idx" ON "_services_page_v" USING btree ("version__status");
  CREATE INDEX "_services_page_v_created_at_idx" ON "_services_page_v" USING btree ("created_at");
  CREATE INDEX "_services_page_v_updated_at_idx" ON "_services_page_v" USING btree ("updated_at");
  CREATE INDEX "_services_page_v_snapshot_idx" ON "_services_page_v" USING btree ("snapshot");
  CREATE INDEX "_services_page_v_published_locale_idx" ON "_services_page_v" USING btree ("published_locale");
  CREATE INDEX "_services_page_v_latest_idx" ON "_services_page_v" USING btree ("latest");
  CREATE INDEX "_services_page_v_autosave_idx" ON "_services_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_services_page_v_locales_locale_parent_id_unique" ON "_services_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_tools_page_v_version_intro_paragraphs_order_idx" ON "_tools_page_v_version_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "_tools_page_v_version_intro_paragraphs_parent_id_idx" ON "_tools_page_v_version_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_tools_page_v_version_intro_paragraphs_locale_idx" ON "_tools_page_v_version_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "_tools_page_v_version_hero_version_hero_image_idx" ON "_tools_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_tools_page_v_version_hero_version_hero_image_mobile_idx" ON "_tools_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_tools_page_v_version_version_cta_idx" ON "_tools_page_v" USING btree ("version_cta_id");
  CREATE INDEX "_tools_page_v_version_version__status_idx" ON "_tools_page_v" USING btree ("version__status");
  CREATE INDEX "_tools_page_v_created_at_idx" ON "_tools_page_v" USING btree ("created_at");
  CREATE INDEX "_tools_page_v_updated_at_idx" ON "_tools_page_v" USING btree ("updated_at");
  CREATE INDEX "_tools_page_v_snapshot_idx" ON "_tools_page_v" USING btree ("snapshot");
  CREATE INDEX "_tools_page_v_published_locale_idx" ON "_tools_page_v" USING btree ("published_locale");
  CREATE INDEX "_tools_page_v_latest_idx" ON "_tools_page_v" USING btree ("latest");
  CREATE INDEX "_tools_page_v_autosave_idx" ON "_tools_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_tools_page_v_locales_locale_parent_id_unique" ON "_tools_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_events_page_v_version_hero_version_hero_image_idx" ON "_news_events_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_news_events_page_v_version_hero_version_hero_image_mobi_idx" ON "_news_events_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_news_events_page_v_version_cta_version_cta_support_idx" ON "_news_events_page_v" USING btree ("version_cta_support_id");
  CREATE INDEX "_news_events_page_v_version_cta_version_cta_discuss_idx" ON "_news_events_page_v" USING btree ("version_cta_discuss_id");
  CREATE INDEX "_news_events_page_v_version_cta_version_cta_updates_idx" ON "_news_events_page_v" USING btree ("version_cta_updates_id");
  CREATE INDEX "_news_events_page_v_version_version__status_idx" ON "_news_events_page_v" USING btree ("version__status");
  CREATE INDEX "_news_events_page_v_created_at_idx" ON "_news_events_page_v" USING btree ("created_at");
  CREATE INDEX "_news_events_page_v_updated_at_idx" ON "_news_events_page_v" USING btree ("updated_at");
  CREATE INDEX "_news_events_page_v_snapshot_idx" ON "_news_events_page_v" USING btree ("snapshot");
  CREATE INDEX "_news_events_page_v_published_locale_idx" ON "_news_events_page_v" USING btree ("published_locale");
  CREATE INDEX "_news_events_page_v_latest_idx" ON "_news_events_page_v" USING btree ("latest");
  CREATE INDEX "_news_events_page_v_autosave_idx" ON "_news_events_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_news_events_page_v_locales_locale_parent_id_unique" ON "_news_events_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_hero_links_order_idx" ON "_about_page_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_hero_links_parent_id_idx" ON "_about_page_v_version_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_hero_links_locales_locale_parent_id_un" ON "_about_page_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_intro_paragraphs_order_idx" ON "_about_page_v_version_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_intro_paragraphs_parent_id_idx" ON "_about_page_v_version_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_intro_paragraphs_locale_idx" ON "_about_page_v_version_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "_about_page_v_version_intro_actions_order_idx" ON "_about_page_v_version_intro_actions" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_intro_actions_parent_id_idx" ON "_about_page_v_version_intro_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_intro_actions_locales_locale_parent_id" ON "_about_page_v_version_intro_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_info_cards_paragraphs_order_idx" ON "_about_page_v_version_info_cards_paragraphs" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_info_cards_paragraphs_parent_id_idx" ON "_about_page_v_version_info_cards_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_info_cards_paragraphs_locale_idx" ON "_about_page_v_version_info_cards_paragraphs" USING btree ("_locale");
  CREATE INDEX "_about_page_v_version_info_cards_order_idx" ON "_about_page_v_version_info_cards" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_info_cards_parent_id_idx" ON "_about_page_v_version_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_info_cards_image_idx" ON "_about_page_v_version_info_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_about_page_v_version_info_cards_locales_locale_parent_id_un" ON "_about_page_v_version_info_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_values_items_order_idx" ON "_about_page_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_items_parent_id_idx" ON "_about_page_v_version_values_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_values_items_thumbnail_idx" ON "_about_page_v_version_values_items" USING btree ("thumbnail_id");
  CREATE INDEX "_about_page_v_version_values_items_thumbnail_mobile_idx" ON "_about_page_v_version_values_items" USING btree ("thumbnail_mobile_id");
  CREATE UNIQUE INDEX "_about_page_v_version_values_items_locales_locale_parent_id_" ON "_about_page_v_version_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_hero_image_version_hero_image_desk_idx" ON "_about_page_v" USING btree ("version_hero_image_desktop_id");
  CREATE INDEX "_about_page_v_version_hero_image_version_hero_image_mobi_idx" ON "_about_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_snapshot_idx" ON "_about_page_v" USING btree ("snapshot");
  CREATE INDEX "_about_page_v_published_locale_idx" ON "_about_page_v" USING btree ("published_locale");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_about_page_v_locales_locale_parent_id_unique" ON "_about_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_rels_order_idx" ON "_about_page_v_rels" USING btree ("order");
  CREATE INDEX "_about_page_v_rels_parent_idx" ON "_about_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_about_page_v_rels_path_idx" ON "_about_page_v_rels" USING btree ("path");
  CREATE INDEX "_about_page_v_rels_departments_id_idx" ON "_about_page_v_rels" USING btree ("departments_id");
  CREATE INDEX "_departments_page_v_version_hero_image_version_hero_imag_idx" ON "_departments_page_v" USING btree ("version_hero_image_desktop_id");
  CREATE INDEX "_departments_page_v_version_hero_image_version_hero_im_1_idx" ON "_departments_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_departments_page_v_version_version__status_idx" ON "_departments_page_v" USING btree ("version__status");
  CREATE INDEX "_departments_page_v_created_at_idx" ON "_departments_page_v" USING btree ("created_at");
  CREATE INDEX "_departments_page_v_updated_at_idx" ON "_departments_page_v" USING btree ("updated_at");
  CREATE INDEX "_departments_page_v_snapshot_idx" ON "_departments_page_v" USING btree ("snapshot");
  CREATE INDEX "_departments_page_v_published_locale_idx" ON "_departments_page_v" USING btree ("published_locale");
  CREATE INDEX "_departments_page_v_latest_idx" ON "_departments_page_v" USING btree ("latest");
  CREATE INDEX "_departments_page_v_autosave_idx" ON "_departments_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_departments_page_v_locales_locale_parent_id_unique" ON "_departments_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_team_page_v_version_hero_lead_order_idx" ON "_team_page_v_version_hero_lead" USING btree ("_order");
  CREATE INDEX "_team_page_v_version_hero_lead_parent_id_idx" ON "_team_page_v_version_hero_lead" USING btree ("_parent_id");
  CREATE INDEX "_team_page_v_version_hero_lead_locale_idx" ON "_team_page_v_version_hero_lead" USING btree ("_locale");
  CREATE INDEX "_team_page_v_version_hero_stats_order_idx" ON "_team_page_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_team_page_v_version_hero_stats_parent_id_idx" ON "_team_page_v_version_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_team_page_v_version_hero_stats_locales_locale_parent_id_uni" ON "_team_page_v_version_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_team_page_v_version_intro_actions_order_idx" ON "_team_page_v_version_intro_actions" USING btree ("_order");
  CREATE INDEX "_team_page_v_version_intro_actions_parent_id_idx" ON "_team_page_v_version_intro_actions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_team_page_v_version_intro_actions_locales_locale_parent_id_" ON "_team_page_v_version_intro_actions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_team_page_v_version_continents_items_order_idx" ON "_team_page_v_version_continents_items" USING btree ("_order");
  CREATE INDEX "_team_page_v_version_continents_items_parent_id_idx" ON "_team_page_v_version_continents_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_team_page_v_version_continents_items_locales_locale_parent_" ON "_team_page_v_version_continents_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_team_page_v_version_hero_image_version_hero_image_deskt_idx" ON "_team_page_v" USING btree ("version_hero_image_desktop_id");
  CREATE INDEX "_team_page_v_version_hero_image_version_hero_image_mobil_idx" ON "_team_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_team_page_v_version_globe_version_globe_selected_countr_idx" ON "_team_page_v" USING btree ("version_globe_selected_country_id");
  CREATE INDEX "_team_page_v_version_version__status_idx" ON "_team_page_v" USING btree ("version__status");
  CREATE INDEX "_team_page_v_created_at_idx" ON "_team_page_v" USING btree ("created_at");
  CREATE INDEX "_team_page_v_updated_at_idx" ON "_team_page_v" USING btree ("updated_at");
  CREATE INDEX "_team_page_v_snapshot_idx" ON "_team_page_v" USING btree ("snapshot");
  CREATE INDEX "_team_page_v_published_locale_idx" ON "_team_page_v" USING btree ("published_locale");
  CREATE INDEX "_team_page_v_latest_idx" ON "_team_page_v" USING btree ("latest");
  CREATE INDEX "_team_page_v_autosave_idx" ON "_team_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_team_page_v_locales_locale_parent_id_unique" ON "_team_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_partners_page_v_version_hero_stats_order_idx" ON "_partners_page_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_partners_page_v_version_hero_stats_parent_id_idx" ON "_partners_page_v_version_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_partners_page_v_version_hero_stats_locales_locale_parent_id" ON "_partners_page_v_version_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_partners_page_v_version_intro_paragraphs_order_idx" ON "_partners_page_v_version_intro_paragraphs" USING btree ("_order");
  CREATE INDEX "_partners_page_v_version_intro_paragraphs_parent_id_idx" ON "_partners_page_v_version_intro_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_partners_page_v_version_intro_paragraphs_locale_idx" ON "_partners_page_v_version_intro_paragraphs" USING btree ("_locale");
  CREATE INDEX "_partners_page_v_version_hero_image_version_hero_image_d_idx" ON "_partners_page_v" USING btree ("version_hero_image_desktop_id");
  CREATE INDEX "_partners_page_v_version_hero_image_version_hero_image_m_idx" ON "_partners_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_partners_page_v_version_version__status_idx" ON "_partners_page_v" USING btree ("version__status");
  CREATE INDEX "_partners_page_v_created_at_idx" ON "_partners_page_v" USING btree ("created_at");
  CREATE INDEX "_partners_page_v_updated_at_idx" ON "_partners_page_v" USING btree ("updated_at");
  CREATE INDEX "_partners_page_v_snapshot_idx" ON "_partners_page_v" USING btree ("snapshot");
  CREATE INDEX "_partners_page_v_published_locale_idx" ON "_partners_page_v" USING btree ("published_locale");
  CREATE INDEX "_partners_page_v_latest_idx" ON "_partners_page_v" USING btree ("latest");
  CREATE INDEX "_partners_page_v_autosave_idx" ON "_partners_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_partners_page_v_locales_locale_parent_id_unique" ON "_partners_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_career_page_v_version_hero_lead_order_idx" ON "_career_page_v_version_hero_lead" USING btree ("_order");
  CREATE INDEX "_career_page_v_version_hero_lead_parent_id_idx" ON "_career_page_v_version_hero_lead" USING btree ("_parent_id");
  CREATE INDEX "_career_page_v_version_hero_lead_locale_idx" ON "_career_page_v_version_hero_lead" USING btree ("_locale");
  CREATE INDEX "_career_page_v_version_roles_columns_order_idx" ON "_career_page_v_version_roles_columns" USING btree ("_order");
  CREATE INDEX "_career_page_v_version_roles_columns_parent_id_idx" ON "_career_page_v_version_roles_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_career_page_v_version_roles_columns_locales_locale_parent_i" ON "_career_page_v_version_roles_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_career_page_v_version_hiring_paragraphs_order_idx" ON "_career_page_v_version_hiring_paragraphs" USING btree ("_order");
  CREATE INDEX "_career_page_v_version_hiring_paragraphs_parent_id_idx" ON "_career_page_v_version_hiring_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_career_page_v_version_hiring_paragraphs_locale_idx" ON "_career_page_v_version_hiring_paragraphs" USING btree ("_locale");
  CREATE INDEX "_career_page_v_version_hiring_steps_order_idx" ON "_career_page_v_version_hiring_steps" USING btree ("_order");
  CREATE INDEX "_career_page_v_version_hiring_steps_parent_id_idx" ON "_career_page_v_version_hiring_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_career_page_v_version_hiring_steps_locales_locale_parent_id" ON "_career_page_v_version_hiring_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_career_page_v_version_hero_image_version_hero_image_des_idx" ON "_career_page_v" USING btree ("version_hero_image_desktop_id");
  CREATE INDEX "_career_page_v_version_hero_image_version_hero_image_mob_idx" ON "_career_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_career_page_v_version_version__status_idx" ON "_career_page_v" USING btree ("version__status");
  CREATE INDEX "_career_page_v_created_at_idx" ON "_career_page_v" USING btree ("created_at");
  CREATE INDEX "_career_page_v_updated_at_idx" ON "_career_page_v" USING btree ("updated_at");
  CREATE INDEX "_career_page_v_snapshot_idx" ON "_career_page_v" USING btree ("snapshot");
  CREATE INDEX "_career_page_v_published_locale_idx" ON "_career_page_v" USING btree ("published_locale");
  CREATE INDEX "_career_page_v_latest_idx" ON "_career_page_v" USING btree ("latest");
  CREATE INDEX "_career_page_v_autosave_idx" ON "_career_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_career_page_v_locales_locale_parent_id_unique" ON "_career_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_hero_lead_order_idx" ON "_theory_of_change_page_v_version_hero_lead" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_hero_lead_parent_id_idx" ON "_theory_of_change_page_v_version_hero_lead" USING btree ("_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_hero_lead_locale_idx" ON "_theory_of_change_page_v_version_hero_lead" USING btree ("_locale");
  CREATE INDEX "_theory_of_change_page_v_version_hero_links_order_idx" ON "_theory_of_change_page_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_hero_links_parent_id_idx" ON "_theory_of_change_page_v_version_hero_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_theory_of_change_page_v_version_hero_links_locales_locale_p" ON "_theory_of_change_page_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_scene_challenge_details_order_idx" ON "_theory_of_change_page_v_version_scene_challenge_details" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_scene_challenge_details_parent_id_idx" ON "_theory_of_change_page_v_version_scene_challenge_details" USING btree ("_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_scene_challenge_details_locale_idx" ON "_theory_of_change_page_v_version_scene_challenge_details" USING btree ("_locale");
  CREATE INDEX "_theory_of_change_page_v_version_scene_goal_details_order_idx" ON "_theory_of_change_page_v_version_scene_goal_details" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_scene_goal_details_parent_id_idx" ON "_theory_of_change_page_v_version_scene_goal_details" USING btree ("_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_scene_goal_details_locale_idx" ON "_theory_of_change_page_v_version_scene_goal_details" USING btree ("_locale");
  CREATE INDEX "_theory_of_change_page_v_version_scene_values_order_idx" ON "_theory_of_change_page_v_version_scene_values" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_scene_values_parent_id_idx" ON "_theory_of_change_page_v_version_scene_values" USING btree ("_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_scene_values_locale_idx" ON "_theory_of_change_page_v_version_scene_values" USING btree ("_locale");
  CREATE INDEX "_theory_of_change_page_v_version_approach_steps_order_idx" ON "_theory_of_change_page_v_version_approach_steps" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_approach_steps_parent_id_idx" ON "_theory_of_change_page_v_version_approach_steps" USING btree ("_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_approach_steps_image_idx" ON "_theory_of_change_page_v_version_approach_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "_theory_of_change_page_v_version_approach_steps_locales_loca" ON "_theory_of_change_page_v_version_approach_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_outcomes_columns_order_idx" ON "_theory_of_change_page_v_version_outcomes_columns" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_outcomes_columns_parent_id_idx" ON "_theory_of_change_page_v_version_outcomes_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_theory_of_change_page_v_version_outcomes_columns_locales_lo" ON "_theory_of_change_page_v_version_outcomes_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_globe_pins_order_idx" ON "_theory_of_change_page_v_version_globe_pins" USING btree ("_order");
  CREATE INDEX "_theory_of_change_page_v_version_globe_pins_parent_id_idx" ON "_theory_of_change_page_v_version_globe_pins" USING btree ("_parent_id");
  CREATE INDEX "_theory_of_change_page_v_version_hero_image_version_hero_idx" ON "_theory_of_change_page_v" USING btree ("version_hero_image_desktop_id");
  CREATE INDEX "_theory_of_change_page_v_version_hero_image_version_he_1_idx" ON "_theory_of_change_page_v" USING btree ("version_hero_image_mobile_id");
  CREATE INDEX "_theory_of_change_page_v_version_version__status_idx" ON "_theory_of_change_page_v" USING btree ("version__status");
  CREATE INDEX "_theory_of_change_page_v_created_at_idx" ON "_theory_of_change_page_v" USING btree ("created_at");
  CREATE INDEX "_theory_of_change_page_v_updated_at_idx" ON "_theory_of_change_page_v" USING btree ("updated_at");
  CREATE INDEX "_theory_of_change_page_v_snapshot_idx" ON "_theory_of_change_page_v" USING btree ("snapshot");
  CREATE INDEX "_theory_of_change_page_v_published_locale_idx" ON "_theory_of_change_page_v" USING btree ("published_locale");
  CREATE INDEX "_theory_of_change_page_v_latest_idx" ON "_theory_of_change_page_v" USING btree ("latest");
  CREATE INDEX "_theory_of_change_page_v_autosave_idx" ON "_theory_of_change_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_theory_of_change_page_v_locales_locale_parent_id_unique" ON "_theory_of_change_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "success_stories_page__status_idx" ON "success_stories_page" USING btree ("_status");
  CREATE INDEX "publications_page__status_idx" ON "publications_page" USING btree ("_status");
  CREATE INDEX "services_page__status_idx" ON "services_page" USING btree ("_status");
  CREATE INDEX "tools_page__status_idx" ON "tools_page" USING btree ("_status");
  CREATE INDEX "news_events_page__status_idx" ON "news_events_page" USING btree ("_status");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "departments_page__status_idx" ON "departments_page" USING btree ("_status");
  CREATE INDEX "team_page__status_idx" ON "team_page" USING btree ("_status");
  CREATE INDEX "partners_page__status_idx" ON "partners_page" USING btree ("_status");
  CREATE INDEX "career_page__status_idx" ON "career_page" USING btree ("_status");
  CREATE INDEX "theory_of_change_page__status_idx" ON "theory_of_change_page" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_home_page_v_version_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_hero_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_intro_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_intro_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_intro_actions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_tools_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_tools_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_steps_items_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_steps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_version_steps_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_page_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_publications_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_publications_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_intro_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_approach_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_approach_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_values_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_values_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_cta_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_version_cta_actions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tools_page_v_version_intro_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tools_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tools_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_events_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_events_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_intro_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_intro_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_intro_actions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_info_cards_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_info_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_values_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_values_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_departments_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_departments_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_hero_lead" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_hero_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_intro_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_intro_actions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_continents_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_version_continents_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v_version_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v_version_hero_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v_version_intro_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_version_hero_lead" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_version_roles_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_version_roles_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_version_hiring_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_version_hiring_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_version_hiring_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_career_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_hero_lead" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_scene_challenge_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_scene_goal_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_scene_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_approach_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_approach_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_outcomes_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_outcomes_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_version_globe_pins" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_of_change_page_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_home_page_v_version_hero_slides" CASCADE;
  DROP TABLE "_home_page_v_version_hero_slides_locales" CASCADE;
  DROP TABLE "_home_page_v_version_intro_paragraphs" CASCADE;
  DROP TABLE "_home_page_v_version_intro_actions" CASCADE;
  DROP TABLE "_home_page_v_version_intro_actions_locales" CASCADE;
  DROP TABLE "_home_page_v_version_stats" CASCADE;
  DROP TABLE "_home_page_v_version_stats_locales" CASCADE;
  DROP TABLE "_home_page_v_version_tools_paragraphs" CASCADE;
  DROP TABLE "_home_page_v_version_tools_logos" CASCADE;
  DROP TABLE "_home_page_v_version_steps_items_paragraphs" CASCADE;
  DROP TABLE "_home_page_v_version_steps_items" CASCADE;
  DROP TABLE "_home_page_v_version_steps_items_locales" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_locales" CASCADE;
  DROP TABLE "_success_stories_page_v" CASCADE;
  DROP TABLE "_success_stories_page_v_locales" CASCADE;
  DROP TABLE "_success_stories_page_v_rels" CASCADE;
  DROP TABLE "_publications_page_v" CASCADE;
  DROP TABLE "_publications_page_v_locales" CASCADE;
  DROP TABLE "_services_page_v_version_intro_columns" CASCADE;
  DROP TABLE "_services_page_v_version_approach_steps" CASCADE;
  DROP TABLE "_services_page_v_version_approach_steps_locales" CASCADE;
  DROP TABLE "_services_page_v_version_values_items" CASCADE;
  DROP TABLE "_services_page_v_version_values_items_locales" CASCADE;
  DROP TABLE "_services_page_v_version_cta_actions" CASCADE;
  DROP TABLE "_services_page_v_version_cta_actions_locales" CASCADE;
  DROP TABLE "_services_page_v" CASCADE;
  DROP TABLE "_services_page_v_locales" CASCADE;
  DROP TABLE "_tools_page_v_version_intro_paragraphs" CASCADE;
  DROP TABLE "_tools_page_v" CASCADE;
  DROP TABLE "_tools_page_v_locales" CASCADE;
  DROP TABLE "_news_events_page_v" CASCADE;
  DROP TABLE "_news_events_page_v_locales" CASCADE;
  DROP TABLE "_about_page_v_version_hero_links" CASCADE;
  DROP TABLE "_about_page_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_about_page_v_version_intro_paragraphs" CASCADE;
  DROP TABLE "_about_page_v_version_intro_actions" CASCADE;
  DROP TABLE "_about_page_v_version_intro_actions_locales" CASCADE;
  DROP TABLE "_about_page_v_version_info_cards_paragraphs" CASCADE;
  DROP TABLE "_about_page_v_version_info_cards" CASCADE;
  DROP TABLE "_about_page_v_version_info_cards_locales" CASCADE;
  DROP TABLE "_about_page_v_version_values_items" CASCADE;
  DROP TABLE "_about_page_v_version_values_items_locales" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "_about_page_v_locales" CASCADE;
  DROP TABLE "_about_page_v_rels" CASCADE;
  DROP TABLE "_departments_page_v" CASCADE;
  DROP TABLE "_departments_page_v_locales" CASCADE;
  DROP TABLE "_team_page_v_version_hero_lead" CASCADE;
  DROP TABLE "_team_page_v_version_hero_stats" CASCADE;
  DROP TABLE "_team_page_v_version_hero_stats_locales" CASCADE;
  DROP TABLE "_team_page_v_version_intro_actions" CASCADE;
  DROP TABLE "_team_page_v_version_intro_actions_locales" CASCADE;
  DROP TABLE "_team_page_v_version_continents_items" CASCADE;
  DROP TABLE "_team_page_v_version_continents_items_locales" CASCADE;
  DROP TABLE "_team_page_v" CASCADE;
  DROP TABLE "_team_page_v_locales" CASCADE;
  DROP TABLE "_partners_page_v_version_hero_stats" CASCADE;
  DROP TABLE "_partners_page_v_version_hero_stats_locales" CASCADE;
  DROP TABLE "_partners_page_v_version_intro_paragraphs" CASCADE;
  DROP TABLE "_partners_page_v" CASCADE;
  DROP TABLE "_partners_page_v_locales" CASCADE;
  DROP TABLE "_career_page_v_version_hero_lead" CASCADE;
  DROP TABLE "_career_page_v_version_roles_columns" CASCADE;
  DROP TABLE "_career_page_v_version_roles_columns_locales" CASCADE;
  DROP TABLE "_career_page_v_version_hiring_paragraphs" CASCADE;
  DROP TABLE "_career_page_v_version_hiring_steps" CASCADE;
  DROP TABLE "_career_page_v_version_hiring_steps_locales" CASCADE;
  DROP TABLE "_career_page_v" CASCADE;
  DROP TABLE "_career_page_v_locales" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_hero_lead" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_hero_links" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_scene_challenge_details" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_scene_goal_details" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_scene_values" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_approach_steps" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_approach_steps_locales" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_outcomes_columns" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_outcomes_columns_locales" CASCADE;
  DROP TABLE "_theory_of_change_page_v_version_globe_pins" CASCADE;
  DROP TABLE "_theory_of_change_page_v" CASCADE;
  DROP TABLE "_theory_of_change_page_v_locales" CASCADE;
  DROP INDEX "home_page__status_idx";
  DROP INDEX "success_stories_page__status_idx";
  DROP INDEX "publications_page__status_idx";
  DROP INDEX "services_page__status_idx";
  DROP INDEX "tools_page__status_idx";
  DROP INDEX "news_events_page__status_idx";
  DROP INDEX "about_page__status_idx";
  DROP INDEX "departments_page__status_idx";
  DROP INDEX "team_page__status_idx";
  DROP INDEX "partners_page__status_idx";
  DROP INDEX "career_page__status_idx";
  DROP INDEX "theory_of_change_page__status_idx";
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "image_mobile_id" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "thumbnail_id" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "pattern_image_id" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "pattern_left" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides" ALTER COLUMN "pattern_top" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "statement" SET NOT NULL;
  ALTER TABLE "home_page_hero_slides_locales" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "home_page_intro_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "home_page_intro_actions" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "home_page_intro_actions" ALTER COLUMN "variant" SET NOT NULL;
  ALTER TABLE "home_page_intro_actions" ALTER COLUMN "arrow" SET NOT NULL;
  ALTER TABLE "home_page_intro_actions_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "home_page_stats" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "home_page_stats" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "home_page_stats_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "home_page_tools_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "width" SET NOT NULL;
  ALTER TABLE "home_page_tools_logos" ALTER COLUMN "height" SET NOT NULL;
  ALTER TABLE "home_page_steps_items_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "home_page_steps_items" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "home_page_steps_items_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "home_page_steps_items_locales" ALTER COLUMN "note" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "hero_primary_action_href" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "hero_secondary_action_href" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "intro_image_id" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "tools_action_href" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "partners_visible" SET NOT NULL;
  ALTER TABLE "home_page" ALTER COLUMN "projects_visible" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "hero_primary_action_label" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "hero_secondary_action_label" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "intro_tag" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "intro_title" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "services_tag" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "services_title" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "tools_tag" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "tools_title" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "tools_action_label" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "steps_tag" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "steps_title" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "partners_trusted_partners_label" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "partners_networks_label" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "projects_tag" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "projects_title" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "projects_carousel_label" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "home_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "success_stories_page" ALTER COLUMN "hero_image_id" SET NOT NULL;
  ALTER TABLE "success_stories_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "hero_link_label" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_title" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_description" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_tabs_completed" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "listing_tabs_in_progress" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "testimonials_heading" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "testimonials_subline" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "success_stories_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "publications_page" ALTER COLUMN "hero_image_id" SET NOT NULL;
  ALTER TABLE "publications_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_academic" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_blogs" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_policy_briefs" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "hero_chips_reports" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_title" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_academic" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_blogs" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_policy_briefs" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "listing_tabs_reports" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "outputs_title" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "outputs_description" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "publications_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "services_page_intro_columns" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "services_page_approach_steps_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "services_page_approach_steps_locales" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "services_page_values_items" ALTER COLUMN "thumbnail_id" SET NOT NULL;
  ALTER TABLE "services_page_values_items" ALTER COLUMN "thumbnail_mobile_id" SET NOT NULL;
  ALTER TABLE "services_page_values_items_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "services_page_values_items_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "services_page_values_items_locales" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "services_page_cta_actions" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "services_page_cta_actions" ALTER COLUMN "emphasis" SET NOT NULL;
  ALTER TABLE "services_page_cta_actions" ALTER COLUMN "new_tab" SET NOT NULL;
  ALTER TABLE "services_page_cta_actions_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_image_id" SET NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "services_page" ALTER COLUMN "approach_illustration_id" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "hero_link_label" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "intro_tag" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "intro_title" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "approach_tag" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "approach_title" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "values_tag" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "values_title" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "cta_heading" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "cta_text" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "detail_eyebrow" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "services_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "tools_page_intro_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "tools_page" ALTER COLUMN "hero_image_id" SET NOT NULL;
  ALTER TABLE "tools_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "tools_page" ALTER COLUMN "cta_id" SET NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "hero_eyebrow" SET NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "hero_link_label" SET NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "intro_title" SET NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "tools_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "hero_image_id" SET NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "cta_support_id" SET NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "cta_discuss_id" SET NOT NULL;
  ALTER TABLE "news_events_page" ALTER COLUMN "cta_updates_id" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "hero_link_label" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_title" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_description" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_state_labels_all" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_state_labels_highlighted" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "listing_state_labels_upcoming" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "news_events_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "about_page_hero_links" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "about_page_hero_links_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "about_page_intro_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "about_page_intro_actions" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "about_page_intro_actions" ALTER COLUMN "variant" SET NOT NULL;
  ALTER TABLE "about_page_intro_actions_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "about_page_info_cards_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "about_page_info_cards" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "about_page_info_cards_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "about_page_values_items" ALTER COLUMN "thumbnail_id" SET NOT NULL;
  ALTER TABLE "about_page_values_items" ALTER COLUMN "thumbnail_mobile_id" SET NOT NULL;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "about_page" ALTER COLUMN "hero_image_desktop_id" SET NOT NULL;
  ALTER TABLE "about_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "intro_statement" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "departments_tag" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "departments_title" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "values_tag" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "values_title" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "values_subline" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "about_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_image_desktop_id" SET NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_count_value" SET NOT NULL;
  ALTER TABLE "departments_page" ALTER COLUMN "hero_icon" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "hero_lead" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "hero_count_label" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "listing_tag" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "listing_title" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "departments_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "team_page_hero_lead" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "team_page_hero_stats" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "team_page_hero_stats" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "team_page_hero_stats" ALTER COLUMN "tone" SET NOT NULL;
  ALTER TABLE "team_page_hero_stats_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "team_page_intro_actions" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "team_page_intro_actions" ALTER COLUMN "variant" SET NOT NULL;
  ALTER TABLE "team_page_intro_actions_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "team_page_continents_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "team_page_continents_items_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "hero_image_desktop_id" SET NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "globe_view_longitude" SET NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "globe_view_latitude" SET NOT NULL;
  ALTER TABLE "team_page" ALTER COLUMN "globe_selected_country_id" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "intro_tag" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "intro_title" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "intro_subline" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "continents_label" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "listing_title" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "listing_mobile_description" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "listing_senior_leadership_label" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "team_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "partners_page_hero_stats" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "partners_page_hero_stats" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "partners_page_hero_stats" ALTER COLUMN "tone" SET NOT NULL;
  ALTER TABLE "partners_page_hero_stats_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "partners_page_intro_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "partners_page" ALTER COLUMN "hero_image_desktop_id" SET NOT NULL;
  ALTER TABLE "partners_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "intro_statement" SET NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "filter_funders_label" SET NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "filter_partners_label" SET NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "partners_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "career_page_hero_lead" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "career_page_roles_columns_locales" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "career_page_hiring_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "career_page_hiring_steps" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "career_page_hiring_steps_locales" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_image_desktop_id" SET NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_icon" SET NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_count_value" SET NOT NULL;
  ALTER TABLE "career_page" ALTER COLUMN "hero_action_href" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hero_count_label" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hero_action_label" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "roles_tag" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "roles_title" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "hiring_title" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "career_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_hero_lead" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_hero_links" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_hero_links_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_scene_challenge_details" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_scene_goal_details" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_scene_values" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_approach_steps_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_approach_steps_locales" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns" ALTER COLUMN "tone" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ALTER COLUMN "output" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_outcomes_columns_locales" ALTER COLUMN "outcome" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "longitude" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "latitude" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_globe_pins" ALTER COLUMN "scale" SET NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "hero_image_desktop_id" SET NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "hero_image_mobile_id" SET NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "globe_view_longitude" SET NOT NULL;
  ALTER TABLE "theory_of_change_page" ALTER COLUMN "globe_view_latitude" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "hero_title" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_challenge_label" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_challenge_statement" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_goal_label" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "scene_goal_statement" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "approach_mobile_tag" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "approach_title" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "approach_subline" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "outcomes_title" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "impact_title" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "impact_text" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "meta_title" SET NOT NULL;
  ALTER TABLE "theory_of_change_page_locales" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "home_page" DROP COLUMN "_status";
  ALTER TABLE "success_stories_page" DROP COLUMN "_status";
  ALTER TABLE "publications_page" DROP COLUMN "_status";
  ALTER TABLE "services_page" DROP COLUMN "_status";
  ALTER TABLE "tools_page" DROP COLUMN "_status";
  ALTER TABLE "news_events_page" DROP COLUMN "_status";
  ALTER TABLE "about_page" DROP COLUMN "_status";
  ALTER TABLE "departments_page" DROP COLUMN "_status";
  ALTER TABLE "team_page" DROP COLUMN "_status";
  ALTER TABLE "partners_page" DROP COLUMN "_status";
  ALTER TABLE "career_page" DROP COLUMN "_status";
  ALTER TABLE "theory_of_change_page" DROP COLUMN "_status";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_intro_actions_variant";
  DROP TYPE "public"."enum__home_page_v_version_stats_icon";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum__home_page_v_published_locale";
  DROP TYPE "public"."enum_success_stories_page_status";
  DROP TYPE "public"."enum__success_stories_page_v_version_status";
  DROP TYPE "public"."enum__success_stories_page_v_published_locale";
  DROP TYPE "public"."enum_publications_page_status";
  DROP TYPE "public"."enum__publications_page_v_version_status";
  DROP TYPE "public"."enum__publications_page_v_published_locale";
  DROP TYPE "public"."enum_services_page_status";
  DROP TYPE "public"."enum__services_page_v_version_cta_actions_emphasis";
  DROP TYPE "public"."enum__services_page_v_version_status";
  DROP TYPE "public"."enum__services_page_v_published_locale";
  DROP TYPE "public"."enum_tools_page_status";
  DROP TYPE "public"."enum__tools_page_v_version_status";
  DROP TYPE "public"."enum__tools_page_v_published_locale";
  DROP TYPE "public"."enum_news_events_page_status";
  DROP TYPE "public"."enum__news_events_page_v_version_status";
  DROP TYPE "public"."enum__news_events_page_v_published_locale";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_intro_actions_variant";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum__about_page_v_published_locale";
  DROP TYPE "public"."enum_departments_page_status";
  DROP TYPE "public"."enum__departments_page_v_version_hero_icon";
  DROP TYPE "public"."enum__departments_page_v_version_status";
  DROP TYPE "public"."enum__departments_page_v_published_locale";
  DROP TYPE "public"."enum_team_page_status";
  DROP TYPE "public"."enum__team_page_v_version_hero_stats_icon";
  DROP TYPE "public"."enum__team_page_v_version_hero_stats_tone";
  DROP TYPE "public"."enum__team_page_v_version_intro_actions_variant";
  DROP TYPE "public"."enum__team_page_v_version_status";
  DROP TYPE "public"."enum__team_page_v_published_locale";
  DROP TYPE "public"."enum_partners_page_status";
  DROP TYPE "public"."enum__partners_page_v_version_hero_stats_icon";
  DROP TYPE "public"."enum__partners_page_v_version_hero_stats_tone";
  DROP TYPE "public"."enum__partners_page_v_version_status";
  DROP TYPE "public"."enum__partners_page_v_published_locale";
  DROP TYPE "public"."enum_career_page_status";
  DROP TYPE "public"."enum__career_page_v_version_hiring_steps_icon";
  DROP TYPE "public"."enum__career_page_v_version_hero_icon";
  DROP TYPE "public"."enum__career_page_v_version_status";
  DROP TYPE "public"."enum__career_page_v_published_locale";
  DROP TYPE "public"."enum_theory_of_change_page_status";
  DROP TYPE "public"."enum__theory_of_change_page_v_version_outcomes_columns_icon";
  DROP TYPE "public"."enum__theory_of_change_page_v_version_outcomes_columns_tone";
  DROP TYPE "public"."enum__theory_of_change_page_v_version_globe_pins_icon";
  DROP TYPE "public"."enum__theory_of_change_page_v_version_status";
  DROP TYPE "public"."enum__theory_of_change_page_v_published_locale";`)
}
