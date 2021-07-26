using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RickLocalization.Domain.Entities;
using RickLocalization.Repository;
using RickLocalization.WebApi.Dto;
using RickLocalization.Domain.Util;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using System;

namespace RickLocalization.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RickController : ControllerBase
    {
        private IRickLocalizationRepository _repository { get; }
        private IMapper _mapper { get; }
        private IWebHostEnvironment _hostEnviroment { get; }

        public RickController(IRickLocalizationRepository _repository, IMapper _mapper, IWebHostEnvironment _hostEnviroment)
        {
            this._repository = _repository;
            this._mapper = _mapper;
            this._hostEnviroment = _hostEnviroment;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Pagination pagination)
        {
            try
            {
                var results = await _repository.GetAllRicksAsync(pagination);
                var rickDtos = _mapper.Map<IEnumerable<RickDto>>(results);
                if (pagination.totalCount == 0)
                    pagination.totalCount = _repository.Count<Rick>();

                var response = new
                {
                    rickDtos,
                    pagination
                };

                return Ok(response);
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

        [HttpPost]
        public async Task<IActionResult> Post(RickDto model)
        {
            try
            {
                var Rick = _mapper.Map<Rick>(model);
                _repository.Add(Rick);
                if (await _repository.SaveChangesAsync())
                    return Created($"/api/Rick/{Rick.Id}", _mapper.Map<RickDto>(Rick));
                else
                    throw new Exception("Não foi possível salvar o Rick");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Não foi possível inserir Rick : {ex.Message}");
            }
        }

        [HttpPost("upload-image/{rickId}")]
        public async Task<IActionResult> UploadImage(int rickId)
        {
            try
            {
                var rick = await _repository.GetRicksById(rickId);
                if (rick == null) return NoContent();

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeleteImage(rick.Image);
                    rick.Image = await SaveImage(file);
                }

                _repository.Update(rick);
                if (await _repository.SaveChangesAsync())
                    return Ok(rick);
                else
                    throw new Exception("Não foi possível salvar o Rick");

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Não foi possível inserir Rick : {ex.Message}");
            }
        }

        [NonAction]
        public void DeleteImage(string name)
        {
            var path = Path.Combine(_hostEnviroment.ContentRootPath,"Images", name);
            if(System.IO.File.Exists(path))
                System.IO.File.Delete(path);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile file)
        {
            string name = new string(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(' ','-');
            name = $"{DateTime.UtcNow.ToString("yyyyMMddHHmmss")}{name}{Path.GetExtension(file.FileName)}";
            var path = Path.Combine(_hostEnviroment.ContentRootPath, "Images",name);
            using(var fileStream = new FileStream(path,FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return name;
        }

        [HttpPut("{RickId}")]
        public async Task<IActionResult> Put(int RickId, RickDto model)
        {
            try
            {
                var Rick = await _repository.GetRicksById(RickId);
                if (Rick == null)
                    return NotFound("Rick não encontrado para atualizar");

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
                {
                    DeleteImage(Rick.Image);
                    return Ok();
                }
                else 
                    throw new Exception("Não foi possível deletar o Rick");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Rick não encontrado: {ex.Message}");
            }
        }
    }
}