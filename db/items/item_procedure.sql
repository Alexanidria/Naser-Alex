-- Car
  -- FUNCTION: items.fn_car_insert(text, integer)
CREATE OR REPLACE FUNCTION Items.fn_car_Insert(nam_ text,id_user_ int)
    RETURNS TABLE(id smallint, nam character varying,dat date, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    declare   
      max_id integer;
    begin   
      select COALESCE(MAX(items.ta_car.id), 0) + 1 into max_id from items.ta_car ;
      INSERT INTO items.ta_car (id,nam,id_user)
        VALUES (max_id,nam_,id_user_);
      RETURN QUERY ( SELECT * FROM items.ta_car ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_car_update(integer, text, integer)
CREATE OR REPLACE FUNCTION Items.fn_car_update(id_ int,nam_ text,id_user_ int)
    RETURNS TABLE(id smallint, nam character varying,dat date, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE items.ta_car SET nam=nam_,id_user=id_user_ WHERE items.ta_car.id=id_;
      RETURN QUERY ( SELECT * FROM items.ta_car ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_car_delete(integer)
CREATE OR REPLACE FUNCTION Items.fn_car_delete(id_ int)
    RETURNS TABLE(id smallint, nam character varying,dat date, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM items.ta_car WHERE items.ta_car.id=id_;
      RETURN QUERY ( SELECT * FROM items.ta_car ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_car_selectall()
CREATE OR REPLACE FUNCTION Items.fn_car_selectall()
    RETURNS TABLE(id smallint, nam character varying,dat date, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY (SELECT * FROM items.ta_car ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_car_selectone(integer)
CREATE OR REPLACE FUNCTION Items.fn_car_selectone(id_ int)
    RETURNS TABLE(id smallint, nam character varying,dat date, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_car WHERE items.ta_car.id=id_);
    end; 
$$;

  -- FUNCTION: items.fn_car_selectname(text)
CREATE OR REPLACE FUNCTION Items.fn_car_selectname(nam_ text)
    RETURNS TABLE(id smallint, nam character varying,dat date, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_car WHERE items.ta_car.nam=nam_);
    end; 
$$;

-- Genral
  -- FUNCTION: items.fn_genral_insert(text, text, integer)
CREATE OR REPLACE FUNCTION Items.fn_genral_Insert(cod_ text,  nam_ text,  id_user_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    declare   
      max_id integer;
    begin   
      select COALESCE(MAX(items.ta_genral.id), 0) + 1 into max_id from items.ta_genral ;
      INSERT INTO items.ta_genral (id,cod,nam,id_user)
        VALUES (max_id,cod_,nam_,id_user_);
      RETURN QUERY ( SELECT * 	FROM items.ta_genral ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_genral_update(integer,text, text, integer)
CREATE OR REPLACE FUNCTION Items.fn_genral_update(id_ int,cod_ text,nam_ text, id_user_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE items.ta_genral SET nam=nam_, id_user=id_user_ , cod=cod_ WHERE items.ta_genral.id=id_;
      RETURN QUERY ( SELECT * 	FROM items.ta_genral ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_genral_delete(integer)
CREATE OR REPLACE FUNCTION Items.fn_genral_delete(id_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM items.ta_genral WHERE items.ta_genral.id=id_;
      RETURN QUERY ( SELECT * 	FROM items.ta_genral ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_genral_selectall()
CREATE OR REPLACE FUNCTION Items.fn_genral_selectall()
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * 	FROM items.ta_genral ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_genral_selectone(integer)
CREATE OR REPLACE FUNCTION Items.fn_genral_selectone(id_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * 	FROM items.ta_genral WHERE items.ta_genral.id=id_);
    end; 
$$;

  -- FUNCTION: items.fn_genral_selectcode(text)
CREATE OR REPLACE FUNCTION Items.fn_genral_selectcode(cod_ text)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_genral WHERE items.ta_genral.cod=cod_);
    end; 
$$;

-- Item
  -- FUNCTION: items.fn_item_insert(character varying, character varying, character varying, smallint, smallint, smallint, smallint, date, smallint)
CREATE OR REPLACE FUNCTION Items.fn_item_Insert(
  num_              varchar(20) ,
  code_storeSupler_ varchar(4)  ,
  nam_              varchar(50) ,
  rereqost_         smallint   ,
  id_user_          smallint    ,
  id_genral_        smallint    ,
  id_unit_          smallint    ,
  dateAdd_          date        ,
  id_car_           smallint    
  )
    RETURNS TABLE(
      id uuid,
      num              varchar(20),
      code_storeSupler varchar(4),
      nam              varchar(50),
      rereqost         smallint,
      id_user          smallint,   
      id_genral        smallint,
      id_unit          smallint,
      dateAdd          date,
      dateModif        date,
      id_car           smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      INSERT INTO items.ta_item(
	      num, code_storesupler, nam, rereqost, id_user, 
        id_genral, id_unit, dateadd, id_car)
	    VALUES (num_, code_storesupler_, nam_, rereqost_, id_user_, 
        id_genral_, id_unit_, dateadd_, id_car_);
      RETURN QUERY ( SELECT * FROM items.ta_item ORDER BY nam);
    end; 
$$;

  -- FUNCTION: items.fn_item_update(uuid, character varying, character varying, character varying, smallint, smallint, smallint, smallint, date, smallint)
CREATE OR REPLACE FUNCTION Items.fn_item_Update(
  id_               uuid,
  num_              varchar(20) ,
  code_storeSupler_ varchar(4)  ,
  nam_              varchar(50) ,
  rereqost_         smallint   ,
  id_user_          smallint    ,
  id_genral_        smallint    ,
  id_unit_          smallint    ,
  dateModif_        date        ,
  id_car_           smallint    
  )
    RETURNS TABLE(
      id uuid,
      num              varchar(20),
      code_storeSupler varchar(4),
      nam              varchar(50),
      rereqost         smallint,
      id_user          smallint,   
      id_genral        smallint,
      id_unit          smallint,
      dateAdd          date,
      dateModif        date,
      id_car           smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE Items.Ta_Item SET 
        num=num_,code_storesupler=code_storesupler_, nam=nam_,  
        rereqost=rereqost_,id_user=id_user_, id_genral=id_genral_,
        id_unit=id_unit_, dateModif=dateModif_,id_car=id_car_ 
      WHERE items.ta_item.id=id_ ; 
      RETURN QUERY (SELECT * FROM items.ta_item ORDER BY nam);
    end; 
$$;

  -- FUNCTION: items.fn_item_delete(uuid)
CREATE OR REPLACE FUNCTION Items.fn_item_delete(id_  uuid)
    RETURNS TABLE(
      id uuid,
      num              varchar(20),
      code_storeSupler varchar(4),
      nam              varchar(50),
      rereqost         smallint,
      id_user          smallint,   
      id_genral        smallint,
      id_unit          smallint,
      dateAdd          date,
      dateModif        date,
      id_car           smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM Items.Ta_Item WHERE items.ta_item.id=id_ ; 
      RETURN QUERY (SELECT * FROM items.ta_item ORDER BY nam);
    end; 
$$;

  -- FUNCTION: items.fn_item_selectall()
CREATE OR REPLACE FUNCTION Items.fn_item_selectall()
    RETURNS TABLE(
      id uuid,
      num              varchar(20),
      code_storeSupler varchar(4),
      nam              varchar(50),
      rereqost         smallint,
      id_user          smallint,   
      id_genral        smallint,
      id_unit          smallint,
      dateAdd          date,
      dateModif        date,
      id_car           smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY (SELECT * FROM items.ta_item ORDER BY nam);
    end; 
$$;

  -- FUNCTION: items.fn_item_selectone(uuid)
CREATE OR REPLACE FUNCTION Items.fn_item_selectone(id_  uuid)
    RETURNS TABLE(
      id uuid,
      num              varchar(20),
      code_storeSupler varchar(4),
      nam              varchar(50),
      rereqost         smallint,
      id_user          smallint,   
      id_genral        smallint,
      id_unit          smallint,
      dateAdd          date,
      dateModif        date,
      id_car           smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_item WHERE items.ta_item.id=id_);
    end; 
$$;

  -- FUNCTION: items.fn_item_selectnumber_supler(text,text)
CREATE OR REPLACE FUNCTION Items.fn_item_selectnumber_supler(num_ varchar(20),code_storeSupler_ varchar(4) )
    RETURNS TABLE(
      id uuid,
      num              varchar(20),
      code_storeSupler varchar(4),
      nam              varchar(50),
      rereqost         smallint,
      id_user          smallint,   
      id_genral        smallint,
      id_unit          smallint,
      dateAdd          date,
      dateModif        date,
      id_car           smallint
      ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_item 
      WHERE items.ta_item.num=num_ AND items.ta_item.code_storeSupler=code_storeSupler_);
    end; 
$$;

-- Store Supler
  -- FUNCTION: items.fn_storeSupler_insert(text, text,text, integer)
CREATE OR REPLACE FUNCTION Items.fn_storeSupler_Insert(cod_ text,  nam_ text, cod_store_ text, id_user_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, cod_store character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    declare   
      max_id integer;
    begin   
      select COALESCE(MAX(items.ta_storeSupler.id), 0) + 1 into max_id from items.ta_storeSupler ;
      INSERT INTO items.ta_storeSupler (id,cod,nam,cod_store,id_user)
        VALUES (max_id,cod_,nam_,cod_store_,id_user_);
      RETURN QUERY ( SELECT * 	FROM items.ta_storeSupler ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_storeSupler_update(integer,text, text,text, integer)
CREATE OR REPLACE FUNCTION Items.fn_storeSupler_update(id_ int,cod_ text,  nam_ text, cod_store_ text, id_user_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, cod_store character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE items.ta_storeSupler SET 
        nam=nam_, cod_store=cod_store_, id_user=id_user_ , cod=cod_ 
      WHERE items.ta_storeSupler.id=id_;
      RETURN QUERY ( SELECT * 	FROM items.ta_storeSupler ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_storeSupler_delete(integer)
CREATE OR REPLACE FUNCTION Items.fn_storeSupler_delete(id_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, cod_store character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM items.ta_storeSupler WHERE items.ta_storeSupler.id=id_;
      RETURN QUERY ( SELECT * FROM items.ta_storeSupler ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_storeSupler_selectall()
CREATE OR REPLACE FUNCTION Items.fn_storeSupler_selectall()
    RETURNS TABLE(id smallint, cod character varying, nam character varying, cod_store character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_storeSupler ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_storeSupler_selectone(integer)
CREATE OR REPLACE FUNCTION Items.fn_storeSupler_selectone(id_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, cod_store character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * 	FROM items.ta_storeSupler WHERE items.ta_storeSupler.id=id_);
    end; 
$$;

  -- FUNCTION: items.fn_storeSupler_selectcode(text)
CREATE OR REPLACE FUNCTION Items.fn_storeSupler_selectcode(cod_ text)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, cod_store character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_storeSupler WHERE items.ta_storeSupler.cod=cod_);
    end; 
$$;

-- Unit
  -- FUNCTION: items.fn_unit_insert(text, text, integer)
CREATE OR REPLACE FUNCTION Items.fn_unit_Insert(cod_ text,  nam_ text,  id_user_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    declare   
      max_id integer;
    begin   
      select COALESCE(MAX(items.ta_unit.id), 0) + 1 into max_id from items.ta_unit ;
      INSERT INTO items.ta_unit (id,cod,nam,id_user)
        VALUES (max_id,cod_,nam_,id_user_);
      RETURN QUERY ( SELECT * FROM items.ta_unit ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_unit_update(integer,text, text, integer)
CREATE OR REPLACE FUNCTION Items.fn_unit_Update(id_ int,cod_ text,  nam_ text,  id_user_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE items.ta_unit SET nam=nam_,id_user=id_user_  ,cod=cod_ WHERE items.ta_unit.id =id_;
      RETURN QUERY ( SELECT * FROM items.ta_unit ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_unit_delete(integer)
CREATE OR REPLACE FUNCTION Items.fn_unit_delete(id_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM items.ta_unit WHERE items.ta_unit.id =id_;
      RETURN QUERY (SELECT * FROM items.ta_unit ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_unit_selectall()
CREATE OR REPLACE FUNCTION Items.fn_unit_selectall()
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY (SELECT * FROM items.ta_unit ORDER BY id);
    end; 
$$;

  -- FUNCTION: items.fn_unit_selectone(integer)
CREATE OR REPLACE FUNCTION Items.fn_unit_selectone(id_ int)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_unit WHERE items.ta_unit.id=id_);
    end; 
$$;

  -- FUNCTION: items.fn_unit_selectcode(text)
CREATE OR REPLACE FUNCTION Items.fn_unit_selectcode(cod_ text)
    RETURNS TABLE(id smallint, cod character varying, nam character varying, id_user smallint) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM items.ta_unit WHERE items.ta_unit.cod=cod_);
    end; 
$$;

-- Item Balance Up To

-- Item Balance End 