using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Models
{
    public class OrderInfoModel
    {
        public OrderInfoModel()
        {
            this.OrderItems = new HashSet<OrderItemModel>();
        }

        public int? Id { get; set; }

        public ICollection<OrderItemModel> OrderItems { get; set; }

        public string Comment { get; set; }

        public decimal? Price { get; set; }

        public string Status { get; set; }

        public string Date { get; set; }
    }
}
