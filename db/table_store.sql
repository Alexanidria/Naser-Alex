
CREATE TABLE [store].[Ta_TranMovHeder](
	[id_heder] [int] NOT NULL,
	[num_docom] [int] NOT NULL,
	[codStore] [nvarchar](3) NOT NULL,
	[dat] [date] NOT NULL,
	[cod_kin_doc] [nvarchar](2) NOT NULL,
	[cod_kin_doc2] [nvarchar](2) NULL,
	[num_doc2] [nvarchar](50) NULL,
	[dat_doc2] [date] NULL,
	[dat_now] [date] NULL,
	[kin_mov] [tinyint] NULL,
	[idManStore] [tinyint] NULL,
	[id_user] [tinyint] NULL,
	[account] [int] NULL,
	[join] [char](2) NULL,
	[numJoin] [int] NULL,
	[jop] [int] NULL,
	[post] [tinyint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_TranMovBody](
	[id_body] [int] NOT NULL,
	[id_heder] [int] NOT NULL,
	[num_ducom] [int] NULL,
	[num_itm] [nvarchar](20) NULL,
	[codBasicSupler] [nvarchar](10) NULL,
	[cont] [decimal](15, 5) NULL,
	[prise] [decimal](15, 5) NULL,
	[total] [decimal](15, 5) NULL,
	[kin_mov] [tinyint] NULL,
	[post] [tinyint] NULL,
	[conter] [tinyint] NULL,
	[nots] [nvarchar](250) NULL,
	[averg] [decimal](15, 5) NULL,
	[totalAvg] [decimal](15, 5) NULL,
	[id_user] [tinyint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_PostBody](
	[id] [tinyint] NOT NULL,
	[id_add_tran] [int] NOT NULL,
	[cost_avg_itm] [decimal](15, 5) NULL,
	[cost_avg_tot] [decimal](15, 5) NULL
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_PostBalance](
	[id] [tinyint] NOT NULL,
	[idEnd] [int] NOT NULL,
	[stoc] [nvarchar](3) NULL,
	[cod_stoc] [nvarchar](10) NULL,
	[cont] [decimal](15, 5) NULL,
	[av_cost] [decimal](15, 5) NULL,
	[total] [decimal](15, 5) NULL,
	[cont_add] [decimal](15, 5) NULL,
	[cont_addReflux] [decimal](15, 5) NULL,
	[cont_out] [decimal](15, 5) NULL,
	[cont_outReflux] [decimal](15, 5) NULL
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_post](
	[id] [tinyint] NOT NULL,
	[datePost0] [date] NULL,
	[datePost1] [date] NULL,
	[dateNow] [date] NULL,
	[countFile] [int] NULL,
 CONSTRAINT [PK_Ta_post] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_ItemBalanceUpTo](
	[id] [int] NOT NULL,
	[num_item] [nvarchar](20) NULL,
	[stoc] [nvarchar](3) NULL,
	[cod_stoc] [nvarchar](10) NULL,
	[last_cost] [decimal](12, 5) NULL,
	[dat_add] [date] NULL,
	[dat_out] [date] NULL,
	[cont0] [decimal](12, 5) NULL,
	[av_cost0] [decimal](12, 5) NULL,
	[total0] [decimal](13, 5) NULL,
 CONSTRAINT [Pk_Ta_ItemBalanceUpTo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_ItemBalanceEnd](
	[id] [int] NOT NULL,
	[num_item] [nvarchar](20) NULL,
	[stoc] [nvarchar](3) NULL,
	[cod_stoc] [nvarchar](10) NULL,
	[cont] [decimal](12, 5) NULL,
	[av_cost] [decimal](12, 5) NULL,
	[total] [decimal](13, 5) NULL,
	[cont_add] [decimal](12, 5) NULL,
	[cont_addReflux] [decimal](12, 5) NULL,
	[cont_out] [decimal](12, 5) NULL,
	[cont_outReflux] [decimal](12, 5) NULL,
	[dat_Post] [date] NULL,
	[posting] [tinyint] NULL,
 CONSTRAINT [Pk_Ta_ItemBalanceEnd] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_ITem](
	[id] [int] NOT NULL,
	[num] [nvarchar](20) NOT NULL,
	[nam] [nvarchar](50) NOT NULL,
	[datMov] [date] NULL,
	[cod_genral] [nvarchar](2) NULL,
	[rereqost] [tinyint] NULL,
	[id_user] [smallint] NULL,
	[cod_kin_unit] [nvarchar](2) NULL,
 CONSTRAINT [PK_Ta_ITem] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_basicUnit](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](2) NOT NULL,
	[nam] [nvarchar](20) NOT NULL,
	[id_user] [tinyint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_basicSupler](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](4) NOT NULL,
	[nam] [nvarchar](30) NOT NULL,
	[codStore] [nchar](3) NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_Ta_basicSupler] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[cod] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_basicStore](
	[id_stoc] [tinyint] NOT NULL,
	[cod] [nvarchar](3) NOT NULL,
	[nam] [nvarchar](50) NOT NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_Ta_basicStore] PRIMARY KEY CLUSTERED 
(
	[id_stoc] ASC,
	[cod] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_basicManStore](
	[id] [tinyint] NULL,
	[cod] [nvarchar](3) NULL,
	[id_man] [tinyint] NULL,
	[dat0] [date] NULL
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_basicKinDoc](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](2) NOT NULL,
	[nam] [nvarchar](35) NOT NULL,
	[jop] [tinyint] NULL,
	[adde_out] [tinyint] NULL,
	[reflux] [bit] NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_Ta_basicKinDoc] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[cod] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [store].[Ta_basicGenral](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](2) NOT NULL,
	[nam] [nvarchar](20) NOT NULL,
	[id_user] [tinyint] NULL
) ON [PRIMARY]
GO
