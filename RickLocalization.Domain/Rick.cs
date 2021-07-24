using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.Domain
{
    public class Rick : Pessoa
    {
        public int QI { get; set; }

        public Morty Morty { get; set; }
        
        public List<Dimension> Dimensions { get; set; }
    }
}