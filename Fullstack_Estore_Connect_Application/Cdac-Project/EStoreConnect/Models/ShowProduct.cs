using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EStoreConnect.Models
{
    public class ShowProduct
    {
        public List<Product> plist { get; set; }

        public ListCategory categories { get; set; }
    }
}