using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyExpensesApi.Base;

namespace MyExpensesApi.Features.Fuel
{
    public class FuelController: BaseApiController
    {
        [HttpGet]
        public IEnumerable<Fuel> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Fuel
            {
                Date = DateTime.Now.AddDays(index),
                Amount = index * (DateTime.Now.Millisecond / 100),
                Quantity = index * DateTime.Now.Millisecond
            })
            .ToArray();
        }

        [HttpGet(nameof(Summatory))]
        public object Summatory()
        {
            return new
            {
                Total = 1000,
                AverageDistance = 13
            };
        }
    }
}