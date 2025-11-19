-- Kine Docment
    -- FUNCTION: public.fn_kinDoc_insert(cod, nam, id_parts, kin_move, reflux, id_user)
  CREATE OR REPLACE FUNCTION public.fn_kinDoc_Insert(
  cod_          varchar(2),
  nam_          varchar(35),
  id_parts_     int, 
  kin_move_     int  , 
  reflux_       Boolean, 
  id_user_      int
  )
    RETURNS Void 
    LANGUAGE 'plpgsql'
    AS $$
    declare   
      max_id integer;
    begin   
      select COALESCE(MAX(public.ta_kinDoc.id), 0) + 1 into max_id from public.ta_kinDoc ;
      INSERT INTO public.ta_kindoc(id, cod, nam, id_parts, kin_move, reflux, id_user)
	      VALUES (max_id,cod_,nam_,id_parts_, kin_move_, reflux_, id_user_);
    end; 
  $$;

    -- FUNCTION: public.fn_kinDoc_update(id, cod, nam, id_parts, kin_move, reflux, id_user)
  CREATE OR REPLACE FUNCTION public.fn_kinDoc_update(
  id_           int,
  cod_          varchar(2),
  nam_          varchar(35),
  id_parts_     int, 
  kin_move_     int  , 
  reflux_       Boolean, 
  id_user_      int
  )
    RETURNS Void
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE public.ta_kinDoc SET 
      cod=cod_,nam=nam_,id_parts=id_parts_,
      kin_move=kin_move_,reflux=reflux_,id_user=id_user_ 
      WHERE public.ta_kinDoc.id=id_;
    end; 
  $$;

    -- FUNCTION: public.fn_kinDoc_delete(id)
  CREATE OR REPLACE FUNCTION public.fn_kinDoc_delete(id_ int)
    RETURNS Void
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM public.ta_kinDoc WHERE public.ta_kinDoc.id=id_;
    end; 
  $$;

   -- FUNCTION: public.fn_kinDoc_selectall()
  CREATE OR REPLACE FUNCTION public.fn_kinDoc_selectall()
    RETURNS TABLE( id int, cod varchar(2),nam varchar(35),id_parts int,kin_move int,reflux Boolean,id_user int) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY (SELECT * FROM public.ta_kinDoc ORDER BY id);
    end; 
  $$;

   -- FUNCTION: public.fn_kinDoc_selectone(id)
  CREATE OR REPLACE FUNCTION public.fn_kinDoc_selectone(id_ int)
    RETURNS TABLE( id int, cod varchar(2),nam varchar(35),id_parts int,kin_move int,reflux Boolean,id_user int) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM public.ta_kinDoc WHERE public.ta_kinDoc.id=id_);
    end; 
  $$;

   -- FUNCTION: public.fn_kinDoc_selectcod(cod)
  CREATE OR REPLACE FUNCTION public.fn_kinDoc_selectcod(cod_ text)
   RETURNS TABLE( id int, cod varchar(2),nam varchar(35),id_parts int,kin_move int,reflux Boolean,id_user int) 
   LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM public.ta_kinDoc WHERE public.ta_kinDoc.cod=cod_);
    end; 
  $$;

CREATE TABLE public.Ta_parts
(
  id      smallint NOT NULL,
  nam     varchar(20)   ,
  id_levl    smallint DEFAULT 1,
  dependency  smallint,
  PRIMARY KEY (id)
);

-- parts
    -- FUNCTION: public.fn_parts_insert( nam, id_levl)
  CREATE OR REPLACE FUNCTION public.fn_parts_Insert(
  nam_          varchar(20),
  id_levl_     int
  )
    RETURNS Void 
    LANGUAGE 'plpgsql'
    AS $$
    declare   
      max_id integer;
    begin   
      select COALESCE(MAX(public.ta_parts.id), 0) + 1 into max_id from public.ta_parts ;
      INSERT INTO public.ta_parts(id, nam, id_levl)
	      VALUES (max_id,nam_,id_levl_);
    end; 
  $$;

    -- FUNCTION: public.fn_parts_update(id, nam, id_levl)
  CREATE OR REPLACE FUNCTION public.fn_parts_update(
    id_           int,
   nam_          varchar(20),
    id_levl_     int
    )
    RETURNS Void
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      UPDATE public.ta_parts SET 
      cod=cod_,nam=nam_,id_parts=id_parts_,
      kin_move=kin_move_,reflux=reflux_,id_user=id_user_ 
      WHERE public.ta_parts.id=id_;
    end; 
  $$;

    -- FUNCTION: public.fn_parts_delete(id)
  CREATE OR REPLACE FUNCTION public.fn_parts_delete(id_ int)
    RETURNS Void
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      DELETE FROM public.ta_parts WHERE public.ta_parts.id=id_;
    end; 
  $$;

   -- FUNCTION: public.fn_parts_selectall()
  CREATE OR REPLACE FUNCTION public.fn_parts_selectall()
    RETURNS TABLE( ) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY (SELECT * FROM public.ta_parts ORDER BY id);
    end; 
  $$;

   -- FUNCTION: public.fn_parts_selectone(id)
  CREATE OR REPLACE FUNCTION public.fn_parts_selectone(id_ int)
    RETURNS TABLE( id int, cod varchar(2),nam varchar(35),id_parts int,kin_move int,reflux Boolean,id_user int) 
    LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM public.ta_parts WHERE public.ta_parts.id=id_);
    end; 
  $$;

   -- FUNCTION: public.fn_parts_selectcod(cod)
  CREATE OR REPLACE FUNCTION public.fn_parts_selectcod(cod_ text)
   RETURNS TABLE( id int, cod varchar(2),nam varchar(35),id_parts int,kin_move int,reflux Boolean,id_user int) 
   LANGUAGE 'plpgsql'
    AS $$
    begin   
      RETURN QUERY ( SELECT * FROM public.ta_parts WHERE public.ta_parts.cod=cod_);
    end; 
  $$;