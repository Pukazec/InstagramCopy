
using InstagramCopy.Data.Enums;
using MediatR;

namespace InstagramCopy.Services.UserServices.Identity.Commands
{
    public class RegisterCommand : IRequest<string>
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
