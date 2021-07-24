using System.Threading.Tasks;
using RickLocalization.Domain;

namespace RickLocalization.Repository
{
    public interface IRickLocalizationRepository
    {
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveChangesAsync();
        Task<Rick[]> GetAllRicksAsync();
        Task<Rick[]> GetAllRicksAsyncByCodigoDimensao(string codigoDimensao);
        Task<Rick> GetRicksById(int RickId);
    }
}