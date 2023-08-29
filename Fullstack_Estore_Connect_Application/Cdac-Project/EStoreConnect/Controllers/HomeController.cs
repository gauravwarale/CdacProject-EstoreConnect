using EStoreConnect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace EStoreConnect.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        // GET: Home
        EstoreEntities e = new EstoreEntities();
        public ActionResult Index()
        {
            ViewBag.title = "Index";

            DashBoard b= new DashBoard();

            b.customer=(from c in e.Users where c.usertype.Equals("CUSTOMER") select c).Count();
            b.User= (from c in e.Users where (c.usertype == "USER" && c.enable==1) select c).Count();
            b.cat=(from t in e.ProductCategories select t).Count();
            b.subcat=(from s in e.ProductSubcategories select s).Count();
            b.product=(from p in e.Products select p).Count();
            b.shoprequest= (from c in e.Users where c.usertype.Equals("USER")&&c.enable==0 select c).Count();
            return View(b);
        }

        // GET: Home/Details/5
        public ActionResult Request()
        {

            var list = from li in e.Users where li.usertype.Equals("USER") && li.enable == 0 select li;
            if (list.LongCount().Equals(0))
            {
                ViewBag.empty = "No Request";
                return View();
            }
            return View(list.ToList());
        }
        public ActionResult Cancelrequest(int id)
        {
            User u = e.Users.Find(id);
            u.usertype = "CUSTOMER";
            e.SaveChanges();
            return Redirect("/Home/Index");
        }

        public ActionResult AcceptRequest(int id)
        {
            User u = e.Users.Find(id);
            u.enable =1;

            e.SaveChanges();
            Shop sp = new Shop();
            sp.Id = id;
            sp.Shopname = u.fname + " Store";
            e.Shops.Add(sp);
            e.SaveChanges();
            return Redirect("/Home/Index");
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return Redirect("/Login/SignIn");
        }
        // GET: Home/Create
    }
}
