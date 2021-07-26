using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RickLocalization.Domain.Entities
{
    public class Person
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(100)")]
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
        
        [Column(TypeName = "varchar(255)")]
        public string Description { get; set; }
    }
}