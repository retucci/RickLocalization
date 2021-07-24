using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.WebApi.Dto
{
    public class DimensionDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="O Código é obrigatório")]
        [StringLength(4, ErrorMessage ="O campo Código não pode exceder 4 caracteres")]
        public string Code  { get; set; }

        public int RickId { get; set; }

        // public int MortyId { get; set; }
    }
}