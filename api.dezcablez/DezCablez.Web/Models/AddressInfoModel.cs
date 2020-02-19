using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Models
{
    public class AddressInfoModel
    {
        public int? Id { get; set; }

        [Required]
        public string Nickname { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        public int PostalCode { get; set; }

        [Required]
        [StringLength(220, MinimumLength = 10)]
        public string Address1 { get; set; }

        public string Address2 { get; set; }

        [Required]
        public string Phone { get; set; }
    }
}
