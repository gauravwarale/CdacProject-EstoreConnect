using EStoreConnect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EStoreConnect.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        // GET: Order
        EstoreEntities e=new EstoreEntities();
        public ActionResult Orders()
        {
            var order = e.Orders.ToList();
            List<Shop> ns = e.Shops.ToList();
            List<Shop> shop = new List<Shop>();
            foreach (var item1 in order)
            {
                foreach (var item2 in ns)
                {
                    if(item1.shopId==item2.Id)
                    {
                        shop.Add(item2);
                    }
                }
            }
            OrderShow ordershow = new OrderShow();
            ordershow.orders = order;
            ordershow.shop=shop;
            return View(order.ToList());
        }
        [HttpPost]
        public ActionResult Orders(Order or)
        {
            var olist=from o in e.Orders where o.odate.Equals(or.odate) select o;
            return View(olist.ToList());
        }
    }
}