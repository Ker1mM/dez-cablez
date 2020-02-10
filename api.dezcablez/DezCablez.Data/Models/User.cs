﻿using DezCablez.Data.Enums;
using DezCablez.Data.Shared;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DezCablez.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            this.Addresses = new HashSet<Address>();
            this.Orders = new HashSet<Order>();
            this.Avatar = new Image(ResourceLocations.DefaultAvatarLocation);
        }

        [Required]
        public string UserType { get; set; }

        public virtual ICollection<Address> Addresses { set; get; }

        public Image Avatar { get; set; }

        public virtual ICollection<Order> Orders { set; get; }
    }
}
