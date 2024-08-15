using FluentValidation;
using InstagramCopy.Services.UserServices.Identity.Commands;

namespace InstagramCopy.Services.UserServices.Identity.Validators
{
    public class UpdatePanCommandValidator : AbstractValidator<UpdatePlanCommand>
    {

        public UpdatePanCommandValidator()
        {
            RuleFor(x => x.UserName)
               .NotEmpty();

            RuleFor(x => x.SubscriptionPlan)
                .NotEmpty();
        }
    }
}
