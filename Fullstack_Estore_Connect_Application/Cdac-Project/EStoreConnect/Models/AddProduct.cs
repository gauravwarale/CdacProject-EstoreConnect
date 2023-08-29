using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EStoreConnect.Models
{
    public class AddProduct
    {
        public string pname { get; set; }
        public string pmanufacture { get; set; }
        public double pweight_ {get; set; }
        public decimal p_price_before { get; set; }

        public decimal p_price_after { get; set; }
       
        public string pimage { get; set; }
        public string Productcategory { get; set; }
        public string ProductSubCategory { get; set; }

    }
}