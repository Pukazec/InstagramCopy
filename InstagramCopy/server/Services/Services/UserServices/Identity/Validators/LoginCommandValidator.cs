using FluentValidation;
using InstagramCopy.Services.UserServices.Identity.Commands;

namespace InstagramCopy.Services.UserServices.Identity.Validators
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}
