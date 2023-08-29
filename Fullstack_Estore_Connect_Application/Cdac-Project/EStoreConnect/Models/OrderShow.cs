using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EStoreConnect.Models
{
    public class OrderShow
    {
        public List<Order> orders { get; set; }
        public List<Shop> shop { get; set; }
    }
}