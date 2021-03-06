using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RickLocalization.Domain.Entities;
using RickLocalization.Repository;
using RickLocalization.WebApi.Dto;

namespace RickLocalization.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DimensionController : ControllerBase
    {
        public DimensionController(IRickLocalizationRepository _repository, IMapper _mapper)
        {
            this._repository = _repository;
            this._mapper = _mapper;
        }
        private IRickLocalizationRepository _repository { get; }
        private IMapper _mapper { get; }

        [HttpPost]
        public async Task<IActionResult> Post(DimensionDto model)
        {
            try
            {
                var dimension = _mapper.Map<Dimension>(model);
                _repository.Add(dimension);
                if (await _repository.SaveChangesAsync())
                    return Ok(_mapper.Map<DimensionDto>(dimension));
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Não foi possível inserir a Dimensão : {ex.Message}");
            }

            return BadRequest("Error Post");
        }

        [HttpGet("getByRickId/{rickId}")]
        public async Task<IActionResult> Get(int rickId)
        {
            try
            {
                var results = await _repository.GetDimensionsByRickId(rickId);
                var resultsDto = _mapper.Map<IEnumerable<DimensionDto>>(results);
                return Ok(resultsDto);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Dimensões não encontradas para esse Rick: {ex.Message}");
            }
        }
    }
}