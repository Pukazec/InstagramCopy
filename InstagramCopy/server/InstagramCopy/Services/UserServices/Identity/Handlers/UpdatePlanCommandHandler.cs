using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.Identity.Commands;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Services.UserServices.Identity.Handlers
{
    public class UpdatePlanCommandHandler : IRequestHandler<UpdatePlanCommand, string>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UpdatePlanCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> Handle(UpdatePlanCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.UserName)
                ?? throw new Exception("User does not exist!");

            user.SubscriptionPlan = request.SubscriptionPlan;
            user.SubscriptionLastChangedAt = DateTime.Now;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception(string.Concat(result.Errors.Select(x => x.Description)));
            }

            return "User created successfully!";
        }
    }
}
