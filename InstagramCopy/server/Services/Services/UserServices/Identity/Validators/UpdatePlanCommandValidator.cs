using FluentValidation;
using InstagramCopy.Services.UserServices.Identity.Commands;

namespace InstagramCopy.Services.UserServices.Identity.Validators
{
    public class UpdatePlanCommandValidator : AbstractValidator<UpdatePlanCommand>
    {

        public UpdatePlanCommandValidator()
        {
            RuleFor(x => x.UserName)
               .NotEmpty();

            RuleFor(x => x.SubscriptionPlan)
                .NotEmpty();
        }
    }
}
