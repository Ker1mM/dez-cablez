using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DezCablez.Data.Models
{
    public class OrderItem
    {
        public OrderItem()
        {
        }

        public int Id { get; set; }
        public int OrderId { get; set; }

        [Required]
        public string ItemId { get; set; }

        [ForeignKey(nameof(ItemId))]
        public Item Item { get; set; }

        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; }

        [Range(0, 10000)]
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(22, 2)")]
        [Range(typeof(decimal), "0", "79228162514264337593543950335")]
        public decimal UnitPrice { get; set; }
    }
}
