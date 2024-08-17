using FluentValidation;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;

namespace InstagramCopy.Services.UserServices.PictureEntity.Validators
{
    public class UpdatePictureCommandValidator : SavePictureCommandValidator<UpdatePictureCommand>
    {
        public UpdatePictureCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty();
        }
    }
}
