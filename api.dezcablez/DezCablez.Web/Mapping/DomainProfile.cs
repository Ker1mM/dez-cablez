using AutoMapper;
using DezCablez.Data.Enums;
using DezCablez.Data.Models;
using DezCablez.Web.Models;
using System;

namespace DezCablez.Web.Mapping
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<RegisterModel, User>();
            CreateMap<ItemModel, Item>()
                .ForMember(x => x.Type, y => y.MapFrom(src => Enum.Parse(typeof(ItemType), src.Type)));
        }
    }
}
