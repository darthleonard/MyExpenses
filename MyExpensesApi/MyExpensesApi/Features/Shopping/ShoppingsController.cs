using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Controllers;
using MyExpensesApi.Data;

namespace MyExpensesApi.Features.Shopping
{
    public class ShoppingsController : BaseApiController<Shopping>
    {
        private readonly DataContext context;

        public ShoppingsController(DataContext context) : base(context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public override async Task<ActionResult<Shopping>> Get(Guid id) {
            return await context.Set<Shopping>()
                .Where(s => s.Id == id)
                .Include(s => s.ProductsDetail)
                .SingleOrDefaultAsync();
        }

        [HttpGet]
        public override async Task<ActionResult<IEnumerable<Shopping>>> GetAll() {
            var shopping = await context.Set<Shopping>()
                .Include(s => s.ProductsDetail)
                .ToListAsync();
            return shopping;
        }
        
        [HttpDelete("{id}")]
        public override async Task<bool> Delete(Guid id) {
            var shopping = await context.Shoppings
                .Where(s => s.Id == id)
                .Include(s => s.ProductsDetail)
                .SingleOrDefaultAsync();
            context.ShoppingDetails.RemoveRange(shopping.ProductsDetail);
            context.Shoppings.Remove(shopping);
            return await context.SaveChangesAsync() > 0;
        }
    }
}