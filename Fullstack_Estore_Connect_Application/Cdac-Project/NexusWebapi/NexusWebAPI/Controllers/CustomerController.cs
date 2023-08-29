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
    [EnableCors("*", "*", "*")]
    public class CustomerController : ApiController
    {
        // GET: api/Customer
        EstoreEntities e = new EstoreEntities();
        [Route("api/CustomerRegistration")]
        [HttpPost]
        public IHttpActionResult sellerRegistration([FromBody] User u)
        {
            u.enable = 0;
            u.usertype = "CUSTOMER";
            u.registrationdate = DateTime.Now;
            e.Users.Add(u);
            e.SaveChanges();
            return Ok();
        }

        // GET: api/Customer/5
        public User Get(int id)
        {
            return e.Users.Find(id);
        }

        // POST: api/Customer
        [Route("api/UpdateCustomer")]
        [HttpPost]
        public void post([FromBody] User value)
        {
            User u = e.Users.Find(value.Id);
            u.fname = value.fname;
            u.lname = value.lname;
            u.address = value.address;
            u.email = value.email;
            u.mobile = value.mobile;
            u.city = value.city;
            u.pincode = value.pincode;

            e.SaveChanges();
         

        }

        [Route("api/changepass/{id}")]
        [HttpPost]
        public IHttpActionResult Chnge([FromBody] Changepassword cp, int id)
        {
            User u = e.Users.Find(id);
            if (u.password == cp.oldpass)
            {
                u.password = cp.newpass;
                e.SaveChanges();
                return Ok();
            }
            return BadRequest();

        }

        [Route("api/update/{id}")]
        [HttpGet]
        public IHttpActionResult Getcustomer(int id)
        {
            // PUT: api/Customer/5
            return Ok(e.Users.Find(id));

           
        }
    }
}
