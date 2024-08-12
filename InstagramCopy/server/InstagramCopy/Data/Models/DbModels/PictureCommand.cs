namespace InstagramCopy.Models.DbModels
{
    public class PictureCommand
    {
        public Guid Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public IList<string> Tags { get; set; } = [];

        public string ImageData { get; set; } = string.Empty;
    }
}
