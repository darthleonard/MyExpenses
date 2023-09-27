using System.ComponentModel.DataAnnotations.Schema;

namespace MyExpensesApi.Entities
{
    [Table("ShoppingDetails")]
    public class ShoppingDetailRecord: BaseRecord
    {
        [ForeignKey("id")]
        public Guid ShoppingId { get; set; }
        public string name { get; set; }
        public string Brand { get; set; }
        public string Store { get; set; }
        public double UnitPrice { get; set; }
        public double Quantity { get; set; }
        public double TotalAmount { get; set; }
        public bool OnCar { get; set; }
        public string Image { get; set; }
        public ShoppingRecord Shopping { get; set; }
    }
}