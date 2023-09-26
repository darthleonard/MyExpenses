using AutoMapper;
using MyExpensesApi.Entities;
using MyExpensesApi.Features.Shopping;

namespace MyExpensesApi.Helpers
{
    public class AutoMapperShoppings : Profile
    {
        public AutoMapperShoppings()
        {
            CreateMap<Shopping, ShoppingRecord>()
                .ForMember(s => s.Details, o => o.Ignore())
                .ReverseMap();
            CreateMap<ShoppingDetail, ShoppingDetailRecord>().ReverseMap();
        }
    }
}