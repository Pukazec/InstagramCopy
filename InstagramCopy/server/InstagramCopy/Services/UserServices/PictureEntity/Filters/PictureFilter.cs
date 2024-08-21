namespace InstagramCopy.Services.UserServices.PictureEntity.Filters
{
    public class PictureFilter
    {
        public string? AuthorName { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public IList<string> HashTags { get; set; } = [];
    }
}
