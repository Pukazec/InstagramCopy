using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Commands
{
    public class UpdatePictureCommand : ISavePictureCommand, IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
        public IList<string> HashTags { get; set; } = [];
    }
}
