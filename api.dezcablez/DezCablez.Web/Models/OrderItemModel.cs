using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Models
{
    public class OrderItemModel
    {

        [Required]
        public string ItemId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public string Name { get; set; }

    }
}
