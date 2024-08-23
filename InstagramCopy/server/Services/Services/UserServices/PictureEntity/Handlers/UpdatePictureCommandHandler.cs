using AutoMapper;
using InstagramCopy.Data.Factory;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Handlers
{
    public class UpdatePictureCommandHandler : IRequestHandler<UpdatePictureCommand, Guid>
    {
        private readonly IPictureFactory _pictureFactory;
        private readonly IMapper _mapper;

        public UpdatePictureCommandHandler(IPictureFactory pictureFactory, IMapper mapper)
        {
            _pictureFactory = pictureFactory;
            _mapper = mapper;
        }

        public async Task<Guid> Handle(UpdatePictureCommand request, CancellationToken cancellationToken)
        {
            var existing = _pictureFactory.GetPictureById(request.Id);
            var picture = _mapper.Map(request, existing);
            var result = _pictureFactory.UpdatePicture(picture);
            return result;
        }
    }
}
