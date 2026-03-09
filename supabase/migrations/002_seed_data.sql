-- =====================================================
-- Agent Skills Marketplace — Seed Data (Dev Only)
-- =====================================================
-- Run this only in development environments.
-- WARNING: This creates auth users via Supabase SQL —
-- in production use the Auth API instead.

-- Insert demo authors (UUIDs are stable for dev)
insert into public.authors (id, username, display_name, bio, github) values
  ('a1000000-0000-0000-0000-000000000001', 'alexchen',    'Alex Chen',     'AI engineer building productivity tools.', 'alexchen'),
  ('a1000000-0000-0000-0000-000000000002', 'sarahkim',    'Sarah Kim',      'Full-stack developer & AI researcher.',    'sarahkim'),
  ('a1000000-0000-0000-0000-000000000003', 'marcobello',  'Marco Bello',    'Data scientist.',                          'marcobello'),
  ('a1000000-0000-0000-0000-000000000004', 'yuki_tanaka', 'Yuki Tanaka',    'Security researcher.',                     'yukitanaka'),
  ('a1000000-0000-0000-0000-000000000005', 'devbot_labs', 'DevBot Labs',    'Enterprise-grade agent skills for teams.', null)
on conflict (id) do nothing;

-- Insert demo skills
insert into public.skills (
  id, slug, name, short_description, category_id, author_id,
  version, price, tags, featured, status, download_count, star_count, avg_rating, review_count
) values
  (
    'b1000000-0000-0000-0000-000000000001',
    'web-scraper-pro', 'Web Scraper Pro',
    'Intelligent web scraping with JS rendering, pagination handling, and structured output.',
    'data', 'a1000000-0000-0000-0000-000000000001',
    '2.1.4', 0, ARRAY['scraping','web','data-extraction','automation'], true, 'published',
    18400, 342, 4.8, 89
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'code-reviewer', 'Code Reviewer',
    'Automated code review with security scanning, style checks, and refactor suggestions.',
    'coding', 'a1000000-0000-0000-0000-000000000002',
    '1.3.0', 9.99, ARRAY['code-review','security','linting','devtools'], true, 'published',
    9200, 187, 4.6, 54
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    'slack-messenger', 'Slack Messenger',
    'Send messages, create channels, and manage Slack workspaces from your agent.',
    'communication', 'a1000000-0000-0000-0000-000000000005',
    '3.0.1', 0, ARRAY['slack','messaging','notifications','team'], true, 'published',
    27600, 521, 4.9, 142
  ),
  (
    'b1000000-0000-0000-0000-000000000004',
    'github-assistant', 'GitHub Assistant',
    'Full GitHub integration: PRs, issues, code search, CI status, and more.',
    'coding', 'a1000000-0000-0000-0000-000000000005',
    '4.2.0', 0, ARRAY['github','git','devops','ci-cd'], true, 'published',
    34100, 678, 4.9, 198
  ),
  (
    'b1000000-0000-0000-0000-000000000005',
    'pdf-analyzer', 'PDF Analyzer',
    'Extract text, tables, and structured data from PDFs. Supports scanned docs via OCR.',
    'data', 'a1000000-0000-0000-0000-000000000003',
    '1.5.2', 4.99, ARRAY['pdf','ocr','document','extraction'], false, 'published',
    11800, 203, 4.5, 67
  )
on conflict (id) do nothing;

-- Insert demo reviews
insert into public.reviews (id, skill_id, author_id, rating, title, body) values
  (
    'c1000000-0000-0000-0000-000000000001',
    'b1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000002',
    5, 'Saved us hours of manual scraping work',
    'We were spending 4 hours/week manually copying data from competitor sites. Web Scraper Pro handles it all automatically.'
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'b1000000-0000-0000-0000-000000000003',
    'a1000000-0000-0000-0000-000000000001',
    5, 'Rock solid Slack integration',
    'Block Kit support is fantastic. Our agent builds beautiful Slack reports. Zero issues in 3 months of production use.'
  )
on conflict (id) do nothing;
