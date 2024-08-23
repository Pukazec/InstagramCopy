using FluentValidation;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Services.UserServices.PictureEntity.Validators
{
    public class CreatePictureCommandValidator : SavePictureCommandValidator<CreatePictureCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public CreatePictureCommandValidator(UserManager<ApplicationUser> userManager) : base()
        {
            _userManager = userManager;

            RuleFor(x => x.Width)
                    .NotEmpty();
            RuleFor(x => x.Height)
                    .NotEmpty();
            RuleFor(x => x.AuthorName)
                    .NotEmpty()
                    .Custom(CheckUploadCount);
            RuleFor(x => x.ImageData)
                    .NotEmpty();
        }

        private void CheckUploadCount(string userName, ValidationContext<CreatePictureCommand> context)
        {
            var user = _userManager.Users.Single(x => x.UserName.Equals(userName))
                ?? throw new ValidationException("User not found");

            if (user.TodayUploadCount >= (int)user.SubscriptionPlan)
            {
                throw new ValidationException("Todays uploads used up for current plan!");
            }
        }
    }
}
