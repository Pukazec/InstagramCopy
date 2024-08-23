using AutoMapper;
using InstagramCopy.Data.Factory;
using InstagramCopy.Services.UserServices.PictureEntity.Dtos;
using InstagramCopy.Services.UserServices.PictureEntity.Queries;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Handlers
{
    public class GetPictureQueryHandler : IRequestHandler<GetPictureQuery, PictureDetailDto>
    {
        private readonly IPictureFactory _pictureFactory;
        private readonly IMapper _mapper;

        public GetPictureQueryHandler(IPictureFactory pictureFactory, IMapper mapper)
        {
            _pictureFactory = pictureFactory;
            _mapper = mapper;
        }

        public async Task<PictureDetailDto> Handle(GetPictureQuery request, CancellationToken cancellationToken)
        {
            var picture = _pictureFactory.GetPictureById(request.Id);
            var result = _mapper.Map<PictureDetailDto>(picture);
            return result;
        }
    }
}
