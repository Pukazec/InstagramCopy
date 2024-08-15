using FluentValidation;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.Identity.Commands;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace InstagramCopy.Services.UserServices.Identity.Validators
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterCommandValidator(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;

            RuleFor(x => x.Username)
                .NotEmpty();

            RuleFor(x => x.Email)
                .Custom((command, validationContext) => CheckEmail(command));

            RuleFor(x => x.Username)
                .Custom((command, validationContext) => CheckUsername(command));

            RuleFor(x => x.Password)
                .Custom((command, validationContext) => CheckPassword(command));

            RuleFor(x => x.SubscriptionPlan)
                .NotEmpty();
        }

        private void CheckEmail(string? value)
        {
            if (IsValidEmailFormat(value))
            {
                throw new ValidationException($"Sent Email ({value}) is not in a valid format.");
            }

            var userWithSameEmail = _userManager.FindByEmailAsync(value).Result;
            if (userWithSameEmail is not null)
            {
                throw new ValidationException($"Sent Email ({value}) is already in use.");
            }
        }

        private void CheckUsername(string requestedUsername)
        {
            var userWithSameUsername = _userManager.FindByNameAsync(requestedUsername).Result;

            if (userWithSameUsername is not null)
            {
                throw new ValidationException($"Sent Username ({requestedUsername}) is already in use!");
            }
        }

        private void CheckPassword(string password)
        {
            var errors = IsValidPassword(password);

            if (!errors.IsNullOrEmpty())
            {
                throw new ValidationException(errors);
            }
        }

        public static bool IsValidEmailFormat(string? value)
        {
            if (value == null)
            {
                return true;
            }

            var valueAsString = value.Trim();

            // only return true if there is only 1 '@' character
            // and it is neither the first nor the last character
            var index = valueAsString.IndexOf('@');

            return
                index > 0 &&
                index != valueAsString.Length - 1 &&
                index == valueAsString.LastIndexOf('@');
        }


        public static string IsValidPassword(string value)
        {
            List<string> errors = [];

            if (value.Length < 8 || value.Length > 64)
            {
                errors.Add("be between 8 and 64 characters long");
            }

            if (!value.Any(char.IsDigit))
            {
                errors.Add("include at least one number");
            }

            if (!value.Any(char.IsLower))
            {
                errors.Add("include at least one lowercase letter");
            }

            if (!value.Any(char.IsUpper))
            {
                errors.Add("include at least one uppercase letter");
            }

            if (!value.Any(c => "!@#$%^&*()_+".Contains(c)))
            {
                errors.Add("include at least one symbol");
            }

            return errors.IsNullOrEmpty() ? string.Empty : "Password is too weak! It has to:\n" + string.Join("\n", errors);
        }
    }
}
