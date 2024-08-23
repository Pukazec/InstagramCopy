using InstagramCopy.Data.Factory;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Handlers
{
    public class DeletePictureCommandHandler : IRequestHandler<DeletePictureCommand, bool>
    {
        private readonly IPictureFactory _pictureFactory;

        public DeletePictureCommandHandler(IPictureFactory pictureFactory)
        {
            _pictureFactory = pictureFactory;
        }

        public async Task<bool> Handle(DeletePictureCommand request, CancellationToken cancellationToken)
        {
            var result = _pictureFactory.DeletePicture(request.Id);
            return result;
        }
    }
}
