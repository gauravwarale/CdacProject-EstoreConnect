using NexusWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NexusWebAPI.DTO
{
    public class ShopProduct
    {
        public List<Product> product { get; set; }
        public List<ProductCategory> productcategory { get; set; }
        public List<ProductSubcategory> productsubcategory { get; set; }

    }
}