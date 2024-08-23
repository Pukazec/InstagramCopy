using InstagramCopy.Services.UserServices.Identity.Dtos;
using MediatR;

namespace InstagramCopy.Services.UserServices.Identity.Queries
{
    public class GetUsersStatisticsQuery : IRequest<IList<RequestConsumptionDto>>
    {
    }
}
