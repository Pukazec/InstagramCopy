using AutoMapper;
using InstagramCopy.Models.DbModels;
using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using InstagramCopy.Services.UserServices.PictureEntity.Dtos;

namespace InstagramCopy.Services.UserServices.PictureEntity.Mapping
{
    public class PictureMappingProfile : Profile
    {
        public PictureMappingProfile()
        {
            CreateMap<Picture, PictureDto>();

            CreateMap<Picture, PictureDetailDto>()
                .IncludeBase<Picture, PictureDto>()
                .ForMember(dest => dest.ImageData, opt => opt.MapFrom(src => Convert.ToBase64String(src.ImageData)));

            CreateMap<CreatePictureCommand, Picture>()
                .ForMember(dest => dest.ImageData, opt => opt.MapFrom(src => Convert.FromBase64String(src.ImageData)));

            CreateMap<UpdatePictureCommand, Picture>();
        }
    }
}
