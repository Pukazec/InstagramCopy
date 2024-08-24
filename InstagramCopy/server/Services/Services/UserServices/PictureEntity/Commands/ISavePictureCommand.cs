namespace InstagramCopy.Services.UserServices.PictureEntity.Commands
{
    public interface ISavePictureCommand
    {
        public string AuthorName { get; set; }
        public string? Description { get; set; }
        public IList<string> HashTags { get; set; }
    }
}
