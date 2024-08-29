using Domain.Data.Models.DbModels;
using Microsoft.IdentityModel.Tokens;

namespace Domain.Data.Filters
{
    public class InstagramLogFilter
    {
        public string? UserName { get; set; }

        public DateTime? From { get; set; }

        public DateTime? To { get; set; }

        public string Operation { get; set; } = string.Empty;

        public IQueryable<InstagramLog> FilterEntities(IQueryable<InstagramLog> entities)
        {
            if (!UserName.IsNullOrEmpty())
            {
                entities = entities.Where(x => x.UserName.Equals(UserName));
            }

            if (From != null)
            {
                entities = entities.Where(x => x.OccurredAt > From);
            }

            if (To != null)
            {
                entities = entities.Where(x => x.OccurredAt < To);
            }

            if (!Operation.IsNullOrEmpty())
            {
                entities = entities.Where(x => x.Operation.Equals(Operation));
            }

            return entities;
        }
    }
}
