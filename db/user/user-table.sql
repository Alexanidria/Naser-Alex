CREATE TABLE users.Ta_user (
  id_user       SERIAL PRIMARY KEY,
  num_employ    int NOT NULL,
  dat           TIMESTAMP DEFAULT NOW(),
  username      varchar(20) UNIQUE NOT NULL,
  passwd        varchar(255) NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE users.roles (
  id            SERIAL PRIMARY KEY,
  nam           VARCHAR(50) UNIQUE NOT NULL,
  descr         TEXT
);

CREATE TABLE users.Ta_rolesBook (
  id            SERIAL PRIMARY KEY,
  id_user       INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  id_roles      INT NOT NULL REFERENCES roles(role_id) ON DELETE CASCADE,
                UNIQUE (id_user, id_roles)
);

CREATE TABLE users.Ta_screen (
  id            SERIAL PRIMARY KEY,
  nam           VARCHAR(100) NOT NULL,
  code          VARCHAR(50) UNIQUE NOT NULL,
  descr         TEXT
);

CREATE TABLE users.Ta_permissions (
  id            SERIAL PRIMARY KEY,
  id_roles      INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  id_screen     INT NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
  canView      BOOLEAN DEFAULT FALSE,
  canAdd       BOOLEAN DEFAULT FALSE,
  canEdit      BOOLEAN DEFAULT FALSE,
  canDelete    BOOLEAN DEFAULT FALSE,
                UNIQUE (id_roles, id_screen)
);



-- ======================================================
-- ======================================================
-- ======================================================
-- ======================================================
CREATE TABLE user_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token VARCHAR(512) NOT NULL UNIQUE,
    issued_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);



ALTER TABLE users.Ta_user
  ADD CONSTRAINT FK_Ta_permission_TO_Ta_user
    FOREIGN KEY (id)
    REFERENCES users.Ta_prmission (id_user_premission);

ALTER TABLE users.Ta_prmissionBook
  ADD CONSTRAINT FK_Ta_permissionBook_TO_Ta_parts
    FOREIGN KEY (id_part)
    REFERENCES users.Ta_parts (id);


-- =======================
-- دوال CRUD للمستخدمين
-- =======================


-- =======================
-- دوال للأدوار
-- =======================

CREATE OR REPLACE FUNCTION add_role(p_role_name VARCHAR, p_description TEXT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO roles (role_name, description) VALUES (p_role_name, p_description);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_role(p_role_id INT, p_role_name VARCHAR, p_description TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE roles SET role_name = p_role_name, description = p_description WHERE role_id = p_role_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_role(p_role_id INT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM roles WHERE role_id = p_role_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_roles()
RETURNS TABLE(role_id INT, role_name VARCHAR, description TEXT) AS $$
BEGIN
    RETURN QUERY SELECT role_id, role_name, description FROM roles;
END;
$$ LANGUAGE plpgsql;

-- =======================
-- دوال التوكن
-- =======================

CREATE OR REPLACE FUNCTION generate_user_token(p_user_id INT, p_token VARCHAR, p_expire_hours INT DEFAULT 24)
RETURNS VOID AS $$
BEGIN
    INSERT INTO user_tokens (user_id, token, expires_at)
    VALUES (p_user_id, p_token, NOW() + (p_expire_hours || ' hour')::INTERVAL);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_token(p_token VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    v_count INT;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM user_tokens
    WHERE token = p_token
      AND is_active = TRUE
      AND expires_at > NOW();
    RETURN v_count > 0;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION revoke_token(p_token VARCHAR)
RETURNS VOID AS $$
BEGIN
    UPDATE user_tokens SET is_active = FALSE WHERE token = p_token;
END;
$$ LANGUAGE plpgsql;

-- ✅ نهاية الملف
