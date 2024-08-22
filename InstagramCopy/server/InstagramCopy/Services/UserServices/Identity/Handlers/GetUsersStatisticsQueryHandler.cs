using AutoMapper;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.Identity.Dtos;
using InstagramCopy.Services.UserServices.Identity.Queries;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Services.UserServices.Identity.Handlers
{
    public class GetUsersStatisticsQueryHandler : IRequestHandler<GetUsersStatisticsQuery, IList<RequestConsumptionDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public GetUsersStatisticsQueryHandler(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<IList<RequestConsumptionDto>> Handle(GetUsersStatisticsQuery request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<IList<RequestConsumptionDto>>(_userManager.Users);
            return result;
        }
    }
}
