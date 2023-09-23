using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using MyExpensesApi.Features.Shopping;

namespace MyExpensesApi.Entities
{
    [Table("ShoppingDetails")]
    public class ShoppingDetailRecord: BaseRecord
    {
        public string name { get; set; }
        public string Brand { get; set; }
        public string Store { get; set; }
        public double UnitPrice { get; set; }
        public double Quantity { get; set; }
        public double TotalAmount { get; set; }
        public bool OnCar { get; set; }
        public string Image { get; set; }
    }
}