using System.ComponentModel.DataAnnotations.Schema;

namespace MyExpensesApi.Entities
{
    [Table("Shoppings")]
    public class ShoppingRecord : BaseRecord
    {
        public DateTime EffectiveDate { get; set; }
        public string Name { get; set; }
        public double Total { get; set; }
        public IEnumerable<ShoppingDetailRecord> Details { get; set; }
    }
}