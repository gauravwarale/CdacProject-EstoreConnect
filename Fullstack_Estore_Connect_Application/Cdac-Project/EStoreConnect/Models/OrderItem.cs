//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EStoreConnect.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class OrderItem
    {
        public int Id { get; set; }
        public int orderId { get; set; }
        public int productId { get; set; }
        public int qty { get; set; }
    
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
