using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MyExpensesApi.Features.Cloud
{
    [ApiController]
    [Route("api/[controller]")]
    public class CloudController :  ControllerBase
    {
        [HttpGet]
        public Task Ping() {
            return Task.FromResult(NoContent());
        }
    }
}