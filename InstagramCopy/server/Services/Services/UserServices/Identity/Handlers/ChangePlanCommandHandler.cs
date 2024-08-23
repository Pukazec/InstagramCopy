using InstagramCopy.Models.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Services.Services.UserServices.Identity.Commands;

namespace Services.Services.UserServices.Identity.Handlers
{
    public class ChangePlanCommandHandler : IRequestHandler<ChangePlanCommand, string>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ChangePlanCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> Handle(ChangePlanCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.UserName)
                ?? throw new Exception("User does not exist!");

            user.SubscriptionPlan = request.SubscriptionPlan;
            user.DesiredSubscriptionPlan = request.SubscriptionPlan;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception(string.Concat(result.Errors.Select(x => x.Description)));
            }

            return "User created successfully!";
        }
    }
}
