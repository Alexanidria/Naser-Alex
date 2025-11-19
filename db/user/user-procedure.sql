-- ===============
--  user
-- ===============
  -- FUNCTION: users.fn_user_insert(num_employ,username,passwd)
  CREATE OR REPLACE FUNCTION users.fn_user_Insert  (
  num_employ_   int, 
  username_     VARCHAR(20), 
  passwd_       VARCHAR(255)
  )
  RETURNS VOID 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    INSERT INTO users.ta_user(num_employ,username, passwd)
	  VALUES (num_employ_, username_, passwd_);
  end; 
  $$;

    -- FUNCTION: users.fn_user_update(id_user,num_employ,username,passwd)
  CREATE OR REPLACE FUNCTION users.fn_user_update(
  id_user_      int,
  num_employ_   int, 
  username_     VARCHAR(20), 
  passwd_       VARCHAR(255)
  )
  RETURNS VOID 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    UPDATE users.ta_user SET
      users.ta_user.num_employ=num_employ_,  
      users.ta_user.username=username_, 
      users.ta_user.passwd=passwd_ 
    WHERE users.ta_user.id_user=id_user_;
  end; 
  $$;

    -- FUNCTION: users.fn_user_update_active(id_user,active)
  CREATE OR REPLACE FUNCTION users.fn_user_update_active(
  id_user_      int,
  active_       BOOLEAN
  )
  RETURNS VOID 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    UPDATE users.ta_user SET
      users.ta_user.active=active_
    WHERE users.ta_user.id_user=id_user_;
  end; 
  $$;

     -- FUNCTION: users.fn_user_update_passwd(id_user,passwd)
  CREATE OR REPLACE FUNCTION users.fn_user_update_passwd(
    id_user_      int,
    passwd_       varchar(255)
    )
    RETURNS VOID 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE users.ta_user SET
        users.ta_user.passwd=passwd_
      WHERE users.ta_user.id_user=id_user_;
    end; 
  $$;

    -- FUNCTION: users.fn_user_delete(id_user)
  CREATE OR REPLACE FUNCTION users.fn_user_delete(id_user_ int)
  RETURNS VOID  
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    DELETE FROM users.ta_user WHERE users.ta_user.id_user=id_user_;
  end; 
  $$;

    -- FUNCTION: users.fn_user_selectall()
  CREATE OR REPLACE FUNCTION users.fn_user_selectall()
  RETURNS TABLE(
    id_user       int,
    num_employ    int,
    dat           TIMESTAMP ,
    username      varchar(20),
    passwd        varchar(255),
    active        BOOLEAN 
    ) 
  LANGUAGE 'plpgsql'
  AS $$
  begin   
    RETURN QUERY (SELECT * FROM users.ta_user ORDER BY id_user);
  end; 
  $$;

    -- FUNCTION: users.fn_user_selectone(id_user)
  CREATE OR REPLACE FUNCTION users.fn_user_selectone(id_user_ int)
  RETURNS TABLE(
    id_user       int,
    num_employ    int,
    dat           TIMESTAMP ,
    username      varchar(20),
    passwd        varchar(255),
    active        BOOLEAN 
    ) 
  LANGUAGE 'plpgsql'
  AS $$
  begin    
    RETURN QUERY ( SELECT * FROM users.ta_user WHERE users.ta_user.id_user=id_user_);
  end; 
  $$;

    -- FUNCTION: users.fn_user_selectname(username)
  CREATE OR REPLACE FUNCTION users.fn_user_selectname(username_ text)
  RETURNS TABLE(
    id_user       int,
    num_employ    int,
    dat           TIMESTAMP ,
    username      varchar(20),
    passwd        varchar(255),
    active        BOOLEAN 
    ) 
  LANGUAGE 'plpgsql'
  AS $$
  begin    
    RETURN QUERY ( SELECT * FROM users.ta_user WHERE users.ta_user.username=username_);
    end; 
  $$;



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
  can_view      BOOLEAN DEFAULT FALSE,
  can_add       BOOLEAN DEFAULT FALSE,
  can_edit      BOOLEAN DEFAULT FALSE,
  can_delete    BOOLEAN DEFAULT FALSE,
                UNIQUE (id_roles, id_screen)
);