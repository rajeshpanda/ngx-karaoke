using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace karoke_api_dotnetcore.Entities
{
    public class Karaoke
    {
        [Key]
        public int Id { get; set; }

        public string SongName { get; set; }

        public string ArtistName { get; set; }

        public string LyricsText { get; set; }

        public string ThumbnailLink { get; set; }

        public string SongLink { get; set; }

        public decimal Offset { get; set; }
    }
}
