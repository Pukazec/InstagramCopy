using AutoMapper;
using Domain.Data.Models.DbModels;
using Services.Services.UserServices.InstgramLogEntity.Dtos;

namespace Services.Services.UserServices.InstgramLogEntity.Mapping
{
    public class InstagramLogMappingProfile : Profile
    {
        public InstagramLogMappingProfile()
        {
            CreateMap<InstagramLog, InstagramLogDto>();
        }
    }
}
