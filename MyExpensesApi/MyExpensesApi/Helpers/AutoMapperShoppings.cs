using AutoMapper;
using MyExpensesApi.Entities;
using MyExpensesApi.Features.Shopping;

namespace MyExpensesApi.Helpers
{
    public class AutoMapperShoppings : Profile
    {
        public AutoMapperShoppings()
        {
            CreateMap<ShoppingRecord, Shopping>();
            CreateMap<Shopping, ShoppingRecord>();
            CreateMap<ShoppingDetailRecord, ShoppingDetail>();
            CreateMap<ShoppingDetail, ShoppingDetailRecord>();
        }
    }
}