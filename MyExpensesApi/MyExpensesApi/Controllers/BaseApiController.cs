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
        public virtual async Task<ActionResult<T>> Get(Guid id)
        {
            return await context.Set<T>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            var entity = await context.Set<T>()
                .ToListAsync();
            return entity;
        }

        [HttpPost]
        public virtual async Task<bool> Create(T entity)
        {
            if (await ExistingId(entity.Id))
            {
                context.Set<T>().Update(entity);
            }
            else
            {
                await context.Set<T>().AddAsync(entity);
            }
            return await context.SaveChangesAsync() > 0;
        }

        [HttpDelete("{id}")]
        public virtual async Task<bool> Delete(Guid id)
        {
            var entity = await context.Set<T>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();
            context.Set<T>().Remove(entity);
            return await context.SaveChangesAsync() > 0;
        }

        private async Task<bool> ExistingId(Guid id)
        {
            var entity = await context.Set<T>()
                .Where(s => s.Id == id)
                .AsNoTracking()
                .SingleOrDefaultAsync();
            return entity != null;
        }
    }
}