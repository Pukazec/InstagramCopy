using InstagramCopy.Data.Enums;

namespace InstagramCopy.Services.UserServices.Identity.Dtos
{
    public class RequestConsumptionDto
    {
        public string UserName { get; set; } = string.Empty;

        public SubscriptionPlan SubscriptionPlan { get; set; }

        public int TodayUploadCount { get; set; }

        public int RequestsTotal { get; set; }
    }
}
