using InstagramCopy.Data.Enums;
using MediatR;

namespace InstagramCopy.Services.UserServices.Identity.Commands
{
    public class UpdatePlanCommand : IRequest<string>
    {
        public string UserName { get; set; } = string.Empty;
        public SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
