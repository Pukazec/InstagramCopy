using AutoMapper;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.Identity.Dtos;
using InstagramCopy.Services.UserServices.Identity.Queries;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Services.UserServices.Identity.Handlers
{
    public class GetUserStatisticQueryHandler : IRequestHandler<GetUserStatisticQuery, RequestConsumptionDto>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public GetUserStatisticQueryHandler(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<RequestConsumptionDto> Handle(GetUserStatisticQuery request, CancellationToken cancellationToken)
        {
            var user = _userManager.Users
                .SingleOrDefault(x =>
                    x.Id
                    .ToString()
                    .Equals(request.Id.ToString()));
            var result = _mapper.Map<RequestConsumptionDto>(user);
            return result;
        }
    }
}
