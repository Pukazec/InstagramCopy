namespace Services.Services.UserServices.InstgramLogEntity.Dtos
{
    public class InstagramLogDto
    {
        public int Id { get; set; }

        public string? UserName { get; set; }

        public DateTime OccurredAt { get; set; }

        public string Operation { get; set; } = string.Empty;

        public string? RequestQuery { get; set; }
    }
}
