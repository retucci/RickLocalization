using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RickLocalization.Domain;
using RickLocalization.Repository;
using RickLocalization.WebApi.Dto;
using System.Linq;

namespace RickLocalization.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RickController : ControllerBase
    {
        public RickController(IRickLocalizationRepository _repository, IMapper _mapper)
        {
            this._repository = _repository;
            this._mapper = _mapper;
        }
        private IRickLocalizationRepository _repository { get; }
        private IMapper _mapper { get; }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repository.GetAllRicksAsync();
                var resultsDto = _mapper.Map<IEnumerable<RickDto>>(results);
                return Ok(resultsDto);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ricks não encontrados: {ex.Message}");
            }
        }

        [HttpGet("{RickId}")]
        public async Task<IActionResult> Get(int RickId)
        {
            try
            {
                var results = await _repository.GetRicksById(RickId);
                var resultsDto = _mapper.Map<RickDto>(results);
                return Ok(resultsDto);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Rick não encontrado: {ex.Message}");
            }
        }

        [HttpGet("getByCodigoDimensao/{codigoDimensao}")]
        public async Task<IActionResult> Get(string codigoDimensao)
        {
            try
            {
                var results = await _repository.GetAllRicksAsyncByCodigoDimensao(codigoDimensao);
                var resultsDto = _mapper.Map<IEnumerable<RickDto>>(results);
                return Ok(resultsDto);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Ricks não encontrados por dimensão: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(RickDto model)
        {
            try
            {
                var Rick = _mapper.Map<Rick>(model);
                _repository.Add(Rick);
                if (await _repository.SaveChangesAsync())
                    return Created($"/api/Rick/{Rick.Id}", _mapper.Map<RickDto>(Rick));
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Não foi possível inserir Rick : {ex.Message}");
            }

            return BadRequest("Error Post");
        }

        [HttpPut("{RickId}")]
        public async Task<IActionResult> Put(int RickId, RickDto model)
        {
            try
            {
                // Recupero os Mortys da requisição
                // var lstIDsMorty = model.Mortys.Select(s => s.Id).ToList();

                var Rick = await _repository.GetRicksById(RickId);
                if (Rick == null)
                    return NotFound("Rick não encontrado para atualizar");

                // Armazeno e deleto os Mortys que estão no banco e não vieram pela requisição
                // var mortys = Rick.Mortys.Where(w => !lstIDsMorty.Contains(w.Id)).ToList();
                // if (mortys.Count > 0)
                //     mortys.ForEach(f => _repository.Delete(f));

                _mapper.Map(model, Rick);
                _repository.Update(Rick);

                if (await _repository.SaveChangesAsync())
                    return Created($"/api/Rick/{model.Id}", _mapper.Map<RickDto>(model));
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Não foi possível atualizar Rick : {ex.Message}");
            }

            return BadRequest("Error Put");
        }

        [HttpDelete("{RickId}")]
        public async Task<IActionResult> Delete(int RickId)
        {
            try
            {
                var Rick = await _repository.GetRicksById(RickId);
                if (Rick == null)
                    return NotFound("Rick não encontrado para atualizar");

                _repository.Delete(Rick);
                if (await _repository.SaveChangesAsync())
                    return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Rick não encontrado: {ex.Message}");
            }

            return BadRequest("Error Delete");
        }
    }
}