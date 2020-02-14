using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DezCablez.Data.Models
{
    public class Address
    {
        public Address()
        {

        }

        public int Id { get; set; }

        [Required]
        public string Nickname { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]

        public User User { get; set; }

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
