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

namespace backend.Controllers
{
    [RoutePrefix("api/Test")]
    public class UsersController : ApiController
    {
       

        [HttpPost]
        [Route("Registration_NewEmployee")]

        public Response resgister(Employee employee)
        {
            Response response= new Response();
            DAL dal = new DAL();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            response=dal.register(employee,conn); //class linked 
            return response;


        }

        [HttpPost]
        [Route("login")]
        public Response login(Employee employee)
        {
            DAL dal=new DAL();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            Response response=new Response();
            response=dal.login(employee,conn);
            return response;

        }

        [HttpPost]
        [Route("Adminlogin")]
        public Response Adminlogin(Employee employee)
        {
            DAL dal = new DAL();
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            Response response = new Response();
            response = dal.Adminlogin(employee, conn);
            return response;

        }

        [HttpPost]
        [Route("viewEmployee")]
        public Response viewEmployee(Employee employee)
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            DAL dal=new DAL();
            Response response = dal.viewEmployee(employee, conn);
            return response;
        }
        [HttpPost]
        [Route("viewEmployees")]
        public Response employeelist()
        {
            SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString);
            DAL dal=new DAL();
            Response response   =new Response();
            response = dal.viewEmployeeList(conn);
            return response;

        }

       


    }
}
