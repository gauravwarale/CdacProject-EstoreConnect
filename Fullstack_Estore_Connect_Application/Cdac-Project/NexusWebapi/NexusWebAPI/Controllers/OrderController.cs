using NexusWebAPI.DTO;
using NexusWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using static System.Collections.Specialized.BitVector32;

namespace NexusWebAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class OrderController : ApiController
    {
        EstoreEntities e = new EstoreEntities();

        [Route("api/Place/{shopid}/{userid}/{cartid}")]
        [HttpGet]
        public IHttpActionResult PlaceOrder(int shopid, int userid, int cartid)
        {
            decimal Total = 0;
            var query = from p in e.Products
                        join ci in e.CartItems on p.Id equals ci.productId
                        where ci.cartId == cartid
                        select p;

            foreach (var item in query)
            {

                CartItem ci = e.CartItems.Where(a => a.productId == item.Id).First();
                decimal qty= (decimal)ci.qty;
                decimal q = qty;
                decimal p1 = item.p_price_after;
                Total = Total + (q * p1);
            }
            Order o = new Order();
            o.odate = DateTime.Now;
            o.ostatus = "Not Delivered";
            o.ototal = Total;
            o.userId = userid;
            o.shopId = shopid;

            Order no = e.Orders.Add(o);
            e.SaveChanges();
            int id = no.Id;
            
            //RedirectToOrderitem(Total, cartid,id);
            return Ok(200);
            //foreach (var item in query)
            //{
            //    CartItem ci = e.CartItems.Where(a => a.productId == item.Id && a.cartId == cartid).First();
            //    if (ci != null)
            //    {
            //        OrderItem oi = new OrderItem();

            //        oi.productId = item.Id;
            //        oi.orderId = no.Id;
            //        oi.qty = (int)ci.qty;
            //        e.OrderItems.Add(oi);
            //        e.SaveChanges();
            //        CartItem dc = e.CartItems.Find(ci.Id);
            //        e.CartItems.Remove(dc);
            //        e.SaveChanges();
            //    }
            //}
           

        }

        //void RedirectToOrderitem(decimal total, int cartid,int orderid)
        //{
        //    var query = from p in e.Products
        //                join ci in e.CartItems on p.Id equals ci.productId
        //                where ci.cartId == cartid
        //                select p;

        //    foreach (var item in query)
        //    {
        //        CartItem ci = e.CartItems.Where(a => a.productId == item.Id && a.cartId == cartid).First();
        //        if (ci != null)
        //        {
        //            OrderItem oi = new OrderItem();

        //            oi.productId = item.Id;
        //            oi.orderId = orderid;
        //            oi.qty = (int)total;
        //            e.OrderItems.Add(oi);

        //            CartItem dc = e.CartItems.Find(ci.Id);
        //            e.CartItems.Remove(dc);
        //            e.SaveChanges();
        //        }
        //    }

        //}
        [Route("api/GetMyorder/{id}")]
        [HttpGet]
        public IHttpActionResult GetMyOrder(int id)
        {
            var list= e.Orders.Where(a => a.userId == id).ToList();
            return Ok(list);
        }


    }
}
//