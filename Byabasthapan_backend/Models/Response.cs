using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;
using System.Web.UI;

namespace backend.Models
{
    public class Response
    {

        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public List<Employee>listEmployee { get; set; }
        public Employee employee { get; set; }
        public List<Newdata> listNewdata { get; set; } //return list of insert records
        public Newdata newdata { get; set; } //return single insert record

    }
}