using System.Threading.Tasks;
using RickLocalization.Domain.Entities;
using RickLocalization.Domain.Util;

namespace RickLocalization.Repository
{
    public interface IRickLocalizationRepository
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        int Count<T>() where T: class;
        Task<bool> SaveChangesAsync();

        Task<Rick[]> GetAllRicksAsync(Pagination pagination);
        Task<Rick> GetRicksById(int RickId);
        Task<Dimension[]> GetDimensionsByRickId(int RickId);
    }
}