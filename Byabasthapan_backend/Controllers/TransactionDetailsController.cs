using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;

using System.Configuration;
using backend.Models;
using System.Web.UI.WebControls;
using Microsoft.Ajax.Utilities;

namespace backend.Controllers
{

    [RoutePrefix("api/ViewPurchase")]
    public class TransactionDetailsController : ApiController
    {
       
       
   

        [HttpGet]   //for retriving the data
        [Route("Purchase_Details")]


        public Response viewNewRecordsList(Newdata newdata)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            DAL_Records dal = new DAL_Records();
            Response response = dal.viewNewRecordsList(newdata, conn);
            return response;
        }


        [HttpPost]
        [Route("viewRecords")]

        public Response newdatalist(Newdata newdata)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            DAL_Records dal = new DAL_Records();
            Response response = new Response();
            response = dal.viewNewRecordsList(newdata,conn);
            return response;

        }

        //insert sales


        [HttpPost]
        [Route("view_total_sales")]

        public Response view_Total_Sales(Newdata newdata)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            DAL_Records dal = new DAL_Records();
            Response response = new Response();
            response = dal.viewTotal_Sales(newdata, conn);
            return response;

        }


        //view remaining items


        [HttpPost]
        [Route("view_Available_Items")]
        public Response view_Available_Items(Newdata newdata)
        {
            Response response = new Response();

            // 🚨 Null check for newdata
            if (newdata == null)
            {
                response.StatusCode = 400;
                response.StatusMessage = "Invalid request: newdata is null!";
                return response;
            }

            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            DAL_Records dal = new DAL_Records();

            // Check stock before allowing the sale
            int availableStock = dal.GetAvailableStock(newdata.Product_Name, conn);
            if (availableStock < newdata.Quantity)
            {
                response.StatusCode = 400;
                response.StatusMessage = "Insufficient stock available!";
                return response;
            }

            response = dal.view_Available_Items(newdata, conn);
            return response;
        }




        [HttpPost]
        [Route("Insert_Items")]
        public Response Insert_Items(Newdata insertNew)
        {
            Response response = new Response();
            DAL_Records dal=new DAL_Records();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            response = dal.Insert_Items(insertNew, conn);
            return response;

         

        } 
        
        [HttpPost]
        [Route("Update_Items")]
        public Response Update_Items(Newdata insertNew)
        {
            Response response = new Response();
            DAL_Records dal=new DAL_Records();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            response = dal.Update_Items(insertNew, conn);
            return response;

         

        }

        
        [HttpPost]
        [Route("Total_Sales")]
        public Response total_Sales(Newdata total_Sales)
        {
            Response response = new Response();
            DAL_Records dal=new DAL_Records();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            response = dal.Total_sales(total_Sales, conn);
            return response;

         

        }


    }





}