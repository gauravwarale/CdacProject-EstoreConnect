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
    public class LoginController : ApiController
    {
         // GET: api/Login
        EstoreEntities e=new EstoreEntities();
        [Route("api/SellerLogin")]
        [HttpPost]
        public IHttpActionResult SellerLogin([FromBody] Crenditial u)
        {
            bool validate = e.Users.Any(a => a.email == u.Username && a.password == u.Password && a.usertype=="USER" && a.enable==1);

            if(validate)
            {
                User ur= e.Users.Where(a => a.email == u.Username && a.password == u.Password && a.usertype=="USER" && a.enable==1).First();
                return Ok(ur);
            }
            else
            {
                return Unauthorized();
            }
        }


        [Route("api/CustomerLogin")]
        [HttpPost]
        public IHttpActionResult CustomerLogin([FromBody] Crenditial u)
        {
            bool validate = e.Users.Any(a => a.email == u.Username && a.password == u.Password && a.usertype == "CUSTOMER");
            User u1=e.Users.Where(a => a.email == u.Username && a.password == u.Password && a.usertype == "CUSTOMER").FirstOrDefault();
            if (u1!=null)
            {
                bool cartexist = e.Carts.Any(a => a.userId==u1.Id);
            }
           
            
            if (validate)
            {
                
                validatedata v=new validatedata();
                if(u1!=null)
                {
                    Cart c = e.Carts.FirstOrDefault(a => a.userId==u1.Id);                  
                    
                        if (c==null)
                    {

                        Cart nc = new Cart();
                        nc.userId= u1.Id;
                        nc.Id= u1.Id;
                        e.Carts.Add(nc);
                        e.SaveChanges();
                        v.ID=u1.Id;
                        v.CartID=nc.Id;
                        v.usertype=u1.usertype;
                        v.email=u1.email;
                        return Ok(v);
                    
                    }
                    v.ID = u1.Id;
                    v.CartID = c.Id;
                    v.usertype = u1.usertype;
                    v.email=u1.email;
                }
                return Ok(v);
            }
            else
            {
                return Ok(401);
            }
        }

    }
}
