CREATE SCHEMA items ;

CREATE TABLE items.Ta_car
(
  id      smallint    NOT NULL,
  nam     varchar(20) NOT NULL UNIQUE,
  dat     date        NOT NULL DEFAULT now(),
  id_user smallint   ,
  PRIMARY KEY (id)
);

CREATE TABLE items.Ta_Genral
(
  id      smallint    NOT NULL,
  cod     varchar(2)  NOT NULL UNIQUE,
  nam     varchar(20) NOT NULL,
  id_user smallint    NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE items.Ta_ITem
(
  id               uuid        DEFAULT gen_random_uuid(),
  num              varchar(20) NOT NULL UNIQUE,
  code_storeSupler varchar(4)  NOT NULL,
  nam              varchar(50) NOT NULL,
  rereqost         smallint   ,
  id_user          smallint    NOT NULL,
  id_genral        smallint    NOT NULL,
  id_unit          smallint    NOT NULL,
  dateAdd          date        NOT NULL,
  dateModif        date       ,
  id_car           smallint    NOT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX idx_employees_name ON employees (first_name, last_name);

CREATE TABLE items.Ta_storeSupler
(
  id       smallint    NOT NULL,
  cod     varchar(4)  NOT NULL UNIQUE,
  nam      varchar(30) NOT NULL,
  cod_store varchar(3)  NOT NULL,
  id_user  smallint    NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE items.Ta_Unit
(
  id      smallint    NOT NULL,
  cod     varchar(2)  NOT NULL UNIQUE,
  nam     varchar(20) NOT NULL,
  id_user smallint    NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE items.Ta_ItemBalanceEnd
(
  id             uuid        NOT NULL,
  cont           int         DEFAULT 0,
  av_cost        int         DEFAULT 0,
  total          int         DEFAULT 0,
  cont_add       int         DEFAULT 0,
  cont_addReflux int         DEFAULT 0,
  cont_out       int         DEFAULT 0,
  cont_outReflux int         DEFAULT 0,
  dat_Post       date       ,
  posting        smallint   
);

CREATE TABLE items.Ta_ItemBalanceUpTo
(
  id        uuid        NOT NULL,
  last_cost int    ,
  dat_add   date       ,
  dat_out   date       ,
  cont0     int   DEFAULT 0 ,
  av_cost0  int   DEFAULT 0,
  total0    int    DEFAULT 0
  
);


ALTER TABLE items.Ta_ITem
  ADD CONSTRAINT FK_Ta_basicGenral_TO_Ta_ITem
    FOREIGN KEY (id_genral)
    REFERENCES items.Ta_Genral (id);

ALTER TABLE items.Ta_ITem
  ADD CONSTRAINT FK_Ta_basicUnit_TO_Ta_ITem
    FOREIGN KEY (id_unit)
    REFERENCES items.Ta_Unit (id);

ALTER TABLE items.Ta_ITem
  ADD CONSTRAINT FK_Ta_car_TO_Ta_ITem
    FOREIGN KEY (id_car)
    REFERENCES items.Ta_car (id);

ALTER TABLE items.Ta_ITem
  ADD CONSTRAINT FK_Ta_storeSupler_TO_Ta_ITem
    FOREIGN KEY (code_storeSupler)
    REFERENCES items.Ta_storeSupler (cod);

ALTER TABLE items.Ta_ItemBalanceEnd
  ADD CONSTRAINT FK_Ta_ITem_TO_Ta_ItemBalanceEnd
    FOREIGN KEY (id)
    REFERENCES items.Ta_ITem (id);

ALTER TABLE items.Ta_ItemBalanceUpTo
  ADD CONSTRAINT FK_Ta_ITem_TO_Ta_ItemBalanceUpTo
    FOREIGN KEY (id)
    REFERENCES items.Ta_ITem (id);


-- Relationship outer the Schema

ALTER TABLE items.Ta_storeSupler
  ADD CONSTRAINT FK_Ta_store_TO_Ta_storeSupler
    FOREIGN KEY (cod_store)
    REFERENCES stored.Ta_store (cod);    
