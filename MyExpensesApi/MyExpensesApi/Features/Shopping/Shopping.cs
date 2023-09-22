using MyExpensesApi.Entities;

namespace MyExpensesApi.Features.Shopping
{
    public class Shopping : BaseRecord
    {
        public DateTime EffectiveDate { get; set; }
        public string Name { get; set; }
        public double Total { get; set; }
        public IEnumerable<ShoppingDetail> Details { get; set; }
    }
}