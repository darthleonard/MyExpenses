using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Data;
using MyExpensesApi.Entities;

namespace MyExpensesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController<T> : ControllerBase where T : BaseRecord
    {
        private readonly DataContext context;
        public BaseApiController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> Get(int id) {
            return await context.Set<T>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> GetAll() {
            var shopping = await context.Set<T>()
                .ToListAsync();
            return shopping;
        }

        [HttpPost]
        public virtual async Task<bool> Create(T shopping) {
            await context.Set<T>().AddAsync(shopping);
            return await context.SaveChangesAsync() > 0;
        }
        
        [HttpDelete("{id}")]
        public virtual async Task<bool> Delete(int id) {
            var shopping = await context.Set<T>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();
            context.Set<T>().Remove(shopping);
            return await context.SaveChangesAsync() > 0;
        }
    }
}