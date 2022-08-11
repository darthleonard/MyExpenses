using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyExpensesApi.Base
{
    public class BaseRecord
    {
        public Guid Id { get; set; } = new Guid();
        public DateTime CreationDate { get; set; } = DateTime.Now;
        public DateTime LastModDate { get; set; } = DateTime.Now;
        public string CreationUserId { get; set; }
        public string LastModUserId { get; set; }
    }
}