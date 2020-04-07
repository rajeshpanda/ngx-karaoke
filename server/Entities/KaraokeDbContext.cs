using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace karoke_api_dotnetcore.Entities
{
    public class KaraokeDbContext: DbContext
    {
        public KaraokeDbContext(DbContextOptions<KaraokeDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Karaoke> Karaokes { get; set; }
    }
}
