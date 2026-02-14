using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PacientesAPI.Models
{
    public class Paciente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Apellido { get; set; } = string.Empty;

        [Required]
        public DateOnly FechaNacimiento { get; set; }

        [MaxLength(20)]
        public string? Cedula { get; set; }

        [MaxLength(20)]
        public string? Telefono { get; set; }

        [MaxLength(200)]
        public string? Direccion { get; set; }

        public ICollection<HistoriaClinica> HistoriasClinicas { get; set; }
            = new List<HistoriaClinica>();
    }
}
