namespace InstagramCopy.Services.UserServices.PictureEntity.Dtos
{
    public class PictureDto
    {
        public Guid Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }
        public string Format { get; set; } = string.Empty;
        public string? Description { get; set; }
        public IList<string> HashTags { get; set; } = [];
    }
}
