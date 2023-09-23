using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyExpensesApi.Interfaces
{
    public interface IRepository<T>
    {
        void Update(T entity);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetById(Guid id);
    }
}