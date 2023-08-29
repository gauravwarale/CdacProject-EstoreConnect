
using NexusWebAPI.DTO;
using NexusWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NexusWebAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class ShopController : ApiController
    {
        // GET: api/Shop
        EstoreEntities db = new EstoreEntities();
       

        // GET: api/Shop/5
       

        // POST: api/Shop
        public List<Shop> Post([FromBody] User value)
        {
            List<User> userlist = db.Users
                .Where(p => p.pincode.Equals(value.pincode) && p.city.Equals(value.city) && p.usertype.Equals("USER"))
                .ToList();

            List<Shop> shp = db.Shops.ToList();
            List<Shop> sendshop = new List<Shop>();

            foreach (var item1 in userlist)
            {
                foreach (var item2 in shp)
                {
                    if (item1.Id == item2.Id) // Assuming this is the correct property to match users and shops
                    {
                        sendshop.Add(item2);
                    }
                }
            }
            return sendshop;
        }


        public ShopProduct Get(int id)
        {
            var distinctCategories = (
    from pc in db.ProductCategories
    where db.ProductDeteils.Any(pd =>
        pd.pcatId == pc.pcatId &&
        db.ProductShops.Any(ps =>
            pd.productId == ps.productId && ps.shopId == id
        )
    )
    select pc
).Distinct().ToList();


            var distinctsubCategories = (
   from pc in db.ProductSubcategories
   where db.ProductDeteils.Any(pd =>
       pd.psubcatId == pc.psubcatId &&
       db.ProductShops.Any(ps =>
           pd.productId == ps.productId && ps.shopId == id
       )
   )
   select pc
).Distinct().ToList();

            var product = from p in db.Products where db.ProductShops.Any(a => a.productId == p.Id) select p;
            ShopProduct sp = new ShopProduct();
            sp.productcategory=distinctCategories;
            sp.productsubcategory = distinctsubCategories;
            sp.product = product.ToList();

            return sp;
        }

 //       [Route("api/Getsubproduct/")]//return all product of selected Subcategory (ID)
 //       [HttpGet]
 //       public List<Product> GetproductbySubId(int id)
 //       {
 //           var productName = (
 //    from p in db.Products
 //    join ps in db.ProductShops on p.Id equals ps.productId
 //    join pd in db.ProductDeteils on ps.productId equals pd.productId
 //    where ps.shopId == 20 && pd.psubcatId == id
 //    select p
 //).ToList();

 //           return productName;
 //       }

        [Route("api/GetSubcat")]
        [HttpGet]
        public List<ProductSubcategory> GetSubcat()
        {
            var subcategories = (
      from ps in db.ProductSubcategories
      join pd in db.ProductDeteils on ps.psubcatId equals pd.psubcatId
      join pc in db.ProductCategories on pd.pcatId equals pc.pcatId
      select ps
  ).Distinct().ToList();


            return subcategories;
        }

        [Route("api/GetProd/{shopid}/{psubId}")]//get all product list from product SubcatID
        [HttpGet]
        public List<Product> GetProdBySubcat(int shopid,int psubId)
        {
            var productNames = (
    from p in db.Products
    join ps in db.ProductShops on p.Id equals ps.productId
    join pd in db.ProductDeteils on ps.productId equals pd.productId
    where ps.shopId == shopid && pd.psubcatId == psubId
    select p
).ToList();
            return productNames;
        }
        [Route("api/AllProduct")]
        [HttpGet]
        public List<Product> GetAllproduct()
        {
            return db.Products.ToList();
        }
    }
}
