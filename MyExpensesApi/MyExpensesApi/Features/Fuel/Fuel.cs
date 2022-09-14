using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyExpensesApi.Base;

namespace MyExpensesApi.Features.Fuel
{
    public class Fuel : BaseRecord
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public decimal Quantity { get; set; }
    }
}