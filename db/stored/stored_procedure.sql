-- store
    -- FUNCTION: stored.fn_store_insert(cod_ text,  nam_ text,  id_user_ int)
  CREATE OR REPLACE FUNCTION stored.fn_store_Insert(cod_ text,  nam_ text,  id_user_ int)
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      declare   
        max_id integer;
      begin   
        select COALESCE(MAX(stored.ta_store.id), 0) + 1 into max_id from stored.ta_store ;
        INSERT INTO stored.ta_store (id,cod,nam,id_user)
          VALUES (max_id,cod_,nam_,id_user_);
        RETURN QUERY ( SELECT * 	FROM stored.ta_store ORDER BY id);
      end; 
  $$;

    -- FUNCTION: stored.fn_store_update(id_ int,cod_ text,nam_ text, id_user_ int)
  CREATE OR REPLACE FUNCTION stored.fn_store_update(id_ int,cod_ text,nam_ text, id_user_ int)
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      begin   
        UPDATE stored.ta_store SET nam=nam_, id_user=id_user_ , cod=cod_ WHERE stored.ta_store.id=id_;
        RETURN QUERY ( SELECT * 	FROM stored.ta_store ORDER BY id);
      end; 
  $$;

    -- FUNCTION: stored.fn_store_delete(id_ int)
  CREATE OR REPLACE FUNCTION stored.fn_store_delete(id_ int)
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      begin   
        DELETE FROM stored.ta_store WHERE stored.ta_store.id=id_;
        RETURN QUERY ( SELECT * 	FROM stored.ta_store ORDER BY id);
      end; 
  $$;

    -- FUNCTION: stored.fn_store_selectall()
  CREATE OR REPLACE FUNCTION stored.fn_store_selectall()
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      begin   
        RETURN QUERY ( SELECT * 	FROM stored.ta_store ORDER BY id);
      end; 
  $$;

    -- FUNCTION: stored.fn_store_selectone(id_ int)
  CREATE OR REPLACE FUNCTION stored.fn_store_selectone(id_ int)
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      begin   
        RETURN QUERY ( SELECT * 	FROM stored.ta_store WHERE stored.ta_store.id=id_);
      end; 
  $$;

    -- FUNCTION: stored.fn_store_selectcod(cod_ text)
  CREATE OR REPLACE FUNCTION stored.fn_store_selectcod(cod_ text)
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      begin   
        RETURN QUERY ( SELECT * FROM stored.ta_store WHERE stored.ta_store.cod=cod_);
      end; 
  $$;

    -- FUNCTION: stored.fn_store_selectnam(nam_ text)
  CREATE OR REPLACE FUNCTION stored.fn_store_selectnam(nam_ text)
      RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
      LANGUAGE 'plpgsql'
      AS $$
      begin   
        RETURN QUERY ( SELECT * FROM stored.ta_store WHERE stored.ta_store.nam=nam_);
      end; 
  $$;

-- TranMovBody
CREATE TABLE stored.Ta_TranMovHeder
(
  id            uuid        DEFAULT gen_random_uuid(),
  numDocom     int         NOT NULL,
  cod_store      varchar(3)  NOT NULL,
  dat           date        NOT NULL ,
  cod_kinDoc    varchar(2)  NOT NULL,
  datNow       date        DEFAULT now() ,  
  id_user       smallint    ,
  account_finnn int         ,
  join_         char(2)     ,
  numJoin       int         ,
  jop           int         DEFAULT 0 ,
  post          smallint    ,
  PRIMARY KEY (id)   
);

CREATE TABLE stored.Ta_TranMovBody
(
  id            uuid  DEFAULT gen_random_uuid(),
  id_heder      uuid  NOT NULL,  
  id_item       uuid        ,  
  cont          int   DEFAULT 0,
  price         int   DEFAULT 0,
  total         int   GENERATED ALWAYS AS (cont * prise) STORED,
  nots          varchar(250),
  averg         decimal(15,5),
  totalAvg      decimal(15,5),
  datNow       date   DEFAULT now(),
  PRIMARY KEY (id)
);
  -- FUNCTION: Stored.fn_TranMovBody_Insert(id_heder_ uuid, id_item_ uuid, cont_ int, prise_ int, nots_ varchar(250))
CREATE OR REPLACE FUNCTION Stored.fn_TranMovBody_Insert(
  id_heder_     uuid,
  id_item_      uuid ,
  cont_         int,
  prise_        int,
  nots_         varchar(250)
  )
    RETURNS TABLE(
      id uuid ,
      id_heder uuid,
      id_item uuid,
      cont int,
      prise int,
      total int,
      nots varchar(250),
      averg decimal(15,5),
      totalAvg decimal(15,5), 
      datNow date
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      INSERT INTO stored.ta_tranmovbody(
	      id_heder, id_item, cont, prise, nots)
	      VALUES (id_heder_,id_item_,cont_, prise_,nots_ );
      RETURN QUERY ( SELECT * 	FROM Stored.ta_TranMovBody ORDER BY id_heder);
    end; 
$$;

  -- FUNCTION: Stored.fn_TranMovBody_update(id_ uuid, id_heder_ uuid, id_item_ uuid, cont_ int, prise_ int, nots_ varchar(250))
CREATE OR REPLACE FUNCTION Stored.fn_TranMovBody_update(
  id_           uuid,
  id_item_      uuid ,
  cont_         int,
  prise_        int,
  nots_         varchar(250)
  )
    RETURNS TABLE(
      id uuid ,
      id_heder uuid,
      id_item uuid,
      cont int,
      prise int,
      total int,
      nots varchar(250),
      averg decimal(15,5),
      totalAvg decimal(15,5), 
      datNow date
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE Stored.ta_TranMovBody SET id_item=id_item_, cont=cont_, prise=prise_, nots=nots_ WHERE Stored.ta_TranMovBody.id=id_;
      RETURN QUERY ( SELECT * 	FROM Stored.ta_TranMovBody ORDER BY id_heder);
    end; 
$$;

  -- FUNCTION: Stored.fn_TranMovBody_delete(id_ uuid)
CREATE OR REPLACE FUNCTION Stored.fn_TranMovBody_delete(id_ uuid)
    RETURNS TABLE(
      id uuid ,
      id_heder uuid,
      id_item uuid,
      cont int,
      prise int,
      total int,
      nots varchar(250),
      averg decimal(15,5),
      totalAvg decimal(15,5), 
      datNow date
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM Stored.ta_TranMovBody WHERE Stored.ta_TranMovBody.id=id_;
      RETURN QUERY ( SELECT * 	FROM Stored.ta_TranMovBody ORDER BY id_heder);
    end; 
$$;

  -- FUNCTION: Stored.fn_TranMovBody_selectall()
CREATE OR REPLACE FUNCTION Stored.fn_TranMovBody_selectall()
    RETURNS TABLE(
      id uuid ,
      id_heder uuid,
      id_item uuid,
      cont int,
      prise int,
      total int,
      nots varchar(250),
      averg decimal(15,5),
      totalAvg decimal(15,5), 
      datNow date
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY 
        ( SELECT * 	FROM Stored.ta_TranMovBody ORDER BY id_heder);
    end; 
$$;

  -- FUNCTION: Stored.fn_TranMovBody_selectone(id_ uuid)
CREATE OR REPLACE FUNCTION Stored.fn_TranMovBody_selectone(id_ uuid)
    RETURNS TABLE(
      id uuid ,
      id_heder uuid,
      id_item uuid,
      cont int,
      prise int,
      total int,
      nots varchar(250),
      averg decimal(15,5),
      totalAvg decimal(15,5), 
      datNow date
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY
        ( SELECT * 	FROM Stored.ta_TranMovBody WHERE Stored.ta_TranMovBody.id=id_);
    end; 
$$;

  -- FUNCTION: Stored.fn_TranMovBody_selectHeder(id_heder_ uuid)
CREATE OR REPLACE FUNCTION Stored.fn_TranMovBody_selectHeder(id_heder_ uuid)
    RETURNS TABLE(
      id uuid ,
      id_heder uuid,
      id_item uuid,
      cont int,
      prise int,
      total int,
      nots varchar(250),
      averg decimal(15,5),
      totalAvg decimal(15,5), 
      datNow date
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM Stored.ta_TranMovBody WHERE Stored.ta_TranMovBody.id_heder=id_heder_);
    end; 
$$;

-- TranMovHeder
  -- FUNCTION: stored.fn_TranMovHeder_insert(num_docom_ int,cod_store_ varchar(3), dat_ date, cod_kindoc_ varchar(2), id_user_ int, account_finnn_ int, jop_ int)
CREATE OR REPLACE FUNCTION stored.fn_TranMovHeder_Insert(
  num_docom_        int, 
  cod_store_         varchar(3), 
  dat_              date, 
  cod_kindoc_       varchar(2), 
  id_user_          int, 
  account_finnn_    int, 
  jop_              int
  )
    RETURNS TABLE(
      id uuid, 
      num_docom int, 
      cod_store varchar(3),
      dat date, 
      cod_kinDoc varchar(2),
      datNow date, 
      id_user smallint,
      account_finnn int,
      join_         char(2),
      numJoin      int,
      jop          int,
      post         smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      INSERT INTO stored.ta_tranmovheder(
	      num_docom, cod_store, dat, cod_kindoc, id_user, account_finnn, jop)
	      VALUES (num_docom_, cod_store_, dat_, cod_kindoc_, id_user_, account_finnn_, jop_);
      RETURN QUERY 
        ( 
          SELECT * FROM stored.ta_TranMovHeder where 
          (num_docom=num_docom_, cod_store=cod_store_, cod_kindoc=cod_kindoc_) 
        );
    end; 
$$;

  -- FUNCTION: stored.fn_TranMovHeder_update(id_ uuid, num_docom_ int, cod_store_ varchar(3), dat_ date, cod_kindoc_ varchar(2), id_user_ int, account_finnn_ int, jop_ int)
CREATE OR REPLACE FUNCTION stored.fn_TranMovHeder_update(
  id_               uuid, 
  num_docom_        int, 
  cod_store_         varchar(3), 
  dat_              date, 
  cod_kindoc_       varchar(2), 
  id_user_          int, 
  account_finnn_    int, 
  jop_              int
      )
    RETURNS TABLE(
      id uuid, 
      num_docom int, 
      cod_store varchar(3),
      dat date, 
      cod_kinDoc varchar(2),
      datNow date, 
      id_user smallint,
      account_finnn int,
      join_         char(2),
      numJoin      int,
      jop          int,
      post         smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE stored.ta_TranMovHeder SET 
          num_docom=num_docom_, 
          cod_store=cod_store_, 
          dat=dat_, 
          cod_kindoc=cod_kindoc_, 
          id_user=id_user_, 
          account_finnn=account_finnn_, 
          jop=jop_ 
        WHERE stored.ta_TranMovHeder.id=id_;
      RETURN QUERY ( SELECT * FROM stored.ta_TranMovHeder ORDER BY dat);
    end; 
$$;

  -- FUNCTION: stored.fn_TranMovHeder_delete(id_ uuid)
CREATE OR REPLACE FUNCTION stored.fn_TranMovHeder_delete(id_ uuid)
        RETURNS TABLE(
      id uuid, 
      num_docom int, 
      cod_store varchar(3),
      dat date, 
      cod_kinDoc varchar(2),
      datNow date, 
      id_user smallint,
      account_finnn int,
      join_         char(2),
      numJoin      int,
      jop          int,
      post         smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM stored.ta_TranMovHeder WHERE stored.ta_TranMovHeder.id=id_;
      RETURN QUERY ( SELECT * 	FROM stored.ta_TranMovHeder ORDER BY dat);
    end; 
$$;

  -- FUNCTION: stored.fn_TranMovHeder_selectall()
CREATE OR REPLACE FUNCTION stored.fn_TranMovHeder_selectall()
        RETURNS TABLE(
      id uuid, 
      num_docom int, 
      cod_store varchar(3),
      dat date, 
      cod_kinDoc varchar(2),
      datNow date, 
      id_user smallint,
      account_finnn int,
      join_         char(2),
      numJoin      int,
      jop          int,
      post         smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM stored.ta_TranMovHeder ORDER BY dat);
    end; 
$$;

  -- FUNCTION: stored.fn_TranMovHeder_selectone(id_ uuid)
CREATE OR REPLACE FUNCTION stored.fn_TranMovHeder_selectone(id_ uuid)
     RETURNS TABLE(
      id uuid, 
      num_docom int, 
      cod_store varchar(3),
      dat date, 
      cod_kinDoc varchar(2),
      datNow date, 
      id_user smallint,
      account_finnn int,
      join_         char(2),
      numJoin      int,
      jop          int,
      post         smallint
      )
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * 	FROM stored.ta_TranMovHeder WHERE stored.ta_TranMovHeder.id=id_);
    end; 
$$;

  -- FUNCTION: stored.fn_TranMovHeder_selectforone(num_docom_ int,cod_store_ varchar(3), cod_kindoc_ varchar(2))
CREATE OR REPLACE FUNCTION stored.fn_TranMovHeder_selectforone(
  num_docom_        int, 
  cod_store_         varchar(3), 
  cod_kindoc_       varchar(2)
  )
    RETURNS TABLE(
      id uuid, 
      num_docom int, 
      cod_store varchar(3),
      dat date, 
      cod_kinDoc varchar(2),
      datNow date, 
      id_user smallint,
      account_finnn int,
      join_         char(2),
      numJoin      int,
      jop          int,
      post         smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY 
        ( 
          SELECT * FROM stored.ta_TranMovHeder where 
          (num_docom=num_docom_, cod_store=cod_store_, cod_kindoc=cod_kindoc_) 
        );
    end; 
$$;
