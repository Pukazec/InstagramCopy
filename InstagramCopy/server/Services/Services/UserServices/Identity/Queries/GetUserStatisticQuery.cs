using InstagramCopy.Services.UserServices.Identity.Dtos;
using MediatR;

namespace InstagramCopy.Services.UserServices.Identity.Queries
{
    public class GetUserStatisticQuery : IRequest<RequestConsumptionDto>
    {
        public Guid Id { get; set; }

        public GetUserStatisticQuery(Guid id)
        {
            Id = id;
        }
    }
}
