using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
namespace backend.Models
{

    public class DAL_Records
    {

        SqlDataAdapter da = null;
        //insert new records
        public Response Insert_Items(Newdata insertNew,SqlConnection conn)
        {

            string message = string.Empty;
            try
            {
                Response response = new Response();
                SqlCommand cmd = new SqlCommand("usp_insert_newdata", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Date", insertNew.Date);
                cmd.Parameters.AddWithValue("@Product_Name", insertNew.Product_Name);
                cmd.Parameters.AddWithValue("@Cost_Price", insertNew.Cost_price);
                cmd.Parameters.AddWithValue("@Quantity", insertNew.Quantity);
                cmd.Parameters.AddWithValue("@Profit_Percent", insertNew.Profit_Percent);
             

                cmd.Parameters.AddWithValue("@Vat_Percent", insertNew.Vat_Percent);
                cmd.Parameters.AddWithValue("@Vat", insertNew.Vat);
                cmd.Parameters.AddWithValue("@Marked_Price", insertNew.Marked_Price);
                cmd.Parameters.AddWithValue("@ManufactureDate", insertNew.ManufactureDate);
                cmd.Parameters.AddWithValue("@ExpireDate", insertNew.ExpireDate);


                cmd.Parameters.AddWithValue("@Total", insertNew.Total);

                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "data inserted";


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = " Failed to insert data";
                }
                return response;

            }
            catch (Exception ex)
            {
                throw ex;

            }
            


        }


        //view record list of purchase
        public Response viewNewRecordsList(Newdata newdata_s, SqlConnection conn)
        {
            try
            {
                Response response = new Response();
                List<Newdata> listnewdata = new List<Newdata>();
                SqlDataAdapter da = new SqlDataAdapter("usp_view_purchase", conn);

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
                        newdata.Cost_price = Convert.ToInt64(dt.Rows[i]["Cost_price"]);
                        newdata.Quantity = Convert.ToInt64(dt.Rows[i]["Quantity"]);
                        newdata.Profit_Percent = Convert.ToInt64(dt.Rows[i]["Profit_Percent"]);
                     
                       
                        newdata.Vat_Percent = Convert.ToInt64(dt.Rows[i]["Vat_Percent"]);
                        newdata.Vat = Convert.ToInt64(dt.Rows[i]["Vat"]);
                        newdata.Marked_Price = Convert.ToInt64(dt.Rows[i]["Marked_Price"]);
                        newdata.ManufactureDate = Convert.ToString(dt.Rows[i]["ManufactureDate"]);
                        newdata.ExpireDate = Convert.ToString(dt.Rows[i]["ExpireDate"]);
                        newdata.Total = Convert.ToInt64(dt.Rows[i]["Total"]);
                        listnewdata.Add(newdata);
                    }

                    if (listnewdata.Count > 0)
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "Data details fetched";
                        response.listNewdata = listnewdata; //first listNewdata one from response class and second one is  object
                    }
                    else
                    {
                        response.StatusCode = 100;
                        response.StatusMessage = "Data is unavailable";
                        response.listEmployee = null;

                    }
                }

                return response;


            }
            catch (Exception ex)
            {
                throw ex;
            }

        }





        //view recorrd list of total sales
        public Response viewTotal_Sales(Newdata newdata_s, SqlConnection conn)
        {
            try
            {
                Response response = new Response();
                List<Newdata> listnewdata = new List<Newdata>();
                SqlDataAdapter da = new SqlDataAdapter("usp_View_Total_sales", conn);

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
                        newdata.Selling_price = Convert.ToInt64(dt.Rows[i]["Selling_Price"]);
                        newdata.Discount_Percent = Convert.ToInt64(dt.Rows[i]["Discount_Percent"]);
                        newdata.Vat_Percent = Convert.ToInt64(dt.Rows[i]["Vat_Percent"]);
                        newdata.Profit= Convert.ToInt64(dt.Rows[i]["Profit"]);
                        newdata.Total_Profit= Convert.ToInt64(dt.Rows[i]["Total_Profit"]);
                        listnewdata.Add(newdata);
                    }

                    if (listnewdata.Count > 0)
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "data details fetched";
                        response.listNewdata = listnewdata; //first listNewdata one from response class and second one is  object
                    }
                    else
                    {
                        response.StatusCode = 100;
                        response.StatusMessage = "data is unavailable";
                        response.listEmployee = null;

                    }
                }

                return response;


            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        //view register data
        public Response register_data(Newdata ReviewData, SqlConnection conn)
        {
            try
            {
                Response response = new Response();
                da = new SqlDataAdapter("usp_view_purchase", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;

                da.SelectCommand.Parameters.AddWithValue("@Date", ReviewData.Date);
                da.SelectCommand.Parameters.AddWithValue("@Product_Name", ReviewData.Product_Name);
                da.SelectCommand.Parameters.AddWithValue("@Cost_Price", ReviewData.Cost_price);
                da.SelectCommand.Parameters.AddWithValue("@Quantity", ReviewData.Quantity);
                da.SelectCommand.Parameters.AddWithValue("@Profit_Percent", ReviewData.Profit_Percent);
               
                da.SelectCommand.Parameters.AddWithValue("@Vat_Percent", ReviewData.Vat_Percent);
                da.SelectCommand.Parameters.AddWithValue("@Vat", ReviewData.Vat);
                da.SelectCommand.Parameters.AddWithValue("@Marked_Price", ReviewData.Marked_Price);
                da.SelectCommand.Parameters.AddWithValue("@ManufactureDate", ReviewData.ManufactureDate);
                da.SelectCommand.Parameters.AddWithValue("@ExpireDatee", ReviewData.ExpireDate);
                da.SelectCommand.Parameters.AddWithValue("@Total", ReviewData.Total);
                DataTable dt = new DataTable();
                da.Fill(dt);
               

                if (dt.Rows.Count > 0)
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





        public Response Update_Items(Newdata insertNew, SqlConnection conn)
        {
            try
            {
                Response response = new Response();
                SqlCommand cmd = new SqlCommand("usp_total_sales", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Date", insertNew.Date);
                cmd.Parameters.AddWithValue("@Product_Name", insertNew.Product_Name);
                cmd.Parameters.AddWithValue("@Marked_Price", insertNew.Marked_Price);
                cmd.Parameters.AddWithValue("@Quantity", insertNew.Quantity);
                cmd.Parameters.AddWithValue("@Selling_Price", insertNew.Selling_price);
                cmd.Parameters.AddWithValue("@Discount_Percent", insertNew.Discount_Percent);
                cmd.Parameters.AddWithValue("@Vat_Percent", insertNew.Vat_Percent);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Data Updated";


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = " Failed to Update data";
                }
                return response;

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        //Transactions...
        public Response Total_sales(Newdata insertNew, SqlConnection conn)
        {

             try
            {
                Response response = new Response();
                SqlCommand cmd = new SqlCommand("usp_total_sales", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Date", insertNew.Date);
                cmd.Parameters.AddWithValue("@Product_Name", insertNew.Product_Name);
                cmd.Parameters.AddWithValue("@Marked_Price", insertNew.Marked_Price);
                cmd.Parameters.AddWithValue("@Quantity", insertNew.Quantity);
                cmd.Parameters.AddWithValue("@Selling_Price", insertNew.Selling_price);
                cmd.Parameters.AddWithValue("@Discount_Percent", insertNew.Discount_Percent);
                cmd.Parameters.AddWithValue("@Vat_Percent", insertNew.Vat_Percent);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "data inserted";


                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = " Failed to insert data";
                }
                return response;

            }
            catch (Exception ex)
            {
                throw ex;

            }



        }


        public int GetAvailableStock(string productName, SqlConnection conn)
        {
            SqlCommand cmd = new SqlCommand("SELECT Quantity FROM Available_Items WHERE Product_Name = @Product_Name", conn);
            cmd.Parameters.AddWithValue("@Product_Name", productName);

            conn.Open();
            object result = cmd.ExecuteScalar();
            conn.Close();

            return result != null ? Convert.ToInt32(result) : 0;
        }


        // view remaining items
       
        public Response view_Available_Items(Newdata newdata_s, SqlConnection conn)
        {
            try
            {
                Response response = new Response();
                List<Newdata> listnewdata = new List<Newdata>();
                SqlDataAdapter da = new SqlDataAdapter("usp_View_Available_items", conn);

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
                        newdata.Cost_price = Convert.ToInt64(dt.Rows[i]["Cost_price"]);
                        newdata.Quantity = Convert.ToInt64(dt.Rows[i]["Quantity"]);
                        newdata.Profit_Percent = Convert.ToInt64(dt.Rows[i]["Profit_Percent"]);


                        newdata.Vat_Percent = Convert.ToInt64(dt.Rows[i]["Vat_Percent"]);
                        newdata.Vat = Convert.ToInt64(dt.Rows[i]["Vat"]);
                        newdata.Marked_Price = Convert.ToInt64(dt.Rows[i]["Marked_Price"]);
                        newdata.ManufactureDate = Convert.ToString(dt.Rows[i]["ManufactureDate"]);
                        newdata.ExpireDate = Convert.ToString(dt.Rows[i]["ExpireDate"]);
                        newdata.Total = Convert.ToInt64(dt.Rows[i]["Total"]);
                        listnewdata.Add(newdata);
                    }

                    if (listnewdata.Count > 0)
                    {
                        response.StatusCode = 200;
                        response.StatusMessage = "data details fetched";
                        response.listNewdata = listnewdata; //first listNewdata one from response class and second one is  object
                    }
                    else
                    {
                        response.StatusCode = 100;
                        response.StatusMessage = "data is unavailable";
                        response.listEmployee = null;

                    }
                }

                return response;


            }
            catch (Exception ex)
            {
                throw ex;
            }

        }




        /*   public Response available_Items(Newdata newdata,SqlConnection conn)
            {
                try
                {
                    Response response = new Response();
                    List<Newdata> listnewdata = new List<Newdata>();
                    SqlDataAdapter da=new SqlDataAdapter("usp_available_Items",conn);

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
                            response.StatusMessage = "data details fetched";
                            response.listNewdata = listnewdata; //first listNewdata one from response class and second one is  object
                        }
                        else
                        {
                            response.StatusCode = 100;
                            response.StatusMessage = "data is unavailable";
                            response.listEmployee = null;

                        }
                    }




                    return response;


                }
                catch (Exception ex)
                {

                    throw ex;
                }


            }
         */
    }

}