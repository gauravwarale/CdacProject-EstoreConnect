using NexusWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NexusWebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ShopOrderController : ApiController
    {
        // GET: api/ShopOrder
        EstoreEntities e = new EstoreEntities();
        [Route("api/TodayOrder/{shopid}")]
        [HttpGet]
        public IHttpActionResult TodaysOrder(int shopid)
        {


            var date = DateTime.Now.Date; // Get the current date in UTC without the time component

            var query = from o in e.Orders
                        join u in e.Users on o.userId equals u.Id
                        where o.shopId == shopid
                            && o.ostatus == "Not Delivered"
                            && o.odate.Day == date.Day
                            && o.odate.Month == date.Month
                            && o.odate.Year==date.Year

                        select new
                        {
                            OrderId = o.Id,
                            Username = o.User.fname +" "+o.User. lname,
                            UserAddress = u.address,
                            Orderamount=o.ototal,
                            OrderStatus = o.ostatus
                        };

            return Json(query);

        }

        // GET: api/AllShopOrder/5
        [Route("api/shopAllOrder/{id}")]
        public IHttpActionResult Get(int id)
        {
            var query = from o in e.Orders
                        join u in e.Users on o.userId equals u.Id
                        where o.shopId == id
                           

                        select new
                        {
                            OrderId = o.Id,
                            UserAddress = u.address,
                            orderdate=o.odate,
                            Orderamount = o.ototal,
                            OrderStatus = o.ostatus
                        };

            return Json(query);

        }

        [Route("api/delivared/{orderid}")]
        [HttpGet]
        public IHttpActionResult Delivredorder(int orderid)
        {
            var order = e.Orders.Find(orderid);
            order.ostatus = "Delivered";

            e.SaveChanges();
            return Ok();

        }

        [Route("api/cancelled/{orderid}")]
        [HttpGet]
        public IHttpActionResult Cancelledorder(int orderid)
        {
            var order = e.Orders.Find(orderid);
            order.ostatus = "Cancelled";

            e.SaveChanges();
            return Ok();

        }

        [Route("api/CancelOrder/{orderid}")]
        [HttpGet]
        public IHttpActionResult Cancelorder(int orderid)
        {
            var order = e.Orders.Find(orderid);
            order.ostatus = "Out Of Servive";

            e.SaveChanges();
            return Ok();

        }






        // POST: api/ShopOrder
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ShopOrder/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ShopOrder/5
        public void Delete(int id)
        {
        }
    }
}
