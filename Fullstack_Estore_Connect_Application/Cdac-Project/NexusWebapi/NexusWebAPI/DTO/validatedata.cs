using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexusWebAPI.DTO
{
    public class validatedata
    {
        public int ID { get; set; }
        public int CartID { get; set; }

        public string usertype { get; set; }

        public string email { get; set; }
    }
}