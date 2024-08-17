using InstagramCopy.Services.UserServices.PictureEntity.Dtos;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Queries
{
    public class GetFilteredPicturesQuery : IRequest<IList<PictureDto>>
    {
        public GetFilteredPicturesQuery(PictureFilter filter)
        {
            Filter = filter;
        }

        public PictureFilter Filter { get; set; }
    }
}
