using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.Identity.Commands;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Services.UserServices.Identity.Handlers
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, string>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var user = new ApplicationUser()
            {
                UserName = request.Username,
                Email = request.Email,
                SubscriptionPlan = request.SubscriptionPlan,
                SubscriptionLastChangedAt = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                throw new Exception(string.Concat(result.Errors.Select(x => x.Description)));
            }

            return "User created successfully!";
        }
    }
}
