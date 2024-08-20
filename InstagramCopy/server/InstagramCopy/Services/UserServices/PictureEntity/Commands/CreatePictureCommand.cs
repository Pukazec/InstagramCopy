using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Commands
{
    public class CreatePictureCommand : ISavePictureCommand, IRequest<Guid>
    {
        public Guid Id => Guid.NewGuid();
        public int Width { get; set; }
        public int Height { get; set; }
        public int? Sepia { get; set; }
        public double? Blur { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public IList<string> HashTags { get; set; } = [];
        public string ImageData { get; set; } = string.Empty;
    }
}
