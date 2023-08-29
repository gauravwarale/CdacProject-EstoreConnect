using NexusWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexusWebAPI.DTO
{
    public class CartItemProduct : Product
    {
        public Nullable<int> qty { get; set; }
    }
}