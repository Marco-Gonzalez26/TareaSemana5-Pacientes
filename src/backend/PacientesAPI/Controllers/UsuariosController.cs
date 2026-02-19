using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PacientesAPI.Models;

namespace PacientesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public UsuariosController(ApiDbContext context)
        {
            _context = context;
        }

        // POST: api/Usuarios/sign-up
        [HttpPost("sign-up")]
        public async Task<IActionResult> Registrar([FromBody] Usuario usuario)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email))
                return BadRequest(new { mensaje = "El email ya está registrado" });

            usuario.Contrasenia = BCrypt.Net.BCrypt.HashPassword(usuario.Contrasenia);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Usuario registrado correctamente" });
        }

        // POST: api/Usuarios/login
        [HttpPost("login")]
        public async Task<IActionResult> IniciarSesion([FromBody] LoginViewModel login)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == login.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(login.Contrasenia, usuario.Contrasenia))
                return Unauthorized(new { mensaje = "Credenciales incorrectas" });

            return Ok(new {message = "Inicio de sesion exitoso", usuario});
        }
    }
}