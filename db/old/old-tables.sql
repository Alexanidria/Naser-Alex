CREATE SCHEMA IF NOT EXISTS old;

CREATE TABLE old.Ta_TranMovHeder (
	id_heder integer NOT NULL,
	num_docom integer NOT NULL,
	codStore varchar(3) NOT NULL,
	dat date NOT NULL,
	cod_kin_doc varchar(2) NOT NULL,
	cod_kin_doc2 varchar(2),
	num_doc2 varchar(50),
	dat_doc2 date,
	dat_now date,
	kin_mov smallint,
	idManStore smallint,
	id_user smallint,
	account integer,
	"join" char(2),
	numJoin integer,
	jop integer,
	post smallint
);

CREATE TABLE old.Ta_TranMovBody (
	id_body integer NOT NULL,
	id_heder integer NOT NULL,
	num_ducom integer,
	num_itm varchar(20),
	codBasicSupler varchar(10),
	cont numeric(15,5),
	prise numeric(15,5),
	total numeric(15,5),
	kin_mov smallint,
	post smallint,
	conter smallint,
	nots varchar(250),
	averg numeric(15,5),
	totalAvg numeric(15,5),
	id_user smallint
);

CREATE TABLE old.Ta_PostBody (
	id smallint NOT NULL,
	id_add_tran integer NOT NULL,
	cost_avg_itm numeric(15,5),
	cost_avg_tot numeric(15,5)
);

CREATE TABLE old.Ta_PostBalance (
	id smallint NOT NULL,
	idEnd integer NOT NULL,
	stoc varchar(3),
	cod_stoc varchar(10),
	cont numeric(15,5),
	av_cost numeric(15,5),
	total numeric(15,5),
	cont_add numeric(15,5),
	cont_addReflux numeric(15,5),
	cont_out numeric(15,5),
	cont_outReflux numeric(15,5)
);

CREATE TABLE old.Ta_post (
	id smallint NOT NULL PRIMARY KEY,
	datePost0 date,
	datePost1 date,
	dateNow date,
	countFile integer
);

CREATE TABLE old.Ta_ItemBalanceUpTo (
	id integer NOT NULL PRIMARY KEY,
	num_item varchar(20),
	stoc varchar(3),
	cod_stoc varchar(10),
	last_cost numeric(12,5),
	dat_add date,
	dat_out date,
	cont0 numeric(12,5),
	av_cost0 numeric(12,5),
	total0 numeric(13,5)
);

CREATE TABLE old.Ta_ItemBalanceEnd (
	id integer NOT NULL PRIMARY KEY,
	num_item varchar(20),
	stoc varchar(3),
	cod_stoc varchar(10),
	cont numeric(12,5),
	av_cost numeric(12,5),
	total numeric(13,5),
	cont_add numeric(12,5),
	cont_addReflux numeric(12,5),
	cont_out numeric(12,5),
	cont_outReflux numeric(12,5),
	dat_Post date,
	posting smallint
);

CREATE TABLE old.Ta_ITem (
	id integer NOT NULL PRIMARY KEY,
	num varchar(20) NOT NULL,
	nam varchar(50) NOT NULL,
	datMov date,
	cod_genral varchar(2),
	rereqost smallint,
	id_user smallint,
	cod_kin_unit varchar(2)
);

CREATE TABLE old.Ta_basicUnit (
	id smallint NOT NULL,
	cod varchar(2) NOT NULL,
	nam varchar(20) NOT NULL,
	id_user smallint
);

CREATE TABLE old.Ta_basicSupler (
	id smallint NOT NULL,
	cod varchar(4) NOT NULL,
	nam varchar(30) NOT NULL,
	codStore char(3),
	id_user smallint,
	PRIMARY KEY (id, cod)
);

CREATE TABLE old.Ta_basicStore (
	id_stoc smallint NOT NULL,
	cod varchar(3) NOT NULL,
	nam varchar(50) NOT NULL,
	id_user smallint,
	PRIMARY KEY (id_stoc, cod)
);

CREATE TABLE old.Ta_basicManStore (
	id smallint,
	cod varchar(3),
	id_man smallint,
	dat0 date
);

CREATE TABLE old.Ta_basicKinDoc (
	id smallint NOT NULL,
	cod varchar(2) NOT NULL,
	nam varchar(35) NOT NULL,
	jop smallint,
	adde_out smallint,
	reflux boolean,
	id_user smallint,
	PRIMARY KEY (id, cod)
);

CREATE TABLE old.Ta_basicGenral (
	id smallint NOT NULL,
	cod varchar(2) NOT NULL,
	nam varchar(20) NOT NULL,
	id_user smallint
);