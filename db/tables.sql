CREATE TABLE [dbo].[TafX_OutPeriod](
	[cod] [nvarchar](2) NOT NULL,
	[nam] [nvarchar](30) NULL,
 CONSTRAINT [PK_Ta_Tax_Out_Period] PRIMARY KEY CLUSTERED 
(
	[cod] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafX_OutKin](
	[id] [int] NOT NULL,
	[cod] [nvarchar](3) NULL,
	[nam] [nvarchar](50) NULL,
	[precnt] [decimal](2, 2) NULL,
 CONSTRAINT [PK_TafX_Outkin] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafX_OutDistricts](
	[id] [int] NOT NULL,
	[cod] [nvarchar](3) NULL,
	[nam] [nvarchar](50) NULL,
 CONSTRAINT [PK_Taf_Tax_Out_Districts] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafX_Bay](
	[cod_tax_bay] [tinyint] NOT NULL,
	[nam_tax_bay] [nvarchar](50) NULL,
	[pric_tax_bay] [decimal](2, 2) NULL,
 CONSTRAINT [PK_Ta_Tax_Bay] PRIMARY KEY CLUSTERED 
(
	[cod_tax_bay] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafM_InvoiceSupl](
	[id] [int] NOT NULL,
	[numInvo] [nvarchar](10) NULL,
	[datInvo] [date] NULL,
	[cod] [int] NULL,
	[tax_id] [nvarchar](9) NULL,
	[valInvo] [decimal](12, 3) NULL,
	[taxBay] [decimal](12, 3) NULL,
	[taxOut] [decimal](12, 3) NULL,
	[taxOutkin] [tinyint] NULL,
	[taxOutPre] [int] NULL,
	[docu_kin] [tinyint] NULL,
	[docu_num] [int] NULL,
	[docu_val] [decimal](12, 3) NULL,
	[joinNumOut] [int] NULL,
	[acontOut] [nvarchar](10) NULL,
	[post] [tinyint] NULL,
	[datMov] [date] NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_Taf_InvoiceSupl] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafB_Num](
	[id] [int] NOT NULL,
	[id_bank] [tinyint] NULL,
	[id_bank_branch] [int] NULL,
	[chek_num] [int] NULL,
	[num_book] [tinyint] NULL,
	[used] [tinyint] NULL,
 CONSTRAINT [PK_Taf_BankNum] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafB_Nam](
	[id] [tinyint] NOT NULL,
	[nam_bank] [nvarchar](50) NULL,
 CONSTRAINT [PK_Taf_Bank_Nam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO  

CREATE TABLE [dbo].[TafB_Mov](
	[id] [int] NOT NULL,
	[acount_numbank] [nvarchar](30) NULL,
	[valu] [decimal](13, 2) NULL,
	[chec_num] [int] NULL,
	[acountA] [nchar](10) NULL,
	[acountB] [nchar](10) NULL,
	[cashing] [tinyint] NULL,
	[kin_mov] [tinyint] NULL,
	[datCheq] [date] NULL,
	[delcheq] [tinyint] NULL,
 CONSTRAINT [PK_Taf_BankMov] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafB_Branch](
	[id] [int] NOT NULL,
	[id_bank] [tinyint] NULL,
	[branch] [nvarchar](20) NULL,
	[acount_bank] [nvarchar](30) NULL,
	[acont_num] [nvarchar](10) NULL,
	[kinCurrency] [nvarchar](2) NULL,
 CONSTRAINT [PK_Taf_BankBranch] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafA_SubKin](
	[id] [tinyint] NOT NULL,
	[cod] [nchar](2) NULL,
	[nam] [nvarchar](25) NULL,
 CONSTRAINT [PK_TafA_SubKin] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafA_Sub](
	[id] [int] NOT NULL,
	[cod] [int] NULL,
	[nam] [nvarchar](50) NULL,
	[fon] [bit] NULL,
	[tax] [nvarchar](9) NULL,
	[dat_open] [date] NULL,
	[dat_last] [date] NULL,
	[codAcountKin] [tinyint] NULL,
	[codSubKin] [tinyint] NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_TafA_Sub] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafA_Level](
	[id] [int] NOT NULL,
	[cod] [nvarchar](7) NULL,
	[nam] [nvarchar](50) NULL,
	[cod_cach] [nvarchar](1) NULL,
	[acount_kin] [nvarchar](1) NULL,
	[acount_level] [nvarchar](1) NULL,
	[balance] [decimal](18, 3) NULL,
 CONSTRAINT [PK_Taf_Acount] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Trn_Heder](
	[id] [int] NOT NULL,
	[yymm] [nvarchar](6) NOT NULL,
	[num_docom] [nvarchar](10) NOT NULL,
	[cod_doc] [nvarchar](2) NOT NULL,
	[dat_docom] [date] NOT NULL,
	[not_doc] [varchar](50) NOT NULL,
	[num_docom1] [nvarchar](10) NULL,
	[cod_doc1] [nvarchar](2) NULL,
	[dat_docom1] [date] NULL,
	[dat_now] [date] NULL,
	[post] [nvarchar](1) NULL,
	[conter_trn] [int] NULL,
 CONSTRAINT [PK_Taf_Heder] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[num_docom] ASC,
	[yymm] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Kin_mov](
	[cod] [nvarchar](2) NOT NULL,
	[nam] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Ta_Kin_Other_Duc] PRIMARY KEY CLUSTERED 
(
	[cod] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_CurrencyKin](
	[cod] [nvarchar](1) NULL,
	[nam] [nvarchar](10) NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Currency](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](2) NULL,
	[nam] [nvarchar](15) NULL,
	[val] [nchar](10) NULL,
 CONSTRAINT [PK_Taf_Currency] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Cost](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](10) NULL,
	[mang] [nvarchar](30) NULL,
 CONSTRAINT [PK_Taf_Cost] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Castmer](
	[id_cast] [int] NOT NULL,
	[cod_cast] [int] NOT NULL,
	[nam] [nvarchar](50) NULL,
	[fon] [nvarchar](20) NULL,
	[addres] [nvarchar](50) NULL,
	[tax] [nvarchar](20) NULL,
	[dat_open] [date] NULL,
	[dat_last] [date] NULL,
 CONSTRAINT [PK_Ta_Castmer] PRIMARY KEY CLUSTERED 
(
	[id_cast] ASC,
	[cod_cast] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Trn_Body](
	[id_add_tran] [int] NOT NULL,
	[id_add_heder] [int] NOT NULL,
	[num_ducom] [nvarchar](10) NULL,
	[conter] [int] NULL,
	[acont] [nvarchar](10) NULL,
	[acont_0] [int] NULL,
	[cost] [nchar](10) NULL,
	[debat] [decimal](13, 3) NULL,
	[cridet] [decimal](13, 3) NULL,
	[post] [tinyint] NULL,
	[debat_0] [decimal](12, 3) NULL,
	[cridet_0] [decimal](12, 3) NULL,
	[exchinch] [nvarchar](2) NULL,
	[kin_douc_stoc] [nvarchar](2) NULL,
	[num_douc_stoc] [nvarchar](10) NULL,
	[cod_stoc] [nvarchar](3) NULL,
 CONSTRAINT [PK_Ta_Tran] PRIMARY KEY CLUSTERED 
(
	[id_add_tran] ASC,
	[id_add_heder] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Taf_Suplier](
	[id_sup] [int] NOT NULL,
	[cod_sup] [nvarchar](7) NOT NULL,
	[nam] [nvarchar](50) NULL,
	[fon_sup] [nvarchar](20) NULL,
	[addres] [nvarchar](50) NULL,
	[tax_sup] [nvarchar](20) NULL,
	[dat_open] [date] NULL,
	[dat_last] [date] NULL,
	[id_taxout] [int] NULL,
 CONSTRAINT [PK_Ta_Suplier] PRIMARY KEY CLUSTERED 
(
	[id_sup] ASC,
	[cod_sup] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TafX_OutName](
	[id] [int] NOT NULL,
	[Unique_Tax_ID] [nvarchar](9) NULL,
	[File_Number] [nvarchar](16) NULL,
	[Tax_Payer_Name] [nvarchar](50) NULL,
	[Tax_Payer_Address] [nvarchar](50) NULL,
	[District_Code] [nvarchar](3) NULL,
	[personId] [nvarchar](14) NULL,
 CONSTRAINT [PK_TafX_OutName] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Tab_BuyName](
	[id] [tinyint] NOT NULL,
	[nam] [nvarchar](30) NULL,
	[code] [int] NULL,
	[NUmJops] [nvarchar](13) NULL,
	[cruncey] [decimal](7, 2) NULL,
	[kinBuyMane] [tinyint] NULL,
 CONSTRAINT [PK_Tab_BayName] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Tab_BuyKinMan](
	[id] [tinyint] NOT NULL,
	[nam] [nvarchar](15) NULL,
 CONSTRAINT [PK_Tab_BayKinMan] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Ta_UserHilp](
	[id] [int] NOT NULL,
	[num] [nchar](10) NULL,
	[adres] [nvarchar](50) NULL,
	[dascription] [nvarchar](1000) NULL,
	[nots] [nvarchar](300) NULL,
 CONSTRAINT [PK_Ta_UserHilp] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Ta_UserNam](
	[id] [int] NOT NULL,
	[nam] [nvarchar](100) NULL,
	[salerBasic] [decimal](10, 3) NULL,
	[user_nam] [nvarchar](20) NULL,
	[user_password] [nvarchar](20) NULL,
	[jopes] [nvarchar](30) NULL,
	[num_jop] [nvarchar](20) NULL,
	[dat] [date] NULL,
	[stoc_secerty] [bit] NULL,
	[us] [nvarchar](50) NULL,
	[st] [nvarchar](50) NULL,
	[co] [nvarchar](50) NULL,
	[jo] [nvarchar](50) NULL,
	[fi] [nvarchar](50) NULL,
	[ca] [nvarchar](50) NULL,
 CONSTRAINT [PK_Ta_usernam] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [userPremion].[Ta_section](
	[id] [smallint] NULL,
	[num] [int] NULL,
	[nam] [nvarchar](50) NULL,
	[mine] [smallint] NULL,
	[levl] [tinyint] NULL,
	[descr] [varchar](50) NULL,
	[formId] [smallint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [userP].[Ta_section](
	[id] [smallint] NULL,
	[num] [int] NULL,
	[nam] [nvarchar](50) NULL,
	[mine] [smallint] NULL,
	[levl] [tinyint] NULL,
	[descr] [varchar](50) NULL,
	[formId] [smallint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [userPremion].[Ta_secion](
	[cod] [varchar](10) NULL,
	[nam] [nvarchar](50) NULL,
	[codForm] [tinyint] NULL,
	[b1] [varchar](10) NULL,
	[b2] [varchar](10) NULL,
	[sortinrg] [tinyint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [userP].[Ta_permtion](
	[id] [smallint] NULL,
	[idForm] [smallint] NULL,
	[idSection] [smallint] NULL
) ON [PRIMARY]
GO

CREATE TABLE [Jop].[Ta_OutWork](
	[id] [int] NOT NULL,
	[id_kin_dou] [nvarchar](2) NOT NULL,
	[num] [int] NOT NULL,
	[num_jop] [int] NULL,
	[cost] [decimal](10, 2) NULL,
	[bay] [decimal](10, 2) NULL,
	[dat] [date] NULL,
	[used_jop] [tinyint] NULL,
	[nots] [nvarchar](500) NULL,
	[id_user] [tinyint] NULL,
	[used_fan] [tinyint] NULL,
	[use_tes] [tinyint] NULL,
	[manul_item] [tinyint] NULL,
 CONSTRAINT [PK_Ta_OutWork] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[num] ASC,
	[id_kin_dou] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [Jop].[Ta_KinDoc](
	[id] [tinyint] NOT NULL,
	[cod] [nvarchar](2) NULL,
	[nam] [nvarchar](20) NULL,
 CONSTRAINT [PK_Taj_Kin] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [Jop].[Ta_JopMov](
	[id] [int] NOT NULL,
	[num] [int] NOT NULL,
	[num_account] [int] NULL,
	[dat_open] [date] NULL,
	[shacea] [nvarchar](20) NULL,
	[mator] [nvarchar](20) NULL,
	[num_car] [nvarchar](10) NULL,
	[tayp_car] [nvarchar](20) NULL,
	[note] [nvarchar](500) NULL,
	[kilometr] [int] NULL,
	[dat_last] [date] NULL,
	[used] [tinyint] NULL,
	[id_user] [tinyint] NULL,
	[ManulPrecinty] [decimal](14, 5) NULL,
 CONSTRAINT [PK_Ta_JopMov] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[num] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [Jop].[Ta_invoice](
	[id] [int] NOT NULL,
	[num_jop] [int] NULL,
	[dat] [date] NULL,
	[num] [int] NOT NULL,
	[inv_not] [nvarchar](500) NULL,
	[gas] [decimal](15, 4) NULL,
	[trnd] [decimal](15, 4) NULL,
	[taxTrnd] [decimal](15, 4) NULL,
	[manul] [decimal](15, 4) NULL,
	[out_mnul] [decimal](15, 4) NULL,
	[tax_manul] [decimal](15, 4) NULL,
	[tax_out_manul] [decimal](15, 4) NULL,
	[val_itm] [decimal](15, 4) NULL,
	[tax_val_itm] [decimal](15, 4) NULL,
	[total] [decimal](15, 4) NULL,
	[dat_now] [date] NULL,
	[id_user] [tinyint] NULL,
	[del] [tinyint] NULL,
	[guranty0] [date] NULL,
	[guranty1] [date] NULL,
	[gurantyPeriodDay] [int] NULL,
	[gurantyKilomitter] [int] NULL,
 CONSTRAINT [PK_Ta_invoice] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[num] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [Finan].[Ta_accountMine](
	[id] [int] NOT NULL,
	[cod] [nvarchar](7) NULL,
	[nam] [nvarchar](50) NULL,
	[acount_kin] [nvarchar](1) NULL,
	[balance] [decimal](18, 3) NULL,
	[levacon1] [nvarchar](1) NULL,
	[levacon2] [nvarchar](2) NULL,
	[levacon3] [nvarchar](3) NULL,
	[levacon4] [nvarchar](4) NULL,
	[levacon5] [nvarchar](5) NULL,
	[levacon6] [nvarchar](6) NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_Ta_accountMine] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [Finan].[Ta_accountKin](
	[cod] [nvarchar](1) NULL,
	[nam] [nvarchar](10) NULL
) ON [PRIMARY]
GO

CREATE TABLE [Finan].[Ta_accountBranch](
	[id] [int] NOT NULL,
	[cod] [int] NOT NULL,
	[nam] [nvarchar](50) NULL,
	[fon] [nvarchar](20) NULL,
	[addres] [nvarchar](50) NULL,
	[taxNum] [nvarchar](9) NULL,
	[dat_open] [char](10) NULL,
	[dat_last] [char](10) NULL,
	[num] [int] NULL,
	[id_user] [tinyint] NULL,
 CONSTRAINT [PK_Tafa_branich] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
