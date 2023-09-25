using AutoMapper;
using MyExpensesApi.Entities;
using MyExpensesApi.Features.Shopping;

namespace MyExpensesApi.Helpers
{
    public class AutoMapperShoppings : Profile
    {
        public AutoMapperShoppings()
        {
            CreateMap<Shopping, ShoppingRecord>().ReverseMap();
            CreateMap<ShoppingDetail, ShoppingDetailRecord>().ReverseMap();
        }
    }
}