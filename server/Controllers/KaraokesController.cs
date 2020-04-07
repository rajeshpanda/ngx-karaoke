using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using karoke_api_dotnetcore.Entities;

namespace karoke_api_dotnetcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KaraokesController : ControllerBase
    {
        private readonly KaraokeDbContext _context;

        public KaraokesController(KaraokeDbContext context)
        {
            _context = context;
        }

        // GET: api/Karaokes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Karaoke>>> GetKaraokes(string search)
        {
            if (!string.IsNullOrEmpty(search))
            {
                return await _context.Karaokes.Where(c => c.SongName.Contains(search,StringComparison.InvariantCultureIgnoreCase)
                //|| c.LyricsText.Contains(search, StringComparison.InvariantCultureIgnoreCase)
                || c.ArtistName.Contains(search, StringComparison.InvariantCultureIgnoreCase)).Select(c => new Karaoke {
                    ArtistName = c.ArtistName, SongName = c.SongName, ThumbnailLink = c. ThumbnailLink, Id = c.Id
                }).ToListAsync();
            }
            return await _context.Karaokes.Select(c => new Karaoke
            {
                ArtistName = c.ArtistName,
                SongName = c.SongName,
                ThumbnailLink = c.ThumbnailLink,
                Id = c.Id
            }).ToListAsync();
        }

        // GET: api/Karaokes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Karaoke>> GetKaraoke(int id)
        {
            var karaoke = await _context.Karaokes.FindAsync(id);

            if (karaoke == null)
            {
                return NotFound();
            }

            return karaoke;
        }

        // PUT: api/Karaokes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKaraoke(int id, Karaoke karaoke)
        {
            if (id != karaoke.Id)
            {
                return BadRequest();
            }

            _context.Entry(karaoke).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KaraokeExists(id))
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

        // POST: api/Karaokes
        [HttpPost]
        public async Task<ActionResult<Karaoke>> PostKaraoke(Karaoke karaoke)
        {
            _context.Karaokes.Add(karaoke);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKaraoke", new { id = karaoke.Id }, karaoke);
        }

        // DELETE: api/Karaokes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Karaoke>> DeleteKaraoke(int id)
        {
            var karaoke = await _context.Karaokes.FindAsync(id);
            if (karaoke == null)
            {
                return NotFound();
            }

            _context.Karaokes.Remove(karaoke);
            await _context.SaveChangesAsync();

            return karaoke;
        }

        private bool KaraokeExists(int id)
        {
            return _context.Karaokes.Any(e => e.Id == id);
        }

        [HttpPut("offset/{id}/{offset}")]
        public async Task<IActionResult> ChangeOffset(int id, decimal offset)
        {
            var karaoke = await _context.Karaokes.FindAsync(id);
            _context.Entry(karaoke).State = EntityState.Modified;

            karaoke.Offset = offset;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KaraokeExists(id))
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
    }
}
