using FluentValidation;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;

namespace InstagramCopy.Services.UserServices.PictureEntity.Validators
{
    public class CreatePictureCommandValidator : SavePictureCommandValidator<CreatePictureCommand>
    {
        public CreatePictureCommandValidator() : base()
        {
            RuleFor(x => x.Width)
                    .NotEmpty();
            RuleFor(x => x.Height)
                    .NotEmpty();
            RuleFor(x => x.AuthorName)
                    .NotEmpty();
            RuleFor(x => x.ImageData)
                    .NotEmpty();
        }
    }
}
