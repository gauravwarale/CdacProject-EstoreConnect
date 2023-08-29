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
    public class SellerController : ApiController
    {
        // GET: api/Seller
        EstoreEntities e = new EstoreEntities();
         
        [Route("api/SellerRegistration")]
        [HttpPost]
        public void sellerRegistration([FromBody] User u)
        {
            u.enable = 0;
            u.usertype = "USER";
            u.registrationdate= DateTime.Now;
            e.Users.Add(u);
            e.SaveChanges();
            
        }
        [Route("api/seller")]
        public IHttpActionResult Get()
        {
            var list=e.Users.ToList();
            return Ok(list);
        }


        [Route("api/UpdateSeller/{shopname}")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] User value,string shopname)
        {
            User u = e.Users.Find(value.Id);
            u.fname = value.fname;
            u.lname = value.lname;
            u.address = value.address;
            u.email = value.email;
            u.mobile = value.mobile;
            u.city = value.city;
            u.pincode = value.pincode;
            Shop s = e.Shops.Find(value.Id);
            s.Shopname = shopname;
            e.SaveChanges();
            return Ok(200);
        }

    }
}
