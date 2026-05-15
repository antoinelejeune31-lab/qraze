-- ============================================================
-- QRCraft — Schéma Supabase (PostgreSQL)
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================================

-- Profils utilisateurs
CREATE TABLE profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT NOT NULL,
  name                TEXT,
  consent_terms       BOOLEAN NOT NULL DEFAULT false,
  consent_marketing   BOOLEAN NOT NULL DEFAULT false,
  consent_date        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- QR Codes
CREATE TABLE qr_codes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  url         TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'url' CHECK (type IN ('url','wifi','vcard','sms')),
  options     JSONB NOT NULL DEFAULT '{}',
  expires_at  TIMESTAMPTZ,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  scan_count  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes  ENABLE ROW LEVEL SECURITY;

-- Policies profiles
CREATE POLICY "Users can view own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies qr_codes
CREATE POLICY "Users can CRUD own QR codes" ON qr_codes FOR ALL USING (auth.uid() = user_id);

-- Index pour les performances
CREATE INDEX idx_qr_codes_user_id   ON qr_codes(user_id);
CREATE INDEX idx_qr_codes_expires   ON qr_codes(expires_at) WHERE is_active = true;
CREATE INDEX idx_qr_codes_active    ON qr_codes(is_active);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated  BEFORE UPDATE ON profiles  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_qr_codes_updated  BEFORE UPDATE ON qr_codes  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Demandes de téléchargement (admin tracking)
CREATE TABLE IF NOT EXISTS download_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  download_type TEXT NOT NULL DEFAULT 'free' CHECK (download_type IN ('free','paid')),
  created_at    TIMESTAMPTZ DEFAULT now()
);
-- Pas de RLS sur cette table : écriture publique, lecture admin uniquement via service role
CREATE INDEX idx_dl_requests_email      ON download_requests(email);
CREATE INDEX idx_dl_requests_created_at ON download_requests(created_at DESC);

-- Optional: logs de consentement pour audit
CREATE TABLE IF NOT EXISTS consent_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  analytics   BOOLEAN,
  ads         BOOLEAN,
  consent_date TIMESTAMPTZ,
  ip          TEXT,
  user_agent  TEXT
);
