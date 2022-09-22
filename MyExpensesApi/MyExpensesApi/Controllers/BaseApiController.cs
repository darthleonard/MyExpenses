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
            var entity = await context.Set<T>()
                .ToListAsync();
            return entity;
        }

        [HttpPost]
        public virtual async Task<bool> Create(T entity) {
            if(entity.Id == 0) {
                await context.Set<T>().AddAsync(entity);
            } else {
                context.Set<T>().Update(entity);
            }
            return await context.SaveChangesAsync() > 0;
        }
        
        [HttpDelete("{id}")]
        public virtual async Task<bool> Delete(int id) {
            var entity = await context.Set<T>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();
            context.Set<T>().Remove(entity);
            return await context.SaveChangesAsync() > 0;
        }
    }
}