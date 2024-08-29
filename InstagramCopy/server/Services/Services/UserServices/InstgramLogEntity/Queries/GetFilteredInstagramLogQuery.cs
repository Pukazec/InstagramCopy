using Domain.Data.Filters;
using MediatR;
using Services.Services.UserServices.InstgramLogEntity.Dtos;

namespace Services.Services.UserServices.InstgramLogEntity.Queries
{
    public class GetFilteredInstagramLogQuery : IRequest<IList<InstagramLogDto>>
    {
        public InstagramLogFilter Filter { get; set; }

        public GetFilteredInstagramLogQuery(InstagramLogFilter filter)
        {
            Filter = filter;
        }
    }
}
