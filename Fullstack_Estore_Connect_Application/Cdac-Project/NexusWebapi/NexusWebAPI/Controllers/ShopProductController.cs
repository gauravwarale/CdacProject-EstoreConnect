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
    public class ShopProductController : ApiController
    {
        // GET: api/ShopProduct

        EstoreEntities e=new EstoreEntities();
        [Route("api/GetProductshop/{shopid}")]
        public IHttpActionResult Get(int shopid)
        {
            var prolist = e.ProductShops.Where(a => a.shopId == shopid).ToList();
            List<Product> plist = new List<Product>();
            foreach (var item in prolist)
            {
                Product loop = e.Products.Find(item.productId);
                plist.Add(loop);
            }
            return Ok(plist);
        }


        [Route("api/Addproduct/{shopid}")]
        [HttpPost]
        public IHttpActionResult AddProduct([FromBody]AddProductshop p,int shopid)
        {
            Product prod = e.Products.Where(c => c.pname.Equals(p.pname)).FirstOrDefault();
            bool isAvailable = e.ProductShops.Any(a => a.productId == prod.Id && a.shopId==shopid);
            if (isAvailable)
            {
                return Ok();

            }
            else
            {
                var pp = e.Products.Where(a => a.pname==p.pname).First();
                ProductShop ps = new ProductShop();
                ps.shopId = shopid;
                ps.productId = pp.Id;
                ps.pstatus = p.pstatus;
                ps.pregistrationdate = DateTime.Now;
                e.ProductShops.Add(ps);
                e.SaveChanges();
                return Ok();
            }
            

        }
        // GET: api/ShopProduct/5
       

        // POST: api/ShopProduct
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ShopProduct/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ShopProduct/5
        [Route("api/DeleteShopProduct/{prodId}/{shopId}")]
        [HttpDelete]
        public IHttpActionResult Delete(int prodId, int shopId)
        {
            ProductShop ps = e.ProductShops.Where(a => a.productId == prodId && a.shopId == shopId).First();
            e.ProductShops.Remove(ps);
            e.SaveChanges();
            return Ok();
        }
    }
}
