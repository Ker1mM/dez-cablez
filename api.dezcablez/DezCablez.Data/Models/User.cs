using DezCablez.Data.Enums;
using DezCablez.Data.Shared;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DezCablez.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            this.Avatar = ResourceLocations.DefaultAvatarLocation;
        }

        [Required]
        public string UserType { get; set; }


        public int? ActiveAddressId { get; set; }

        [ForeignKey(nameof(ActiveAddressId))]
        public Address ActiveAddress { get; set; }


        public string Avatar { get; set; }

    }
}
