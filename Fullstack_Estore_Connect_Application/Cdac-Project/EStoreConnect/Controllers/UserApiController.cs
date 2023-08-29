using EStoreConnect.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EstoreWebAPI.Controllers
{
    public class UserApiController : ApiController
    {
        // GET: api/User
        EstoreEntities e=new EstoreEntities();
        public List<User> Get()
        {
            return (from u in e.Users select u).ToList();
        }

        // GET: api/User/5
        public User Get(int id)
        {
            return e.Users.Find(id);
            
        }

        // POST: api/User
        public void Post([FromBody]User value)
        {
            value.enable = 0;
            value.usertype = "USER";
            value.registrationdate= DateTime.Now;
            e.Users.Add(value);
            e.SaveChanges();
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
