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
        public async Task<ActionResult<Shopping>> Get(Guid id)
        {
            var shopping = await context.Set<ShoppingRecord>()
                .Where(s => s.Id == id)
                .Include(s => s.Details)
                .SingleOrDefaultAsync();
            var response = mapper.Map<Shopping>(shopping);
            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shopping>>> GetAll()
        {
            var shoppings = await context.Set<ShoppingRecord>()
                .Include(s => s.Details)
                .ToListAsync();
            var response = mapper.Map<IEnumerable<Shopping>>(shoppings);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id)
        {
            var shopping = await context.Shoppings
                .Where(s => s.Id == id)
                //.Include(s => s.Details)
                .SingleOrDefaultAsync();
            context.Shoppings.Remove(shopping);
            return await context.SaveChangesAsync() > 0;
        }

        [HttpPost]
        public async Task<ActionResult> Save(Shopping shopping)
        {
            var shoppingRecord = await context.Set<ShoppingRecord>()
                .SingleOrDefaultAsync(s => s.Id == shopping.Id)
                ?? new ShoppingRecord();

            if (shoppingRecord.Id == Guid.Empty)
            {
                mapper.Map(shopping, shoppingRecord);
                await context.Set<ShoppingRecord>().AddAsync(shoppingRecord);
                await context.SaveChangesAsync();
                return Ok("Success");
            }

            var details = await context.Set<ShoppingDetailRecord>()
                    .Where(d => d.ShoppingId == shoppingRecord.Id)
                    .ToListAsync();

            var changes = 0;
            foreach (var detail in details)
            {
                if (shopping.Details.Any(d => d.Id == detail.Id))
                {
                    continue;
                }
                context.Set<ShoppingDetailRecord>().Remove(detail);
                changes++;
            }

            foreach (var detail in shopping.Details)
            {
                var detailRecord = await context.Set<ShoppingDetailRecord>()
                    .SingleOrDefaultAsync(d => d.Id == detail.Id)
                    ?? new ShoppingDetailRecord();

                if (detailRecord.Id == Guid.Empty)
                {
                    mapper.Map(detail, detailRecord);
                    await context.Set<ShoppingDetailRecord>().AddAsync(detailRecord);
                }
                else
                {
                    mapper.Map(detail, detailRecord);
                }
                if (context.Entry(detailRecord).State != EntityState.Unchanged)
                {
                    changes++;
                }
            }

            if (changes == 0)
            {
                return Ok("Nothing to update");
            }

            if (await context.SaveChangesAsync() > 0)
            {
                return Ok("Success");
            }

            return BadRequest("Failed to update shopping");
        }
    }
}