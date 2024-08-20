namespace InstagramCopy.Services.UserServices.PictureEntity.Dtos
{
    public class PictureDto
    {
        public Guid Id { get; set; }
        public int? Sepia { get; set; }
        public double? Blur { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }
        public string? Description { get; set; }
        public IList<string> HashTags { get; set; } = [];
        public string ImageData { get; set; } = string.Empty;
    }
}
