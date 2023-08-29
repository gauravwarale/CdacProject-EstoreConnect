using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EStoreConnect.Models
{
    public class Credential
    {
        [EmailAddress]
        public string Username { get; set; }
       [Required] public string Password { get; set; }
    }
}