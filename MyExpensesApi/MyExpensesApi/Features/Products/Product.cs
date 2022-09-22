using MyExpensesApi.Entities;

namespace MyExpensesApi.Features.Products
{
    public class Product : BaseRecord
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Image { get; set; }
    }
}