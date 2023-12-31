﻿using NexusWebAPI.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NexusWebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class EmailController : ApiController
    {
        [Route("api/otpforchangepassword")]
        [HttpPost]
        public IHttpActionResult SendEmail([FromBody] Email email)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("gauravwarle2803@gmail.com", "bdpevzwpqgmusfec"),
                    //UseDefaultCredentials = false,
                    EnableSsl = true,
                };

                var message = new MailMessage("gauravwarle2803@gmail.com", email.to, email.subject, email.message);
                smtpClient.Send(message);

                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to send email: {ex.Message}");
            }

        }
    }
    }
