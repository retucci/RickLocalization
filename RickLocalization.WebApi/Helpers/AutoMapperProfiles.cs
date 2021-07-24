using AutoMapper;
using RickLocalization.Domain;
using RickLocalization.WebApi.Dto;

namespace RickLocalization.WebApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Rick,RickDto>();
            CreateMap<Morty,MortyDto>().ReverseMap();
            CreateMap<Dimension,DimensionDto>().ReverseMap();
        }
    }
}