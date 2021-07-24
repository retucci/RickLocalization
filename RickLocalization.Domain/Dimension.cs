using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.Domain
{
    public class Dimension
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(4)")]
        public string Code  { get; set; }

        [Column(TypeName="DateTime")]
        [Required(AllowEmptyStrings = false)]
        public DateTime TravelDate { get; set; } = DateTime.Now;

        public int RickId { get; set; }

        public Rick Rick { get; set; }

        // public int MortyId { get; set; }

        // public Morty Morty { get; set; }
    }
}