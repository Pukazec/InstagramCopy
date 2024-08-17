using AutoMapper;
using InstagramCopy.Data.Factory;
using InstagramCopy.Services.UserServices.PictureEntity.Dtos;
using InstagramCopy.Services.UserServices.PictureEntity.Queries;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Handlers
{
    public class GetFilteredPicturesQueryHandler : IRequestHandler<GetFilteredPicturesQuery, IList<PictureDto>>
    {
        private readonly IPictureFactory _pictureFactory;
        private readonly IMapper _mapper;

        public GetFilteredPicturesQueryHandler(IPictureFactory pictureFactory, IMapper mapper)
        {
            _pictureFactory = pictureFactory;
            _mapper = mapper;
        }

        public async Task<IList<PictureDto>> Handle(GetFilteredPicturesQuery request, CancellationToken cancellationToken)
        {
            var pictures = _pictureFactory.GetFilteredPictures(request.Filter);
            var result = _mapper.Map<IList<PictureDto>>(pictures);
            return result;
        }
    }
}
