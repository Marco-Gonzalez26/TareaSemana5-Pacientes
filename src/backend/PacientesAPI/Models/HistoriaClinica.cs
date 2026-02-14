using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PacientesAPI.Models
{
    public class HistoriaClinica
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime FechaConsulta { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(500)]
        public string Diagnostico { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Tratamiento { get; set; }

        [MaxLength(1000)]
        public string? Observaciones { get; set; }

        [Required]
        public int PacienteId { get; set; }

        [ForeignKey("PacienteId")]
        public Paciente? Paciente { get; set; }
    }
}
