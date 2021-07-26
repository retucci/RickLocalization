using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.Domain.Entities
{
    public class Dimension
    {
        public int Id { get; set; }

        [Required]
        public int Original  { get; set; }

        [Column(TypeName = "varchar(4)")]
        [Required(AllowEmptyStrings = false)]
        public string Code  { get; set; }

        [Column(TypeName="DateTime")]
        [Required]
        public DateTime TravelDate { get; set; }

        public int RickId { get; set; }

        public Rick Rick { get; set; }
    }
}