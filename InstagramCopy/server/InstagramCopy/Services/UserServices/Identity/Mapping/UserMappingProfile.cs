using AutoMapper;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.Identity.Dtos;

namespace InstagramCopy.Services.UserServices.Identity.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<ApplicationUser, RequestConsumptionDto>()
                .ForMember(dest => dest.RequestsTotal, opt => opt.MapFrom(src => src.SubscriptionPlan));
        }
    }
}
