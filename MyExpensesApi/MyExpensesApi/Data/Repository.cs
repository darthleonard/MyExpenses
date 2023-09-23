using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Features.Shopping;
using MyExpensesApi.Interfaces;

namespace MyExpensesApi.Data
{
    public class Repository : IRepository<Shopping>
    {
        private DataContext context;

        public Repository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Shopping>> GetAllAsync()
        {
            var entity = await context.Set<Shopping>()
                .ToListAsync();
            return entity;
        }

        public async Task<Shopping> GetById(Guid id)
        {
            return await context.Set<Shopping>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Shopping entity)
        {
            context.Entry(entity).State = EntityState.Modified;
        }
    }
}