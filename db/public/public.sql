-- no view
CREATE TABLE public.Ta_parts
(
  id      smallint NOT NULL,
  nam     varchar(20)   ,
  id_levl    smallint DEFAULT 1,
  dependency  smallint,
  PRIMARY KEY (id)
);

CREATE TABLE public.Ta_KinDoc
(
  id          smallint      NOT NULL,
  cod         varchar(2)  NOT NULL,
  nam         varchar(35) NOT NULL,
  id_parts    int     ,
  kin_move    smallint     ,
  reflux      Boolean,
  id_user     smallint    ,
  PRIMARY KEY (id)
);


CREATE TABLE public.Ta_levels
(
  id      smallint NOT NULL,
  nam     varchar(20)   ,
  PRIMARY KEY (id)
);

ALTER TABLE public.Ta_parts
  ADD CONSTRAINT FK_Ta_levels_TO_Ta_parts
    FOREIGN KEY (id_levl)
    REFERENCES public.Ta_parts (id);


    -- FUNCTION: items.tttt()

-- DROP FUNCTION IF EXISTS items.tttt();

CREATE OR REPLACE FUNCTION items.fn_tabelCar(inout id_ int	)
RETURNS table(
    id smallint ,
    name character varying(20),
    dat date,
    id_user smallint
    
)
      
AS

$$
begin
set id_=select max(id)+1 from  items.ta_cars;
INSERT INTO items.ta_cars(
	id, name, dat, id_user)
	VALUES (id_,'ahmed','02/02/2025',10);

RETURN QUERY 
select * from  items.ta_cars;
end;
$$
 LANGUAGE 'plpgsql';



-- FUNCTION: items.rrr(date)

-- DROP FUNCTION IF EXISTS items.rrr(date);

CREATE OR REPLACE FUNCTION items.rrr(
	hhhhh date)
    RETURNS integer
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
select max(id) from items.ta_cars
$BODY$;

ALTER FUNCTION items.rrr(date)
    OWNER TO postgres;

