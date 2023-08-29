using NexusWebAPI.DTO;
using NexusWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NexusWebAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class CartController : ApiController
    {
        // GET: api/Cart
        EstoreEntities e = new EstoreEntities();
        [Route("api/Cart/Addprodcart/{userid}/{prodID}/{qty}")]
        [HttpGet]
        public  IHttpActionResult Get(int userid, int prodID, int qty)
        {
            Cart nc;
           // CartItem ct = new CartItem();
            bool cart = e.Carts.Any(a => a.userId == userid);

            if (!cart)
            {
                Cart c = new Cart();
                c.userId = userid;
                nc = e.Carts.Add(c);
                e.SaveChanges();
                //ct.cartId = nc.Id;
            }
            else
            {
                //Cart nc1 = e.Carts.Where(a => a.userId == userid).First();
                nc=e.Carts.Where(a => a.userId == userid).First();
                //ct.cartId = nc1.Id;
            }
            CartItem ct = new CartItem();
            bool cartitem = e.CartItems.Any(a => a.productId == prodID && a.cartId == nc.Id);
            if (!cartitem)
            {

                ct.cartId = nc.Id;
                ct.Id = prodID+nc.Id;
                ct.productId = prodID;
                ct.qty = qty;
                e.CartItems.Add(ct);
               e.SaveChangesAsync();

            }
            else
            {
                //CartItem ci=e.CartItems.Where(a=>a.productId==prodID && a.cartId==(e.Carts.Where(b=>b.userId==userid))).FirstOrDefault();


                //            CartItem ci = e.CartItems
                //.Where(a => a.productId == prodID && e.Carts.Any(b => b.userId == userid && b.Id == a.cartId))
                //.FirstOrDefault();

                CartItem ci = e.CartItems.Where(a => a.productId == prodID && a.cartId == ct.cartId || a.cartId == nc.Id).First();
                int? oldqty = ci.qty;
                ci.qty = oldqty + qty;
                e.SaveChanges();
            }

            return Ok(200);
        }

        // GET Product from Cart: api/Cart/5
        public IHttpActionResult Get(int id)
        {
           var query = from p in e.Products
                        join ci in e.CartItems on p.Id equals ci.productId
                        where ci.cartId == id
                        select p;
            List<CartItemProduct> list = new List<CartItemProduct>();
            foreach (var item in query)
            {
                CartItemProduct p = new CartItemProduct();
                p.Id = item.Id;
                p.pname = item.pname;
                p.pweight_ = item.pweight_;
                p.p_price_after = item.p_price_after;
                p.p_price_before = item.p_price_before;
                p.pimage = item.pimage;
                p.pmanufacture = item.pmanufacture;
                CartItem ci = e.CartItems.Where(a => a.productId == item.Id).First();
                p.qty = ci.qty;
                list.Add(p);
            }
            
            

            return Ok(list);
        }

        // POST: api/Cart


        //delete product from cartitem

        [Route("api/removeprod/{prod}/{cartid}")]
        [HttpGet]
        public IHttpActionResult deletefromcart(int prod,int cartid)
        {

            CartItem ci=e.CartItems.Where(e=> e.productId == prod && e.cartId==cartid).First();
            e.CartItems.Remove(ci);
            e.SaveChanges();
            return Ok();
        }


        [Route("api/Cart/Addprodcarts/{userid}/{prodID}/{qty}")]
        [HttpGet]
        public async Task<IHttpActionResult> addprod(int userid, int prodID, int qty)
        {
            Cart nc;
            bool cart = await e.Carts.AnyAsync(a => a.userId == userid);

            if (!cart)
            {
                Cart c = new Cart();
                c.userId = userid;
                nc = e.Carts.Add(c);
                await e.SaveChangesAsync();
            }
            else
            {
                nc = await e.Carts.Where(a => a.userId == userid).FirstAsync();
            }

            bool cartitem = await e.CartItems.AnyAsync(a => a.productId == prodID && a.cartId == nc.Id);

            if (!cartitem)
            {
                CartItem ct = new CartItem();
                ct.cartId = nc.Id;
                ct.Id = prodID;
                ct.productId = prodID;
                ct.qty = qty;
                e.CartItems.Add(ct);
                await e.SaveChangesAsync();
            }
            else
            {
                CartItem ci = await e.CartItems.Where(a => a.productId == prodID && a.cartId == nc.Id).FirstAsync();
                int? oldqty = ci.qty;
                ci.qty = oldqty + qty;
                await e.SaveChangesAsync();
            }

            return Ok(200);
        }
    }
    }
