using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
namespace backend.Models
{
    public class DAL
    {
        private object command;

        public Response register(Employee employee, SqlConnection conn)
        {

            try
            {
                Response response = new Response();
                SqlCommand cmd = new SqlCommand("usp_Registration", conn);
                cmd.CommandType = CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("@Fullname", employee.Fullname);
                cmd.Parameters.AddWithValue("@Dateofbirth", employee.Dateofbirth);
                cmd.Parameters.AddWithValue("@Contactnumber", employee.Contactnumber);
                cmd.Parameters.AddWithValue("@EmailID", employee.EmailID);
                cmd.Parameters.AddWithValue("@State", employee.State);

                cmd.Parameters.AddWithValue("@City", employee.City);
                cmd.Parameters.AddWithValue("@FullAddress", employee.Fullname);
                cmd.Parameters.AddWithValue("@UserID", employee.UserID);
                cmd.Parameters.AddWithValue("@Password", employee.Password);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "User registered successfully";


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "User registration failed";

                }

                return response;

            }
            catch (Exception ex)
            {
                throw ex;

            }


        }
        public Response login(Employee employee, SqlConnection conn)
        {
            SqlDataAdapter da = new SqlDataAdapter("usp_UserLogin", conn);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", employee.UserID);
            da.SelectCommand.Parameters.AddWithValue("@Password", employee.Password);
            DataTable dt = new DataTable();
            da.Fill(dt);
            
            Response response = new Response();
            Employee employees = new Employee();
            if (dt.Rows.Count > 0)
            {
               // employees.Fullname = Convert.ToString(dt.Rows[0]["Fullname"]);
                //employees.EmailID = Convert.ToString(dt.Rows[0]["EmailID"]);
               // employees.Contactnumber = Convert.ToString(dt.Rows[0]["Contactnumber"]);
               // employees.City = Convert.ToString(dt.Rows[0]["City"]);

                response.StatusCode = 200;
                response.StatusMessage = "User is valid";
                response.employee = employee;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User is invalid";
                response.employee = null;
            }
            return response;

        }



        public Response Adminlogin(Employee employee, SqlConnection conn)
        {
            SqlDataAdapter da = new SqlDataAdapter("usp_UserLogin", conn);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", employee.UserID);
            da.SelectCommand.Parameters.AddWithValue("@Password", employee.Password);
            DataTable dt = new DataTable();
            da.Fill(dt);

            Response response = new Response();
            Employee employees = new Employee();
            if (dt.Rows.Count > 0)
            {
                // employees.Fullname = Convert.ToString(dt.Rows[0]["Fullname"]);
                //employees.EmailID = Convert.ToString(dt.Rows[0]["EmailID"]);
                // employees.Contactnumber = Convert.ToString(dt.Rows[0]["Contactnumber"]);
                // employees.City = Convert.ToString(dt.Rows[0]["City"]);

                response.StatusCode = 200;
                response.StatusMessage = "User is valid";
                response.employee = employee;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User is invalid";
                response.employee = null;
            }
            return response;

        }
        public Response viewEmployee(Employee employee, SqlConnection conn)
        {
            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@UserID", employee.UserID);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();
            Employee employees = new Employee();
            if (dt.Rows.Count > 0)
            {
                employees.Fullname = Convert.ToString(dt.Rows[0]["Fullname"]);
                employees.Dateofbirth = Convert.ToString(dt.Rows[0]["Dateofbirth"]);
                employees.Contactnumber = Convert.ToString(dt.Rows[0]["Contactnumber"]);
                employees.EmailID = Convert.ToString(dt.Rows[0]["EmailID"]);
                employees.City = Convert.ToString(dt.Rows[0]["City"]);
                employees.State = Convert.ToString(dt.Rows[0]["State"]);
                employees.UserID = Convert.ToString(dt.Rows[0]["UserID"]);


                response.StatusCode = 200;
                response.StatusMessage = "User exist";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User doesnot exit";
                response.employee = employee;
            }
            return response;

        }

        public Response viewEmployeeList(SqlConnection conn)
        {
            Response response = new Response();
            List<Employee> listEmployees = new List<Employee>();
            
            SqlDataAdapter da=new SqlDataAdapter("usp_ViewEmployes", conn);
       
            da.SelectCommand.CommandType= CommandType.StoredProcedure;
      
            DataTable dt = new DataTable();
            da.Fill(dt);

            if(dt.Rows.Count > 0)
            {
                for(int i=0; i < dt.Rows.Count;i++)
                {
                    Employee employees = new Employee();
                    employees.Fullname = Convert.ToString(dt.Rows[i]["Fullname"]);
                    employees.EmailID = Convert.ToString(dt.Rows[i]["EmailID"]);
                    employees.Contactnumber = Convert.ToString(dt.Rows[i]["Contactnumber"]);
                    employees.City = Convert.ToString(dt.Rows[i]["City"]);
                    employees.UserID = Convert.ToString(dt.Rows[i]["UserID"]);
                    listEmployees.Add(employees);
                }

                if(listEmployees.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "User details fetched";
                    response.listEmployee = listEmployees;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "User is unavailable";
                    response.listEmployee = null;

                }
            }
            return response;

        }

        public Response viewNewRecordsList(SqlConnection conn)
        {
            try
            {
                Response response = new Response();
                List<Newdata> listnewdata = new List<Newdata>();
                SqlDataAdapter da = new SqlDataAdapter("usp_ViewNewRecords", conn);

                da.SelectCommand.CommandType = CommandType.StoredProcedure;

                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Newdata newdata = new Newdata();
                        newdata.Date = Convert.ToString(dt.Rows[i]["Date"]);
                        newdata.Product_Name = Convert.ToString(dt.Rows[i]["Product_Name"]);
                        newdata.Marked_Price = Convert.ToInt64(dt.Rows[i]["Marked_Price"]);
                        newdata.Quantity = Convert.ToInt64(dt.Rows[i]["Quantity"]);
                       
                       
                        newdata.Vat_Percent = Convert.ToInt64(dt.Rows[i]["Vat_Percent"]);
                        newdata.Vat = Convert.ToInt64(dt.Rows[i]["Vat"]);
                        newdata.Total = Convert.ToInt64(dt.Rows[i]["Total"]);
                        listnewdata.Add(newdata);
                    }

                    if (listnewdata.Count > 0)
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "User details fetched";
                        response.listNewdata = listnewdata; //first listNewdata one from response class and second one is  object
                    }
                    else
                    {
                        response.StatusCode = 100;
                        response.StatusMessage = "User is unavailable";
                        response.listEmployee = null;

                    }
                }

                return response;


            }
            catch(Exception ex)
            {
                throw ex;
            }
            
        }
           


    }
}