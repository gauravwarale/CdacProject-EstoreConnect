using EStoreConnect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace EStoreConnect.Controllers
{
    public class LoginController : Controller
    {
        // GET: Log
      EstoreEntities e=new EstoreEntities();
        public ActionResult Signin()
        {
            
            return View();
        }

        // GET: Login/Details/5
        [HttpPost]
        public ActionResult Signin(Credential crendential)
        {
            //var det = from deteils in e.Users where deteils.email.Equals(crendential.Username) && deteils.password.Equals(crendential.Password) && deteils.usertype.Equals("ADMIN") select deteils;
            var abc = from list in e.Users select list;
            foreach (var item in abc)
            {
                if (item.usertype=="ADMIN" && item.email==crendential.Username && item.password==crendential.Password)
                {
                    FormsAuthentication.SetAuthCookie(crendential.Username, false);
                    return Redirect("/home/index");
                }
            }
            ViewBag.msg = "Invalid Login!!!";
            return View("Signin");
        }

        // GET: Login/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Login/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Login/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Login/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Login/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Login/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
