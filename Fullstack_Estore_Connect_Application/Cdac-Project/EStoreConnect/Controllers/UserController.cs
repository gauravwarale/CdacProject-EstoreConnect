using EStoreConnect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EStoreConnect.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        // GET: User
        EstoreEntities e=new EstoreEntities();
        public ActionResult Userlist()
        {
            var list=from li in e.Users select li;
            return View(list.ToList());
        }
        public ActionResult Delete(int id)
        {
            User u = e.Users.Find(id);
            e.Users.Remove(u);
            e.SaveChanges();
            return Redirect("/User/UserList");
        }
    }
}