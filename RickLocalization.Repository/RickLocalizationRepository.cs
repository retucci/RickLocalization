using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RickLocalization.Domain;

namespace RickLocalization.Repository
{
    public class RickLocalizationRepository : IRickLocalizationRepository
    {
        private RickLocalizationContext _context { get; set; }
        public RickLocalizationRepository(RickLocalizationContext ctx)
        {
            _context = ctx;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Rick[]> GetAllRicksAsync()
        {
            //TODO: DAR O INCLUDE SÓ QUANDO NECESSARIO PASSAR POR PARAM
            IQueryable<Rick> query = _context.Ricks.Include(i =>i.Dimensions);
            query = query.OrderByDescending(o => o.Name);
            return await query.ToArrayAsync();
        }

        public Task<Rick[]> GetAllRicksAsyncByCodigoDimensao(string codigoDimensao)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Rick> GetRicksById(int RickId)
        {
            //TODO: DAR O INCLUDE SÓ QUANDO NECESSARIO PASSAR POR PARAM
            IQueryable<Rick> query = _context.Ricks.Include(i=>i.Morty).Include(i =>i.Dimensions);
            query = query.Where(w=> w.Id == RickId).OrderByDescending(o => o.Name);
            return await query.FirstOrDefaultAsync();
        }
    }
}