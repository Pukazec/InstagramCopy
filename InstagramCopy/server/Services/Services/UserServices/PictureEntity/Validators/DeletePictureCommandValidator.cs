using FluentValidation;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;

namespace InstagramCopy.Services.UserServices.PictureEntity.Validators
{
    public class DeletePictureCommandValidator : AbstractValidator<DeletePictureCommand>
    {
        public DeletePictureCommandValidator()
        {
            RuleFor(x => x.Id)
                    .NotEmpty();
        }
    }
}
