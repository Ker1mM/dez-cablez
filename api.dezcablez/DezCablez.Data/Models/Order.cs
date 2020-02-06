using DezCablez.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace DezCablez.Data.Models
{
    public class Order
    {
        public Order()
        {
            this.OrderTime = DateTime.UtcNow;
            this.Status = OrderStatus.Received;
            this.OrderItems = new HashSet<OrderItem>();
            this.Price = this.OrderItems.Sum(x => x.Price);
        }

        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public DateTime OrderTime { get; set; }

        public string TrackingNumber { get; set; }

        public OrderStatus Status { get; set; }

        [StringLength(200, MinimumLength = 10)]
        public string Comment { get; set; }

        [Column(TypeName = "decimal(22, 2)")]
        [Range(typeof(decimal), "0", "79228162514264337593543950335")]
        public decimal Price { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
