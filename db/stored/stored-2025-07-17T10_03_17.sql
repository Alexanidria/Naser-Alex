CREATE SCHEMA stored ; 

CREATE TABLE stored.Ta_store
(
  id 	          smallint    NOT NULL,
  cod           varchar(3)  NOT NULL UNIQUE,
  nam           varchar(50) NOT NULL,
  id_user       smallint    NOT NULL,
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

ALTER TABLE stored.Ta_TranMovBody
  ADD CONSTRAINT FK_Ta_TranMovHeder_TO_Ta_TranMovBody
    FOREIGN KEY (id_heder)
    REFERENCES stored.Ta_TranMovHeder (id);

ALTER TABLE stored.Ta_TranMovHeder
  ADD CONSTRAINT FK_Ta_storeSupler_TO_Ta_TranMovHeder
    FOREIGN KEY (cod_store)
    REFERENCES stored.Ta_store (cod);

-- Relationship outer the Schema

ALTER TABLE items.Ta_storeSupler
  ADD CONSTRAINT FK_Ta_store_TO_Ta_storeSupler
    FOREIGN KEY (cod_store)
    REFERENCES stored.Ta_store (cod);

ALTER TABLE stored.Ta_TranMovHeder
  ADD CONSTRAINT FK_Ta_TranMovHeder_TO_Ta_TranMovBody
    FOREIGN KEY (cod_kinDoc)
    REFERENCES public.Ta_KinDoc (cod);

CREATE TABLE Ta_post
(
  id        tinyint NOT NULL,
  datePost0 date   ,
  datePost1 date   ,
  dateNow   date   ,
  countFile int    ,
  
);

CREATE TABLE Ta_PostBalance
(
  id             tinyint       NOT NULL,
  idEnd          int           NOT NULL,
  stoc           nvarchar(3)  ,
  cod_stoc       nvarchar(10) ,
  cont           decimal(15,5),
  av_cost        decimal(15,5),
  total          decimal(15,5),
  cont_add       decimal(15,5),
  cont_addReflux decimal(15,5),
  cont_out       decimal(15,5),
  cont_outReflux decimal(15,5)
);

CREATE TABLE Ta_PostBody
(
  id           tinyint       NOT NULL,
  id_add_tran  int           NOT NULL,
  cost_avg_itm decimal(15,5),
  cost_avg_tot decimal(15,5)
);

