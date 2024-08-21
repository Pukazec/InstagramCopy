using InstagramCopy.Data.Enums;
using Microsoft.AspNetCore.Identity;

namespace InstagramCopy.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public SubscriptionPlan SubscriptionPlan { get; set; }

        public SubscriptionPlan DesiredSubscriptionPlan { get; set; }

        public int TodayUploadCount { get; set; }
    }
}
