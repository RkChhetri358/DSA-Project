using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class Employee
    {
        public string Fullname { get; set; }
        public string Dateofbirth { get; set; } 
        public string Contactnumber { get; set; }
        public string EmailID { get; set; }
        public string State { get; set; }
        public string City { get; set; }
       
        public string FullAddress { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }
       

    }
}