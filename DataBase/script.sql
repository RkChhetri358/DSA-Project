USE [master]
GO
/****** Object:  Database [Byabasthapan]    Script Date: 2/11/2025 7:44:08 PM ******/
CREATE DATABASE [Byabasthapan]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Byabasthapan', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Byabasthapan.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Byabasthapan_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Byabasthapan_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Byabasthapan] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Byabasthapan].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Byabasthapan] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Byabasthapan] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Byabasthapan] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Byabasthapan] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Byabasthapan] SET ARITHABORT OFF 
GO
ALTER DATABASE [Byabasthapan] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Byabasthapan] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Byabasthapan] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Byabasthapan] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Byabasthapan] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Byabasthapan] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Byabasthapan] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Byabasthapan] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Byabasthapan] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Byabasthapan] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Byabasthapan] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Byabasthapan] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Byabasthapan] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Byabasthapan] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Byabasthapan] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Byabasthapan] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Byabasthapan] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Byabasthapan] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Byabasthapan] SET  MULTI_USER 
GO
ALTER DATABASE [Byabasthapan] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Byabasthapan] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Byabasthapan] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Byabasthapan] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Byabasthapan] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Byabasthapan] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Byabasthapan] SET QUERY_STORE = ON
GO
ALTER DATABASE [Byabasthapan] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Byabasthapan]
GO
/****** Object:  Table [dbo].[AdminLogin]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdminLogin](
	[Email] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Available_Items]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Available_Items](
	[Date] [nvarchar](50) NULL,
	[Product_Name] [nvarchar](50) NULL,
	[Cost_Price] [float] NULL,
	[Quantity] [int] NULL,
	[Profit_Percent] [float] NULL,
	[Vat_Percent] [float] NULL,
	[Vat] [float] NULL,
	[Marked_Price] [float] NULL,
	[ManufactureDate] [nvarchar](50) NULL,
	[ExpireDate] [nvarchar](50) NULL,
	[Total] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Insert_Item]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Insert_Item](
	[Date] [nvarchar](50) NULL,
	[Product_Name] [nvarchar](50) NULL,
	[Cost_Price] [float] NULL,
	[Quantity] [int] NULL,
	[Profit_Percent] [float] NULL,
	[Vat_Percent] [float] NULL,
	[Vat] [float] NULL,
	[Marked_Price] [float] NULL,
	[ManufactureDate] [nvarchar](50) NULL,
	[ExpireDate] [nvarchar](50) NULL,
	[Total] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Total_Sales]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Total_Sales](
	[Date] [nvarchar](50) NULL,
	[Product_Name] [nvarchar](50) NULL,
	[Marked_Price] [float] NULL,
	[Quantity] [int] NULL,
	[Selling_Price] [float] NULL,
	[Discount_Percent] [float] NULL,
	[Vat_Percent] [float] NULL,
	[Profit] [float] NULL,
	[Total_Profit] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogin]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLogin](
	[Email] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[usp_AdminLogin]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Exec usp_Registration 'Rachit','2061/03/16',9864556684,'rachitkhadka09@gmail.com','Nepal','Bhairahawa','Bhairahawa Rupandehi','abc','123'


--SELECT * FROM Registration WHERE UserID='rachit@gmail.com' AND Password='123'
CREATE PROCEDURE [dbo].[usp_AdminLogin]
(
@Email  nvarchar(50),
@Password  nvarchar(50)
)
AS
BEGIN
	
	SELECT * FROM AdminLogin WHERE Email=@Email AND Password=@Password 

END
GO
/****** Object:  StoredProcedure [dbo].[usp_available_Items]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_available_Items]
AS
BEGIN 
SELECT * FROM [Available_Items]
END
GO
/****** Object:  StoredProcedure [dbo].[usp_insert_newdata]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_insert_newdata]
(
    @Date nvarchar(50),
    @Product_Name nvarchar(50),
    @Cost_Price float,
    @Quantity int,
    @Profit_Percent float,
    @Vat_Percent float,
    @Vat float,
    @Marked_Price float,
    @ManufactureDate nvarchar(50),
    @ExpireDate nvarchar(50),
    @Total float
)
AS
BEGIN
    SET NOCOUNT ON;  -- Prevents extra messages from being returned

    -- Check if the product already exists
    IF EXISTS (
        SELECT 1 
        FROM [Available_Items] 
        WHERE Product_Name = @Product_Name 
          AND ManufactureDate = @ManufactureDate 
          AND ExpireDate = @ExpireDate
    )
    BEGIN
        -- If exists, update the existing record
        UPDATE [Available_Items]
        SET 
            Date = @Date, 
            Quantity = Quantity + @Quantity,
            Vat_Percent = @Vat_Percent,
            Marked_Price = @Marked_Price,
            Cost_Price = @Cost_Price,
            Profit_Percent = @Profit_Percent,
            Vat = @Vat,
            Total = Total + @Total  -- Ensure total is updated properly
        WHERE Product_Name = @Product_Name 
          AND ManufactureDate = @ManufactureDate 
          AND ExpireDate = @ExpireDate;
    END
    ELSE
    BEGIN
        -- If not exists, insert a new record
        INSERT INTO [Available_Items] 
        VALUES (@Date, @Product_Name, @Cost_Price, @Quantity, @Profit_Percent, @Vat_Percent, @Vat, @Marked_Price, @ManufactureDate, @ExpireDate, @Total);
    END

    -- Insert into Insert_Item table (for logging or record-keeping)
    INSERT INTO [Insert_Item] 
    VALUES (@Date, @Product_Name, @Cost_Price, @Quantity, @Profit_Percent, @Vat_Percent, @Vat, @Marked_Price, @ManufactureDate, @ExpireDate, @Total);
END
GO
/****** Object:  StoredProcedure [dbo].[usp_total_sales]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_total_sales]
(
    @Date nvarchar(50),
    @Product_Name nvarchar(50),
    @Marked_Price float,
    @Quantity int,
    @Selling_Price float,
    @Discount_Percent float,
    @Vat_Percent float
)
AS
BEGIN
    DECLARE @AvailableQuantity INT, @CostPrice FLOAT, @Profit FLOAT, @Total_Profit FLOAT;

    -- Get the available quantity
    SELECT @AvailableQuantity = Quantity 
    FROM Available_Items 
    WHERE Product_Name = @Product_Name;

    -- If stock is insufficient, return an error
    IF @AvailableQuantity IS NULL OR @AvailableQuantity < @Quantity
    BEGIN
        PRINT 'Error: Not enough stock available';
        RETURN; -- Stop execution if not enough stock
    END

    -- Get the cost price
    SELECT TOP 1 @CostPrice = Cost_Price 
    FROM Insert_Item 
    WHERE Product_Name = @Product_Name
    ORDER BY Date DESC;

    -- Calculate profit
    IF @CostPrice IS NULL
    BEGIN
        SET @Profit = 0;
        SET @Total_Profit = 0;
    END
    ELSE
    BEGIN
        SET @Profit = ((@Selling_Price / @Quantity) - @CostPrice);
        SET @Total_Profit = ((@Selling_Price / @Quantity) - @CostPrice) * @Quantity;
    END

    -- Update stock quantity
    UPDATE Available_Items 
    SET Quantity = Quantity - @Quantity 
    WHERE Product_Name = @Product_Name;

    -- Insert into Total_Sales
    INSERT INTO [Total_Sales] (Date, Product_Name, Marked_Price, Quantity, Selling_Price, Discount_Percent, Vat_Percent, Profit, Total_Profit)
    VALUES (@Date, @Product_Name, @Marked_Price, @Quantity, @Selling_Price, @Discount_Percent, @Vat_Percent, @Profit, @Total_Profit);
    
    PRINT 'Data successfully inserted into Total_Sales';
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_UserLogin]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Exec usp_Registration 'Rachit','2061/03/16',9864556684,'rachitkhadka09@gmail.com','Nepal','Bhairahawa','Bhairahawa Rupandehi','abc','123'


--SELECT * FROM Registration WHERE UserID='rachit@gmail.com' AND Password='123'
CREATE PROCEDURE [dbo].[usp_UserLogin]
(
@Email  nvarchar(50),
@Password  nvarchar(50)
)
AS
BEGIN
	
	SELECT * FROM UserLogin WHERE Email=@Email AND Password=@Password 

END
GO
/****** Object:  StoredProcedure [dbo].[usp_View_Available_items]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_View_Available_items]
AS
BEGIN 
SELECT * FROM [Available_Items]
END
GO
/****** Object:  StoredProcedure [dbo].[usp_view_purchase]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_view_purchase]


AS
BEGIN
	SELECT * FROM [Insert_Item]
END

exec [dbo].[usp_view_purchase]
GO
/****** Object:  StoredProcedure [dbo].[usp_View_Total_sales]    Script Date: 2/11/2025 7:44:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_View_Total_sales]
AS
BEGIN 
SELECT * FROM [Total_Sales]
END
GO
USE [master]
GO
ALTER DATABASE [Byabasthapan] SET  READ_WRITE 
GO
