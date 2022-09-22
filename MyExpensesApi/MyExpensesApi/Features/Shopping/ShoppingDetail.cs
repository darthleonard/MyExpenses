using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyExpensesApi.Features.Shopping
{
    public class ShoppingDetail
    {
        public int Id {get; set; }
        public string name {get; set; }
        public string Brand {get; set; }
        public string Store {get; set; }
        public double UnitPrice {get; set; }
        public double Quantity {get; set; }
        public double TotalAmount {get; set; }
        public bool OnCar {get; set; }
        public string Image {get; set; }
    }
}