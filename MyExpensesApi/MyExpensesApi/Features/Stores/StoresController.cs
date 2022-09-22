using MyExpensesApi.Controllers;
using MyExpensesApi.Data;

namespace MyExpensesApi.Features.Stores
{
    public class StoresController : BaseApiController<Store>
    {
        public StoresController(DataContext context) : base(context)
        {
        }
    }
}