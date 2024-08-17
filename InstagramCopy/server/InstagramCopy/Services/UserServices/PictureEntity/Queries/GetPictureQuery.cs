using InstagramCopy.Services.UserServices.PictureEntity.Dtos;
using MediatR;

namespace InstagramCopy.Services.UserServices.PictureEntity.Queries
{
    public class GetPictureQuery : IRequest<PictureDetailDto>
    {
        public GetPictureQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
