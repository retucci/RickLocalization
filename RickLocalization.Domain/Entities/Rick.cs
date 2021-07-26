using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.Domain.Entities
{
    public class Rick : Person
    {
        public string Image { get; set; }
        
        public int QI { get; set; }

        public Morty Morty { get; set; }
        
        public List<Dimension> Dimensions { get; set; }
    }
}