namespace MyExpensesApi.Features.Shopping
{
    public class Shopping
    {
        public Guid Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastModDate { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string Name { get; set; }
        public double Total { get; set; }
        public IEnumerable<ShoppingDetail> Details { get; set; }
    }
}