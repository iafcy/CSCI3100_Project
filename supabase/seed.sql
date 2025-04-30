create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert predefined licenses
INSERT INTO "public"."licenses" ("id", "is_activated")
VALUES
  ('11111111-1111-1111-1111-111111111111', false),
  ('22222222-2222-2222-2222-222222222222', false),
  ('33333333-3333-3333-3333-333333333333', false),
  ('44444444-4444-4444-4444-444444444444', false),
  ('55555555-5555-5555-5555-555555555555', false),
  ('66666666-6666-6666-6666-666666666666', false),
  ('77777777-7777-7777-7777-777777777777', false);

-- Insert predefined users
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous")
VALUES
  ('00000000-0000-0000-0000-000000000000', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', 'authenticated', 'authenticated', 'user5@example.com', '$2a$10$qwlOd/2BdIFiSpz.DSaE7.wv/8XC0Lyd0.gRdpFwoZInrgH9aPOn6', '2025-04-30 08:10:49.493809+00', null, '', null, '', null, '', '', null, '2025-04-30 08:10:49.501901+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea", "email": "user5@example.com", "username": "User 5", "license_id": "55555555-5555-5555-5555-555555555555", "email_verified": true, "phone_verified": false}', null, '2025-04-30 08:10:49.486056+00', '2025-04-30 08:10:49.503476+00', null, null, '', '', null, '', '0', null, '', null, 'false', null, 'false'),
  ('00000000-0000-0000-0000-000000000000', '30731eed-1517-4e0c-9795-0d1ecf13a889', 'authenticated', 'authenticated', 'user4@example.com', '$2a$10$15heM3qpo9lNhyhVlu9R8ej5aDw.y24izEewm/YiKDke2Qn7U/0gm', '2025-04-30 08:10:49.478842+00', null, '', null, '', null, '', '', null, '2025-04-30 08:10:49.48753+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "30731eed-1517-4e0c-9795-0d1ecf13a889", "email": "user4@example.com", "username": "User 4", "license_id": "44444444-4444-4444-4444-444444444444", "email_verified": true, "phone_verified": false}', null, '2025-04-30 08:10:49.468979+00', '2025-04-30 08:10:49.489795+00', null, null, '', '', null, '', '0', null, '', null, 'false', null, 'false'),
  ('00000000-0000-0000-0000-000000000000', '4712ebce-15df-42a0-a1ad-3dc3cc162add', 'authenticated', 'authenticated', 'user2@example.com', '$2a$10$ahtnflr3/SSoLnDPVESvw.qZ8lDqIju0C9J245rowdXM2eaqi2S4W', '2025-04-30 08:10:49.486095+00', null, '', null, '', null, '', '', null, '2025-04-30 08:10:49.498185+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4712ebce-15df-42a0-a1ad-3dc3cc162add", "email": "user2@example.com", "username": "User 2", "license_id": "22222222-2222-2222-2222-222222222222", "email_verified": true, "phone_verified": false}', null, '2025-04-30 08:10:49.477403+00', '2025-04-30 08:10:49.500042+00', null, null, '', '', null, '', '0', null, '', null, 'false', null, 'false'),
  ('00000000-0000-0000-0000-000000000000', '606f8d97-eb19-4901-b229-b9358647caa5', 'authenticated', 'authenticated', 'user1@example.com', '$2a$10$h.P8diodBtbsT4GIVYppKOqQpX.hluCAG4Y.8fcmFWh3mDYLMRsXC', '2025-04-30 08:10:49.478844+00', null, '', null, '', null, '', '', null, '2025-04-30 08:10:49.495238+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "606f8d97-eb19-4901-b229-b9358647caa5", "email": "user1@example.com", "username": "User 1", "license_id": "11111111-1111-1111-1111-111111111111", "email_verified": true, "phone_verified": false}', null, '2025-04-30 08:10:49.468979+00', '2025-04-30 08:10:49.4971+00', null, null, '', '', null, '', '0', null, '', null, 'false', null, 'false'),
  ('00000000-0000-0000-0000-000000000000', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', 'authenticated', 'authenticated', 'user3@example.com', '$2a$10$ZYRLucfhMVrbsabibpV6Ge.94CaDFlV6Ihur.27YxaOBwDJ4tM0.y', '2025-04-30 08:10:49.485805+00', null, '', null, '', null, '', '', null, '2025-04-30 08:10:49.498284+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6301f2a9-b6fc-4656-8ff0-0385484a3fd2", "email": "user3@example.com", "username": "User 3", "license_id": "33333333-3333-3333-3333-333333333333", "email_verified": true, "phone_verified": false}', null, '2025-04-30 08:10:49.477027+00', '2025-04-30 08:10:49.500102+00', null, null, '', '', null, '', '0', null, '', null, 'false', null, 'false');

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id")
VALUES
  ('4712ebce-15df-42a0-a1ad-3dc3cc162add', '4712ebce-15df-42a0-a1ad-3dc3cc162add', '{"sub": "4712ebce-15df-42a0-a1ad-3dc3cc162add", "email": "user2@example.com", "username": "User 2", "license_id": "22222222-2222-2222-2222-222222222222", "email_verified": false, "phone_verified": false}', 'email', '2025-04-30 08:10:49.483344+00', '2025-04-30 08:10:49.483366+00', '2025-04-30 08:10:49.483366+00', '0829492c-655c-48e7-96eb-18d94f0a29d2'),
  ('6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '{"sub": "6301f2a9-b6fc-4656-8ff0-0385484a3fd2", "email": "user3@example.com", "username": "User 3", "license_id": "33333333-3333-3333-3333-333333333333", "email_verified": false, "phone_verified": false}', 'email', '2025-04-30 08:10:49.483227+00', '2025-04-30 08:10:49.483252+00', '2025-04-30 08:10:49.483252+00', '55374f9e-d2de-411e-8d72-cb70a8e177f4'),
  ('30731eed-1517-4e0c-9795-0d1ecf13a889', '30731eed-1517-4e0c-9795-0d1ecf13a889', '{"sub": "30731eed-1517-4e0c-9795-0d1ecf13a889", "email": "user4@example.com", "username": "User 4", "license_id": "44444444-4444-4444-4444-444444444444", "email_verified": false, "phone_verified": false}', 'email', '2025-04-30 08:10:49.475885+00', '2025-04-30 08:10:49.475906+00', '2025-04-30 08:10:49.475906+00', 'ceefa1aa-81ee-4ecf-bcd4-14291c7cb3b7'),
  ('2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', '{"sub": "2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea", "email": "user5@example.com", "username": "User 5", "license_id": "55555555-5555-5555-5555-555555555555", "email_verified": false, "phone_verified": false}', 'email', '2025-04-30 08:10:49.49167+00', '2025-04-30 08:10:49.491693+00', '2025-04-30 08:10:49.491693+00', 'd68ed147-0ecc-47dc-aaf3-ae4743e91feb'),
  ('606f8d97-eb19-4901-b229-b9358647caa5', '606f8d97-eb19-4901-b229-b9358647caa5', '{"sub": "606f8d97-eb19-4901-b229-b9358647caa5", "email": "user1@example.com", "username": "User 1", "license_id": "11111111-1111-1111-1111-111111111111", "email_verified": false, "phone_verified": false}', 'email', '2025-04-30 08:10:49.475639+00', '2025-04-30 08:10:49.475664+00', '2025-04-30 08:10:49.475664+00', 'e64a6fa3-e198-4d3c-8948-cce351c0eceb');

-- Insert predefined categories
INSERT INTO "public"."categories" ("name")
VALUES
    ('Category 1'),
    ('Category 2'),
    ('Category 3'),
    ('Category 4'),
    ('Category 5');

-- Insert predefined forum data
INSERT INTO "public"."threads" ("title", "user_id", "category_id")
VALUES
    ('Thread 1 title', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', '1'),
    ('Thread 2 title', '30731eed-1517-4e0c-9795-0d1ecf13a889', '1'),
    ('Thread 3 title', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', '2'),
    ('Thread 4 title', '606f8d97-eb19-4901-b229-b9358647caa5', '2'),
    ('Thread 5 title', '4712ebce-15df-42a0-a1ad-3dc3cc162add', '3'),
    ('Thread 6 title', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '3'),
    ('Thread 7 title', '30731eed-1517-4e0c-9795-0d1ecf13a889', '4'),
    ('Thread 8 title', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '4'),
    ('Thread 9 title', '606f8d97-eb19-4901-b229-b9358647caa5', '5'),
    ('Thread 10 title', '4712ebce-15df-42a0-a1ad-3dc3cc162add', '5');

INSERT INTO "public"."thread_reactions" ("thread_id", "user_id", "is_like")
VALUES
    ('1', '4712ebce-15df-42a0-a1ad-3dc3cc162add', true),
    ('1', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', false),
    ('3', '30731eed-1517-4e0c-9795-0d1ecf13a889', true),
    ('6', '4712ebce-15df-42a0-a1ad-3dc3cc162add', true),
    ('8', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', false);

INSERT INTO "public"."comments" ("content", "filtered_content", "user_id", "thread_id")
VALUES
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', '1'),
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '30731eed-1517-4e0c-9795-0d1ecf13a889', '2'),
    ('<p>Comment 1 content</p> <p class="hidden-content">Hidden content</p>', '<p>Comment 1 content</p>', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', '3'),
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '606f8d97-eb19-4901-b229-b9358647caa5', '4'),
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '4712ebce-15df-42a0-a1ad-3dc3cc162add', '5'),
    ('<p>Comment 1 content</p> <p class="hidden-content">Hidden content</p>', '<p>Comment 1 content</p>', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '6'),
    ('<p>Comment 1 content</p> <p class="hidden-content">Hidden content</p>', '<p>Comment 1 content</p>', '30731eed-1517-4e0c-9795-0d1ecf13a889', '7'),
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '8'),
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '606f8d97-eb19-4901-b229-b9358647caa5', '9'),
    ('<p>Comment 1 content</p>', '<p>Comment 1 content</p>', '4712ebce-15df-42a0-a1ad-3dc3cc162add', '10'),
    ('<p>Comment 2 content</p>', '<p>Comment 2 content</p>', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', '1'),
    ('<p>Comment 2 content</p> <p class="hidden-content">Hidden content</p>', '<p>Comment 2 content</p>', '4712ebce-15df-42a0-a1ad-3dc3cc162add', '4');

INSERT INTO "public"."comment_reactions" ("comment_id", "user_id", "is_like")
VALUES
    ('1', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', true),
    ('1', '6301f2a9-b6fc-4656-8ff0-0385484a3fd2', false),
    ('3', '2a92b5d8-f5d4-4e28-bf5a-4f18f8c9b0ea', true),
    ('8', '4712ebce-15df-42a0-a1ad-3dc3cc162add', false),
    ('12', '30731eed-1517-4e0c-9795-0d1ecf13a889', true);