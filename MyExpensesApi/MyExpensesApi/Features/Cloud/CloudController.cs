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