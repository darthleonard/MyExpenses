using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Data;
using MyExpensesApi.Entities;

namespace MyExpensesApi.Controllers
{
    public class UsersController : BaseApiController<AppUser>
    {
        private readonly DataContext context;

        public UsersController(DataContext context) : base(context)
        {
            this.context = context;
        }
    }
}