using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Identity;

namespace Services.Services.UserServices.PictureEntity.PostProcessors
{
    public class CreatePictureCommandPostProcessor : IRequestPostProcessor<CreatePictureCommand, Guid>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public CreatePictureCommandPostProcessor(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task Process(CreatePictureCommand request, Guid response, CancellationToken cancellationToken)
        {
            var user = _userManager.Users.Single(x => x.UserName.Equals(request.AuthorName))
                ?? throw new Exception("User not found");

            user.TodayUploadCount++;
            await _userManager.UpdateAsync(user);
        }
    }
}
