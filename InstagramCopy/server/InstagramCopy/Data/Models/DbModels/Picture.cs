namespace InstagramCopy.Models.DbModels
{
    public class Picture
    {
        public Guid Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public IList<string> Tags { get; set; } = [];

        public byte[] ImageData { get; set; } = [];
    }
}
