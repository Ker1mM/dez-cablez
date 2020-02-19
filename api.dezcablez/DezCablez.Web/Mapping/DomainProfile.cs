using AutoMapper;
using DezCablez.Data.Enums;
using DezCablez.Data.Models;
using DezCablez.Web.Models;
using System;
using System.Linq;

namespace DezCablez.Web.Mapping
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<RegisterModel, User>();
            CreateMap<ItemModel, Item>()
                .ForMember(x => x.Type, y => y.MapFrom(src => Enum.Parse(typeof(ItemType), src.Type)));

            CreateMap<Item, ItemModel>()
                .ForMember(x => x.Images, y => y.MapFrom(src => src.Pictures.Select(x => x.ImgURL).ToArray()));

            CreateMap<AddressInfoModel, Address>();
            CreateMap<Address, AddressInfoModel>();

            CreateMap<User, UserInfoModel>();

            CreateMap<OrderItemModel, OrderItem>();
            CreateMap<OrderItem, OrderItemModel>()
                .ForMember(x => x.Name, y => y.MapFrom(src => src.Item.Name));

            CreateMap<OrderInfoModel, Order>();
            CreateMap<ItemImageDTO, Image>();

            CreateMap<Order, OrderInfoModel>()
                .ForMember(x => x.Date, y => y.MapFrom(src => src.OrderTime.ToString("dd-MM-yyyy")));
        }
    }
}
