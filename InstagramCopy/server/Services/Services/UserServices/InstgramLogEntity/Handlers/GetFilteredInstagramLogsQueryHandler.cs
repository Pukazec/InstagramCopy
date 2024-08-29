using AutoMapper;
using InstagramCopy.Data;
using MediatR;
using Services.Services.UserServices.InstgramLogEntity.Dtos;
using Services.Services.UserServices.InstgramLogEntity.Queries;

namespace Services.Services.UserServices.InstgramLogEntity.Handlers
{
    public class GetFilteredInstagramLogsQueryHandler : IRequestHandler<GetFilteredInstagramLogQuery, IList<InstagramLogDto>>
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetFilteredInstagramLogsQueryHandler(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<InstagramLogDto>> Handle(GetFilteredInstagramLogQuery request, CancellationToken cancellationToken)
        {
            var filteredEntities = request.Filter.FilterEntities(_context.InstagramLogs);
            var result = _mapper.Map<IList<InstagramLogDto>>(filteredEntities);
            result = result.OrderByDescending(x => x.Id).ToList();
            return result;
        }
    }
}
