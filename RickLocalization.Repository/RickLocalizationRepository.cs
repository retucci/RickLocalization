using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RickLocalization.Domain.Entities;
using RickLocalization.Domain.Util;

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

        public int Count<T>() where T : class
        {
            return _context.Ricks.Count();
        }
        
        public async Task<Rick[]> GetAllRicksAsync(Pagination pagination)
        {
            IQueryable<Rick> query = _context.Ricks.Include(i =>i.Dimensions);
            query = query.OrderBy(o => o.Name)
                         .Skip((pagination.pageNumber - 1) * pagination.pageSize)
                         .Take(pagination.pageSize).AsQueryable<Rick>();
            return await query.ToArrayAsync();
        }

        public async Task<Rick> GetRicksById(int RickId)
        {
            IQueryable<Rick> query = _context.Ricks.Include(i=>i.Morty).Include(i =>i.Dimensions);
            query = query.Where(w=> w.Id == RickId).OrderByDescending(o => o.Name);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Dimension[]> GetDimensionsByRickId(int RickId)
        {
            var query = _context.Dimensions.Where(w=> w.RickId == RickId)
                         .OrderByDescending(o => o.Original)
                         .ThenBy(o => o.TravelDate);
            return await query.ToArrayAsync();
        }
    }
}