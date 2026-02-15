using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PacientesAPI.Models;

namespace PacientesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoriasClinicasController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public HistoriasClinicasController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/HistoriasClinicas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistoriaClinica>>> GetHistoriasClinicas()
        {
            return await _context.HistoriasClinicas.ToListAsync();
        }

        // GET: api/HistoriasClinicas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HistoriaClinica>> GetHistoriaClinica(int id)
        {
            var historiaClinica = await _context.HistoriasClinicas.FindAsync(id);

            if (historiaClinica == null)
            {
                return NotFound();
            }

            return historiaClinica;
        }

        // PUT: api/HistoriasClinicas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHistoriaClinica(int id, HistoriaClinica historiaClinica)
        {
            if (id != historiaClinica.Id)
            {
                return BadRequest();
            }

            _context.Entry(historiaClinica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistoriaClinicaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HistoriasClinicas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HistoriaClinica>> PostHistoriaClinica(HistoriaClinica historiaClinica)
        {
            _context.HistoriasClinicas.Add(historiaClinica);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHistoriaClinica", new { id = historiaClinica.Id }, historiaClinica);
        }

        // DELETE: api/HistoriasClinicas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistoriaClinica(int id)
        {
            var historiaClinica = await _context.HistoriasClinicas.FindAsync(id);
            if (historiaClinica == null)
            {
                return NotFound();
            }

            _context.HistoriasClinicas.Remove(historiaClinica);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistoriaClinicaExists(int id)
        {
            return _context.HistoriasClinicas.Any(e => e.Id == id);
        }


        // GET: api/HistoriasClinicas/paciente/5
        [HttpGet("paciente/{pacienteId}")]
        public async Task<ActionResult<IEnumerable<HistoriaClinica>>> GetByPaciente(int pacienteId)
        {
            return await _context.HistoriasClinicas
                .Where(h => h.PacienteId == pacienteId)
                .ToListAsync();
        }
    }

}
