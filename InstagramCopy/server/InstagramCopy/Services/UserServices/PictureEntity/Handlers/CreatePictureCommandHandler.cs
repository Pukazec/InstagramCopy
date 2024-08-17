using AutoMapper;
using InstagramCopy.Data.Factory;
using InstagramCopy.Models.DbModels;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Handlers
{
    public class CreatePictureCommandHandler : IRequestHandler<CreatePictureCommand, Guid>
    {
        private readonly IPictureFactory _pictureFactory;
        private readonly IMapper _mapper;

        public CreatePictureCommandHandler(IPictureFactory pictureFactory, IMapper mapper)
        {
            _pictureFactory = pictureFactory;
            _mapper = mapper;
        }

        public async Task<Guid> Handle(CreatePictureCommand request, CancellationToken cancellationToken)
        {
            var picture = _mapper.Map<Picture>(request);
            var result = _pictureFactory.CreatePicture(picture);
            return result;
        }
    }
}
