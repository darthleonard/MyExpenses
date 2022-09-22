using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyExpensesApi.Entities
{
    public class BaseRecord
    {
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastModDate { get; set; }
    }
}