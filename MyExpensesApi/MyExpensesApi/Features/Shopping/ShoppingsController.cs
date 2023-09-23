using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Data;
using MyExpensesApi.Entities;

namespace MyExpensesApi.Features.Shopping
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingsController : ControllerBase //BaseApiController<ShoppingRecord>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public ShoppingsController(DataContext context, IMapper mapper) //: base(context)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shopping>> Get(Guid id) {
            var shopping = await context.Set<ShoppingRecord>()
                .Where(s => s.Id == id)
                .Include(s => s.Details)
                .SingleOrDefaultAsync();
            var response = mapper.Map<Shopping>(shopping);
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shopping>>> GetAll() {
            var shoppings = await context.Set<ShoppingRecord>()
                .Include(s => s.Details)
                .ToListAsync();
            var response = mapper.Map<IEnumerable<Shopping>>(shoppings);
            return Ok(response);
        }
        
        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id) {
            var shopping = await context.Shoppings
                .Where(s => s.Id == id)
                .Include(s => s.Details)
                .SingleOrDefaultAsync();
            context.Shoppings.Remove(shopping);
            return await context.SaveChangesAsync() > 0;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Shopping shopping) {
            var shoppingRecord = await context.Set<ShoppingRecord>()
                .Where(s => s.Id == shopping.Id)
                .Include(s => s.Details)
                .SingleOrDefaultAsync();
            
            if(shoppingRecord == null) {
                shoppingRecord = new ShoppingRecord();
                mapper.Map(shopping, shoppingRecord);
                await context.Set<ShoppingRecord>().AddAsync(shoppingRecord);
                await context.SaveChangesAsync();
                return NoContent();
            }

            mapper.Map(shopping, shoppingRecord);
            if(await context.SaveChangesAsync() > 0) {
                return NoContent();
            }

            return BadRequest("Failed to update shopping");
        }
    }
}