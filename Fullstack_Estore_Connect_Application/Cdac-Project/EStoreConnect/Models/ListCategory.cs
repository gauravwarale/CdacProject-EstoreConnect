using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EStoreConnect.Models
{
    public class ListCategory
    {
        public List<ProductCategory> pCategories { get; set; }
        public List<ProductSubcategory> pSubcategories { get; set; }
    }
}