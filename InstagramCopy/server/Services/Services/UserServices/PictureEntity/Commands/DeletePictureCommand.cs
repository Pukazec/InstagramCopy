using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Commands
{
    public class DeletePictureCommand : IRequest<bool>
    {
        public DeletePictureCommand(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
