using Microsoft.EntityFrameworkCore;

namespace PacientesAPI.Models
{
    public class ApiDbContext: DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<HistoriaClinica> HistoriasClinicas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Factura> Facturas { get; set; }
    }
}
