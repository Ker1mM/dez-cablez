using AutoMapper;
using DezCablez.Data.Models;
using DezCablez.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Mapping
{
    public class DomainProfile: Profile
    {
        public DomainProfile()
        {
            CreateMap<RegisterModel, User>();
        }
    }
}
