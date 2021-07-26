using AutoMapper;
using RickLocalization.Domain.Entities;
using RickLocalization.WebApi.Dto;

namespace RickLocalization.WebApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Rick,RickDto>().ReverseMap();
            CreateMap<Morty,MortyDto>().ReverseMap();
            CreateMap<Dimension,DimensionDto>().ReverseMap();
         }
    }
}