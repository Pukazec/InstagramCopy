using FluentValidation;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;

namespace InstagramCopy.Services.UserServices.PictureEntity.Validators
{
    public class SavePictureCommandValidator<T> : AbstractValidator<T> where T : ISavePictureCommand
    {
        public SavePictureCommandValidator()
        {
        }
    }
}
