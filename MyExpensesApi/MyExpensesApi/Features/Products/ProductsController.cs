using MyExpensesApi.Controllers;
using MyExpensesApi.Data;

namespace MyExpensesApi.Features.Products
{
    public class ProductsController : BaseApiController<Product>
    {
        public ProductsController(DataContext context) : base(context)
        {
        }
    }
}