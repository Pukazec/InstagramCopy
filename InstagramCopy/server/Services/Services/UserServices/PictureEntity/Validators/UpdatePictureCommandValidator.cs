using FluentValidation;
using InstagramCopy.Data.Factory;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Services.UserServices.PictureEntity.Validators
{
    public class UpdatePictureCommandValidator : SavePictureCommandValidator<UpdatePictureCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IPictureFactory _pictureFactory;

        public UpdatePictureCommandValidator(UserManager<ApplicationUser> userManager, IPictureFactory pictureFactory)
        {
            _userManager = userManager;
            _pictureFactory = pictureFactory;

            RuleFor(x => x.Id)
                .NotEmpty();

            RuleFor(x => x.AuthorName)
                .NotEmpty();

            RuleFor(x => x)
                .Custom(CheckUser);
        }

        private void CheckUser(UpdatePictureCommand command, ValidationContext<UpdatePictureCommand> context)
        {
            var user = _userManager.Users
                .Single(x => x.UserName.Equals(command.AuthorName))
                ?? throw new ValidationException("User not found");

            var picture = _pictureFactory.GetPictureById(command.Id)
                ?? throw new ValidationException("Picture not found");

            var roles = _userManager.GetRolesAsync(user).Result;

            if (!roles.Any(x => x.Equals("Administrator")) && !user.UserName.Equals(picture.AuthorName))
            {
                throw new ValidationException("You can not edit this picture.");
            }
        }
    }
}
