using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.Domain.Entities
{
    public class Morty : Person
    {
        public int RickId { get; set; }

        public Rick Rick { get; set; }
    }
}