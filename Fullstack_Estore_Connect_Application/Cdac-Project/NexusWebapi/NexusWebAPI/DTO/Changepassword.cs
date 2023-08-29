using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexusWebAPI.DTO
{
    public class Changepassword
    {
        public string oldpass { get; set; }
        public string newpass { get; set; }
    }
}